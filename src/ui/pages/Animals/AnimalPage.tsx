import { globalT } from '@/i18n';
import { EntityTable } from '@/ui/components/EntityTable';
import { columns } from './table/columns';
import { useTranslation } from 'react-i18next';
import { useHandlePaginatedData, usePagination } from '@/hooks/paginate';
import { useDeleteAnimalMutation, useSelectPaginatedAnimalsQuery } from '@/api/services/animals';
import { useState } from 'react';
import { OptionInGetQuerys } from '@/types/generalTypes';
import { Button, Switch, App } from 'antd';
import { AnimalForm } from '@/forms/AnimalForm/AnimalForm';
import { Animal } from '@/types/Animals';

const { useApp } = App;

export const AnimalPage = () => {
  const { t } = useTranslation('animals');
  const page = usePagination();
  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const { data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate } = useSelectPaginatedAnimalsQuery({ option, limit: 10, page });
  const {data, pagination} = useHandlePaginatedData(dataPaginate);
  const [deleteAnimal, { isLoading: isLoadingDelete }] = useDeleteAnimalMutation();
  const { modal, notification } = useApp();

  const handleCreate = () => {
    const mdl = modal.info({
      title: t("form.titles.create"),
      content: (
        <AnimalForm
          handleCancel={() => mdl.destroy()}
        />
      ),
      cancelButtonProps: {
        style: { display: "none" },
      },
      okButtonProps: {
        style: { display: "none" },
      },
    });
  };

  const handleEdit = (record: Animal) => {
    const mdl = modal.info({
      title: t("form.titles.edit", { animal: `${record.name}` }),
      content: (
        <AnimalForm
          animal={record}
          handleCancel={() => mdl.destroy()}
        />
      ),
      okButtonProps: {
        style: { display: "none" },
      },
      cancelButtonProps: {
        style: { display: "none" },
      },
    });
  };

  const handleDelete = (record: Animal) => {
    modal.confirm({
      title: t("form.titles.delete", { animal: `${record.name}` }),
      content: t('form.contents.delete', { animal: `${record.name} ` }),

      onOk: async () => {
        try {
           await deleteAnimal(record.id).unwrap();
          notification.success({
            message: t("messages.success.delete"),
            description: t('messages.success.deleteDescription', { animal: `${record.name}` }),
            duration: 2,
          });
        } catch (error) {
          const parsedError = error as { error: string };
          notification.error({
            message: "Error",
            description:  t(`messages.errors.${parsedError.error}`),
            duration: 2,
          });
        }
      },
    });
  };

  const handleSwitch = (record: boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const tableActions = {
    update: handleEdit,
    delete: handleDelete,
  }

  const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete
  return (
    <>
      <div className="flex justify-between items-center">
      <Button type="primary" onClick={handleCreate}>
          {t("page.addButton")}
        </Button>
        <Switch className="w-44" defaultChecked checkedChildren={globalT('active')} unCheckedChildren={globalT('deleted')} onChange={handleSwitch} />
      </div>
      <br />
      {
        loading ?
          <p>{globalT("loading")}</p>
          :
          <>
            <EntityTable 
              actions={option === "active" ? tableActions: undefined}
              columns={columns(t)}
              data={data ?? []}
              loading={loading}
              pagination={pagination}
            />
          </>
      }
    </>

  )
}