import { App, Button, Input, Switch } from 'antd';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { columns } from './table/columns';
import { useDeleteUserTypeMutation, useSelectPaginatedUserTypesQuery } from '@/api/services/userTypes';
import { UserTypeForm } from '@/forms/UserTypeForm/UserTypeForm';
import { useDebounce } from '@/hooks/debounce';
import { useHandlePaginatedData, usePagination } from '@/hooks/paginate';
import { globalT } from '@/i18n';
import type { OptionInGetQuerys } from '@/types/generalTypes';
import type { TypeUser } from '@/types/TypeUsers';
import { EntityTable } from '@/ui/components/EntityTable';

const { useApp } = App;

export const UsersTypePage = () => {
    const { t } = useTranslation('usersTypes');
    const [text, setText] = useState('');
    const debouncedText = useDebounce(text);
    const [option, setOption] = useState<OptionInGetQuerys>('active');
    const page = usePagination();
    // const [page, setPage] = useState(1);
    const { data: dataPaginate, isFetching: isFetchingPaginate, isLoading: isLoadingPaginate } = useSelectPaginatedUserTypesQuery({ limit: 10, name: debouncedText, option, page });

    const { data, pagination } = useHandlePaginatedData(dataPaginate);

    //const [deleteUserType, {data:dataDelete, error:errorDelete, isLoading:isLoadingDelete}] = useDeleteUserTypeMutation()
    const [deleteUserType, { isLoading: isLoadingDelete }] = useDeleteUserTypeMutation();
    const { modal, notification } = useApp();
    // const [typeUsers, setTypeUsers] = useState<TypeUser[]>(data as TypeUser[]);

    const handleCreate = () => {
        const mdl = modal.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: (
                <UserTypeForm
                    handleCancel={ () => mdl.destroy() }
                />
            ),
            okButtonProps: {
                style: { display: 'none' }
            },
            title: t('form.titles.create')
        });
    };

    const handleEdit = (record: TypeUser) => {
        const mdl = modal.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: (
                <UserTypeForm
                    handleCancel={ () => mdl.destroy() }
                    typeUser={ record }
                />
            ),
            okButtonProps: {
                style: { display: 'none' }
            },
            // title: `Editar tipo de usuario ${record.name}`,
            title: t('form.titles.edit', { typeUser: record.name })
        });
    };

    const handleDelete = (record: TypeUser) => {
        modal.confirm({
            content: t('form.contents.delete', { typeUser: record.name }),
            onOk: async () => {
                try {
                    await deleteUserType(record.id).unwrap();
                    notification.success({
                        description: t('messages.success.deleteDescription', { typeUser: record.name }),
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
            },
            title: t('form.titles.delete', { typeUser: record.name })
        });
    };

    const handleSwitch = (record: boolean) => {
        setOption(record ? 'active' : 'inactive');
    };

    const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete;

    const tableActions = {
        update: handleEdit,
        delete: handleDelete
    };

    return (
        <div>
            <div className='flex flex-wrap items-center justify-between'>
                <Button
                    type='primary'
                    onClick={ handleCreate }
                >
                    {t('page.addButton')}
                </Button>

                <div className='flex items-center gap-4'>
                    <Input
                        allowClear
                        placeholder={ t('page.searchBy') }
                        onChange={ e => {
                            setText(e.target.value); 
                        } }
                    />

                    <Switch
                        defaultChecked
                        checkedChildren='Activos'
                        className='w-44'
                        unCheckedChildren='Eliminados'
                        onChange={ handleSwitch }
                    />
                </div>
            </div>

            <br />

            {loading ?
                <p>{globalT('loading')}</p>
                : (
                    <>
                        <EntityTable
                            actions={ tableActions }
                            columns={ columns(t) }
                            data={ data ?? [] }
                            loading={ loading }
                            pagination={ pagination }
                        />

                        {/* <Table
            rowKey={(record) => record.id}
            dataSource={dataPaginate?.data}
            pagination={false}
          >
            <Column title={t("table.name")} dataIndex="name" key="name" />
            <Column title={t("table.description")} dataIndex="description" key="description" />
            <Column title={t("table.color")} dataIndex="color" key="color" />
            {option === "active" &&
              <Column
                title={t("table.actions")}
                key="action"
                render={(_, record: TypeUser) => (
                  <div className="flex gap-2">
                    <Button variant="solid" onClick={() => handleEdit(record)}>
                      {globalT("edit")}
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(record)}
                    >
                      {globalT("delete")}
                    </Button>
                  </div>
                )}
              />
            }
          </Table>
          <div className="flex justify-center items-center mt-3 ">
            <Pagination
              total={dataPaginate?.total}
              showTotal={(total) => {
                return globalT("paginate", { quantity: total })
              }}
              defaultPageSize={10}
              defaultCurrent={1}
              onChange={(e) => {
                setPage(e)
              }}
            />
          </div> */}
                    </>
                )}
        </div>
    );
};
