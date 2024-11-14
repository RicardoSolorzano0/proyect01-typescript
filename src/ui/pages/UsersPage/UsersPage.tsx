import { App, Breadcrumb, Button, Input, Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router';
import { deleteUserAction, updateAnimalsAction, updateUserAction } from './table/actions';
import { columns } from './table/columns';
import type { Match } from '../../../types/generalTypes';
import { useDeleteUserMutation, useSelectPaginatedUsersQuery } from '@/api/services/user';
import { useGetUserTypesQuery } from '@/api/services/userTypes';
import { UserForm } from '@/forms/UserForm/UserForm';
import { useDebounce } from '@/hooks/debounce';
import { useHandlePaginatedData, usePagination } from '@/hooks/paginate';
import { globalT } from '@/i18n';
import type { OptionInGetQuerys } from '@/types/generalTypes';
import type { User } from '@/types/User';
import { EntityTable } from '@/ui/components/EntityTable';
import { SelectUI } from '@/ui/components/SelectUI';

const { useApp } = App;

export const UsersPage = () => {
    const matches = useMatches() as Match[];
    const crumbs = matches
        .filter(match => Boolean(match.handle?.crumb))
        .map(match => match.handle.crumb(match.data));

    const { t } = useTranslation('users');
    const [text, setText] = useState('');
    const [userType, setUserType] = useState('');
    const debouncedText = useDebounce(text);
    const page = usePagination();

    const [option, setOption] = useState<OptionInGetQuerys>('active');
    const { data: dataPaginate, isFetching: isFetchingPaginate, isLoading: isLoadingPaginate } = useSelectPaginatedUsersQuery({ filter: debouncedText, limit: 10, option, page, userType });
    const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
    const { data: dataUserType, isLoading: isLoadingTypes } = useGetUserTypesQuery('active');
    const { data, pagination } = useHandlePaginatedData(dataPaginate);
    const { modal, notification } = useApp();

    const handleCreate = () => {
        const mdl = modal.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: (
                <UserForm
                    handleCancel={ () => mdl.destroy() }
                />
            ),
            okButtonProps: {
                style: { display: 'none' }
            },
            title: t('form.titles.create')
        });
    };

    const handleDelete = async (record: User) => {
        try {
            await deleteUser(record.id).unwrap();
            notification.success({
                description: t('messages.success.deleteDescription', { user: `${record.name} ${record.last_name}` }),
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
    };

    const handleSwitch = (record: boolean) => {
        setOption(record ? 'active' : 'inactive');
    };

    const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete || isLoadingTypes;

    const optionUserTypes = dataUserType?.map(type => ({
        label: type.name,
        value: type.id
    }));

    const tableActions = {
        update: updateUserAction,
        delete: deleteUserAction(handleDelete),
        custom: [updateAnimalsAction(t)]
    };

    const breadcrums = crumbs.map((crumb, index) => {
        return {
            title: <a href={ index === 0 ? '/' : '' }>{crumb}</a>
        };
    });

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

                <div className='flex items-center gap-4'>
                    <SelectUI
                        allowClear
                        disabled={ isLoadingTypes }
                        options={ optionUserTypes }
                        placeholder={ t('page.userTypeFilter') }
                        size='large'
                        onChange={ e => setUserType(e ?? '') }
                    />

                    <Input
                        allowClear
                        placeholder={ t('page.searchBy') }
                        onChange={ e => {
                            setText(e.target.value);
                        } }
                    />

                    <Switch
                        defaultChecked
                        checkedChildren={ globalT('active') }
                        className='w-44'
                        unCheckedChildren={ globalT('deleted') }
                        onChange={ handleSwitch }
                    />
                </div>
            </div>

            <br />

            {loading ?
                <p>{globalT('loading')}</p>
                : (
                    <EntityTable
                        actions={ option === 'active' ? tableActions : undefined }
                        columns={ columns(t) }
                        data={ data ?? [] }
                        loading={ loading }
                        pagination={ pagination }
                    />
                )}
        </>
    );
};
