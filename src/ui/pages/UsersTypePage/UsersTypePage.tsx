import { Button, Table, App, Switch, Pagination } from "antd";
import { TypeUser } from "@/types/TypeUsers";
import { UserTypeForm } from "@/forms/UserTypeForm/UserTypeForm";
import Column from "antd/es/table/Column";
import { useDeleteUserTypeMutation, useGetUserTypesQuery, useSelectUserTypesPaginateQuery } from "@/api/services/userTypes";
import { useState } from "react";
import { OptionInGetQuerys } from "@/types/generalTypes";

const { useApp } = App;

export const UsersTypePage = () => {
  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetUserTypesQuery(option);
  console.log(data, isLoading, isFetching, "informacion original")
  const { data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate } = useSelectUserTypesPaginateQuery({ option, limit: 2, page });
  console.log(dataPaginate, isLoadingPaginate, isFetchingPaginate, "revisando la informacion que me tiene que mandar")
  //const [deleteUserType, {data:dataDelete, error:errorDelete, isLoading:isLoadingDelete}] = useDeleteUserTypeMutation()
  const [deleteUserType] = useDeleteUserTypeMutation()
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

  const loading = isLoading || isFetching;

  return (
    <div>
      <div className="flex justify-between  items-center">
        <Button type="primary" onClick={handleCreate}>
          Agregar tipo de Usuario
        </Button>
        <Switch defaultChecked checkedChildren="Activos" unCheckedChildren="Eliminados" onChange={handleSwitch} />
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
              defaultPageSize={2}
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
