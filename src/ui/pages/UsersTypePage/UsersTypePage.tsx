import { Button, Table, App, Switch, Pagination } from "antd";
import { TypeUser } from "@/types/TypeUsers";
import { UserTypeForm } from "@/forms/UserTypeForm/UserTypeForm";
import Column from "antd/es/table/Column";
import { useDeleteUserTypeMutation, useSelectPaginatedUserTypesQuery } from "@/api/services/userTypes";
import { useState } from "react";
import { OptionInGetQuerys } from "@/types/generalTypes";
import { Input } from "antd"
import { useDebounce } from "@/hooks/debounce";
import { useTranslation } from "react-i18next";
import { globalT } from "@/i18n";

const { useApp } = App;

export const UsersTypePage = () => {
  const { t } = useTranslation('usersTypes');
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text);
  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const [page, setPage] = useState(1);
  const { data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate } = useSelectPaginatedUserTypesQuery({ option, limit: 10, page, name: debouncedText });
  //const [deleteUserType, {data:dataDelete, error:errorDelete, isLoading:isLoadingDelete}] = useDeleteUserTypeMutation()
  const [deleteUserType, { isLoading: isLoadingDelete }] = useDeleteUserTypeMutation()
  const { modal, notification } = useApp();
  // const [typeUsers, setTypeUsers] = useState<TypeUser[]>(data as TypeUser[]);

  const handleCreate = () => {
    const mdl = modal.info({
      title: t("form.titleCreate"),
      content: (
        <UserTypeForm
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

  const handleEdit = (record: TypeUser) => {
    const mdl = modal.info({
      // title: `Editar tipo de usuario ${record.name}`,
      title: t("form.titleEdit", { typeUser: record.name }),
      content: (
        <UserTypeForm
          typeUser={record}
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

  const handleDelete = (record: TypeUser) => {
    modal.confirm({
      title: t("form.titleDelete", { typeUser: record.name }),
      content: t("form.contentDelete", { typeUser: record.name }),
      onOk: async () => {
        try {
          await deleteUserType(record.id).unwrap();
          notification.success({
            message: t("messages.userDeleted"),
            description: t("messages.userDeletedDescription", { typeUser: record.name }),
            duration: 2,
          });
        } catch (error) {
          const parsedError = error as { error: string };
          notification.error({
            message: "Error",
            description: parsedError.error,
            duration: 2,
          })
        }
      },
    });
  };

  const handleSwitch = (record: boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap">
        <Button type="primary" onClick={handleCreate}>
          {t("page.addButton")}
        </Button>
        <div className="flex gap-4 items-center">
          <Input placeholder={t("page.searchBy")} allowClear onChange={(e) => { setText(e.target.value) }} />
          <Switch defaultChecked checkedChildren="Activos" unCheckedChildren="Eliminados" onChange={handleSwitch} />
        </div>
      </div>
      <br />

      {loading ?
        <p>{globalT("loading")}</p>
        :
        <>
          <Table
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
          </div>
        </>
      }
    </div>
  );
};
