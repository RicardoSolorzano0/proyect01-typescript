import { Button, Table, App } from "antd";
// import { useState } from "react";
import { TypeUser } from "../../../types/TypeUsers";
// import { dataTypeUsers } from "../../../dataMock/dataMock";
 import { TypeUserForm } from "../../../forms/TypeUserForm/TypeUserForm";
import Column from "antd/es/table/Column";
import { useDeleteUserTypeMutation, useGetUserTypesQuery } from "../../../services/userTypes";

const { useApp } = App;

export const TypeUsersPage = () => {
  const {data, error, isLoading, isFetching} = useGetUserTypesQuery("active");
  const [deleteUserType, {data:dataDelete, error:errorDelete, isLoading:isLoadingDelete}] = useDeleteUserTypeMutation()

  console.log(data, error, isLoading, isFetching, "check information")
  console.log(dataDelete, errorDelete, isLoadingDelete, "check information")

  const { modal, notification } = useApp();
  // const [typeUsers, setTypeUsers] = useState<TypeUser[]>(data as TypeUser[]);

  const handleCreate = () => {
    const mdl = modal.info({
      title: "Crear nuevo tipo de usuario",
      content: (
        <TypeUserForm
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
         <TypeUserForm
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
      onOk: () => {
        deleteUserType(record.id);
        // setTypeUsers(typeUsers.filter((user) => user.id !== record.id));
        notification.success({
          message: "Tipo de usuario eliminado",
          description: `Se ha eliminado el tipo de usuario ${record.name}`,
          duration: 2,
        });
      },
    });
  };

  const loading = isLoading || isFetching;


  console.log("cargando informacion ", loading)

  return (
    <div>
      <Button type="primary" onClick={handleCreate}>
        Agregar tipo de Usuario
      </Button>
      <br />
      <br />

      {loading ?
      <p>Cargando informacion...</p>
      :  
      <Table
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={false}
    >
      <Column title="Nombre" dataIndex="name" key="name" />
      <Column title="Descripción" dataIndex="description" key="description" />
      <Column title="Color" dataIndex="color" key="color" />
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
    </Table>
    }

     
    </div>
  );
};
