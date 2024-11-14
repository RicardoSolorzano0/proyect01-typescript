import { App, Breadcrumb, Button, Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router';
import { columns } from './table/columns';
import { useDeleteAnimalMutation, useSelectPaginatedAnimalsQuery } from '@/api/services/animals';
import { AnimalForm } from '@/forms/AnimalForm/AnimalForm';
import { useHandlePaginatedData, usePagination } from '@/hooks/paginate';
import { globalT } from '@/i18n';
import type { Animal } from '@/types/Animals';
import type { Match, OptionInGetQuerys } from '@/types/generalTypes';
import { EntityTable } from '@/ui/components/EntityTable';

const { useApp } = App;

export const AnimalPage = () => {
    const matches = useMatches() as Match[];
    const crumbs = matches
        // first get rid of any matches that don't have handle and crumb
        .filter(match => Boolean(match.handle?.crumb))
        // now map them into an array of elements, passing the loader
        // data to each one
        .map(match => match.handle.crumb(match.data));

    const breadcrums = crumbs.map((crumb, index) => {
        return {
            title: <a href={ index === 0 ? '/' : '' }>{crumb}</a>
        };
    });
    const { t } = useTranslation('animals');
    const page = usePagination();
    const [option, setOption] = useState<OptionInGetQuerys>('active');
    const { data: dataPaginate, isFetching: isFetchingPaginate, isLoading: isLoadingPaginate } = useSelectPaginatedAnimalsQuery({ limit: 10, option, page });
    const { data, pagination } = useHandlePaginatedData(dataPaginate);
    const [deleteAnimal, { isLoading: isLoadingDelete }] = useDeleteAnimalMutation();
    const { modal, notification } = useApp();

    const handleCreate = () => {
        const mdl = modal.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: (
                <AnimalForm
                    handleCancel={ () => mdl.destroy() }
                />
            ),
            okButtonProps: {
                style: { display: 'none' }
            },
            title: t('form.titles.create')
        });
    };

    const handleEdit = (record: Animal) => {
        const mdl = modal.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: (
                <AnimalForm
                    animal={ record }
                    handleCancel={ () => mdl.destroy() }
                />
            ),
            okButtonProps: {
                style: { display: 'none' }
            },
            title: t('form.titles.edit', { animal: `${record.name}` })
        });
    };

    const handleDelete = (record: Animal) => {
        modal.confirm({
            content: t('form.contents.delete', { animal: `${record.name} ` }),
            title: t('form.titles.delete', { animal: `${record.name}` }),

            onOk: async () => {
                try {
                    await deleteAnimal(record.id).unwrap();
                    notification.success({
                        description: t('messages.success.deleteDescription', { animal: `${record.name}` }),
                        duration: 2,
                        message: t('messages.success.delete')
                    });
                } catch (error) {
                    const parsedError = error as { error: string; };
                    notification.error({
                        description: t(`messages.errors.${parsedError.error}`),
                        duration: 2,
                        message: 'Error'
                    });
                }
            }
        });
    };

    const handleSwitch = (record: boolean) => {
        setOption(record ? 'active' : 'inactive');
    };

    const tableActions = {
        update: handleEdit,
        delete: handleDelete
    };

    const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete;
    return (
        <>
            <Breadcrumb
                className='mb-4'
                items={ breadcrums }
            />

            <div className='flex items-center justify-between'>
                <Button
                    type='primary'
                    onClick={ handleCreate }
                >
                    {t('page.addButton')}
                </Button>

                <Switch
                    defaultChecked
                    checkedChildren={ globalT('active') }
                    className='w-44'
                    unCheckedChildren={ globalT('deleted') }
                    onChange={ handleSwitch }
                />
            </div>

            <br />

            {
                loading ?
                    <p>{globalT('loading')}</p>
                    : (
                        <EntityTable 
                            actions={ option === 'active' ? tableActions : undefined }
                            columns={ columns(t) }
                            data={ data ?? [] }
                            loading={ loading }
                            pagination={ pagination }
                        />
                    )
            }
        </>

    );
};