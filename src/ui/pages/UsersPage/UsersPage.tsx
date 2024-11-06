import { Button, Table, App, Switch, Pagination, Input } from "antd";
import Column from "antd/es/table/Column";
import { useState } from "react";
import { User } from "@/types/User";
import { UserForm } from "@/forms/UserForm/UserForm";
import dayjs from "dayjs";
//import { ExampleRedux } from "@/counter/ExampleRedux";
import { useDeleteUserMutation, useSelectPaginatedUsersQuery } from "@/api/services/user";
import { OptionInGetQuerys } from "@/types/generalTypes";
import { useDebounce } from "@/hooks/debounce";
import { useGetUserTypesQuery } from "@/api/services/userTypes";
import { SelectUI } from "@/ui/components/SelectUI";
import { useTranslation } from "react-i18next";
import { globalT } from "@/i18n";
import { useHandlePaginatedData, usePagination } from "@/hooks/paginate";
import { EntityTable } from "@/ui/components/EntityTable";
import { columns } from "./table/columns";
// import { globalT } from '@/i18n';

const { useApp } = App;
export const UsersPage = () => {
  const { t } = useTranslation('users');
  const [text, setText] = useState("");
  const [userType, setUserType] = useState("")
  const debouncedText = useDebounce(text);
  // const [page, setPage] = useState(1);
  const page = usePagination();
  console.log(page);

  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const { data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate } = useSelectPaginatedUsersQuery({ option, limit: 10, page, filter: debouncedText, userType });
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { data: dataUserType, isLoading: isLoadingTypes } = useGetUserTypesQuery("active");

  const { data, pagination } = useHandlePaginatedData(dataPaginate);

  const { modal, notification } = useApp();

  const handleEdit = (record: User) => {
    const mdl = modal.info({
      title: t("form.titleEdit", { user: `${record.name} ${record.last_name}` }),
      // title: `Editar usuario ${record.name} ${record.last_name}`,
      content: (
        <UserForm
          user={record}
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

  const handleCreate = () => {
    const mdl = modal.info({
      title: t("form.titleCreate"),
      content: (
        <UserForm
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

  const handleDelete = (record: User) => {
    modal.confirm({
      title: t("form.titleDelete", { user: `${record.name} ${record.last_name}` }),
      // content: `¿Estas seguro de eliminar el usuario ${record.name} ${record.last_name}?`,
      content: t('form.contentDelete', { user: `${record.name} ${record.last_name}` }),

      onOk: async () => {
        try {
          await deleteUser(record.id).unwrap();
          notification.success({
            message: t("messages.userDeleted"),
            description: t('messages.userDeletedDescription', { user: `${record.name} ${record.last_name}` }),
            // description: `Se ha eliminado el usuario ${record.name} ${record.last_name}`,
            duration: 2,
          });
        } catch (error) {
          const parsedError = error as { error: string };
          notification.error({
            message: "Error",
            description: parsedError.error,
            duration: 2,
          });
        }
      },
    });
  };

  const handleSwitch = (record: boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete || isLoadingTypes;

  const optionUserTypes = dataUserType?.map((type) => ({
    label: type.name,
    value: type.id
  }));

  const tableActions = {
    update: handleEdit,
    delete: handleDelete
  };

  return (
    <>
      {/* {
        globalT('helloWorld')
      } */}
      {/* <ExampleRedux /> */}
      <div className="flex justify-between items-center">
        <Button type="primary" onClick={handleCreate}>
          {t("page.addButton")}
        </Button>
        <div className="flex gap-4 items-center">
          <SelectUI disabled={isLoadingTypes} size="large" placeholder={t("page.userTypeFilter")} allowClear options={optionUserTypes} onChange={(e) => setUserType(e ?? "")} />
          <Input placeholder={t("page.searchBy")} allowClear onChange={(e) => { setText(e.target.value) }} />
          {/* <Switch defaultChecked checkedChildren={globalT("active")} unCheckedChildren={globalT("deleted")} onChange={handleSwitch} /> */}
          <Switch className="w-44" defaultChecked checkedChildren={globalT('active')} unCheckedChildren={globalT('deleted')} onChange={handleSwitch} />
        </div>
      </div>
      <br />
      {loading ?
        <p>{globalT("loading")}</p>
        :
        <>
          <EntityTable
            actions={tableActions}
            columns={columns(t)}
            data={data ?? []}
            loading={loading}
            pagination={pagination}
          />

          {/* <Table
            rowKey={(record) => record.id}
            dataSource={dataPaginate?.data}
            pagination={false}
          >
            <Column title={t("table.name")} dataIndex="name" key="name" />
            <Column title={t("table.lastName")} dataIndex="last_name" key="last_name" />
            <Column title={t("table.email")} dataIndex="email" key="email" />
            <Column title={t("table.birthdate")} dataIndex="birthdate" key="birthdate" render={(date) => {
              return dayjs(date).format("LL")
            }} />
            <Column title={t("table.address")} dataIndex="address" key="address" />
            {option === "active" && <Column
              title={t("table.actions")}
              key="action"
              render={(_, record: User) => (
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
            />}
          </Table>
          <div className="flex justify-center items-center mt-3 ">
            <Pagination
              total={dataPaginate?.total}
              showTotal={(total) => {
                return globalT('paginate', { quantity: total })
              }}
              defaultPageSize={10}
              defaultCurrent={1}
              onChange={(e) => {
                setPage(e)
              }}
            />
          </div> */}
        </>
      }
    </>
  );
};
