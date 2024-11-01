import { Button, Table, App, Switch, Pagination } from "antd";
import { TypeUser } from "@/types/TypeUsers";
import { UserTypeForm } from "@/forms/UserTypeForm/UserTypeForm";
import Column from "antd/es/table/Column";
import { useDeleteUserTypeMutation, useSelectPaginatedUserTypesQuery } from "@/api/services/userTypes";
import { useState } from "react";
import { OptionInGetQuerys } from "@/types/generalTypes";
import { Input } from "antd"
import { useDebounce } from "@/hooks/debounce";

const { useApp } = App;

export const UsersTypePage = () => {
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
      title: "Crear nuevo tipo de usuario",
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
      title: `Editar tipo de usuario ${record.name}`,
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
      title: "Eliminar tipo de usuario",
      content: `¿Estas seguro de eliminar el tipo de usuario ?`,
      onOk: async () => {
        try {
          await deleteUserType(record.id).unwrap();
          notification.success({
            message: "Tipo de usuario eliminado",
            description: `Se ha eliminado el tipo de usuario ${record.name}`,
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
          Agregar tipo de Usuario
        </Button>
        <div className="flex gap-4 items-center">
          <Input placeholder="Buscar por nombre" allowClear onChange={(e) => { setText(e.target.value) }} />
          <Switch defaultChecked checkedChildren="Activos" unCheckedChildren="Eliminados" onChange={handleSwitch} />
        </div>
      </div>
      <br />

      {loading ?
        <p>Cargando informacion...</p>
        :
        <>
          <Table
            rowKey={(record) => record.id}
            dataSource={dataPaginate?.data}
            pagination={false}
          >
            <Column title="Nombre" dataIndex="name" key="name" />
            <Column title="Descripción" dataIndex="description" key="description" />
            <Column title="Color" dataIndex="color" key="color" />
            {option === "active" &&
              <Column
                title="Acciones"
                key="action"
                render={(_, record: TypeUser) => (
                  <div className="flex gap-2">
                    <Button variant="solid" onClick={() => handleEdit(record)}>
                      Editar
                    </Button>
                    <Button
                      variant="solid"
                      color="danger"
                      onClick={() => handleDelete(record)}
                    >
                      Eliminar
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
                return `Total ${total}`
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
