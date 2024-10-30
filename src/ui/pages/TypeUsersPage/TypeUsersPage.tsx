import { Button, Table, App, Switch } from "antd";
import { TypeUser } from "@/types/TypeUsers";
 import { TypeUserForm } from "@/forms/TypeUserForm/TypeUserForm";
import Column from "antd/es/table/Column";
import { useDeleteUserTypeMutation, useGetUserTypesQuery } from "@/services/userTypes";
import { useState } from "react";
import { OpitionsInGetQuerys } from "@/types/generalTypes";

const { useApp } = App;

export const TypeUsersPage = () => {
  const [option, setOption] = useState<OpitionsInGetQuerys>("active");
  const {data,  isLoading, isFetching} = useGetUserTypesQuery(option);
  //const [deleteUserType, {data:dataDelete, error:errorDelete, isLoading:isLoadingDelete}] = useDeleteUserTypeMutation()
  const [deleteUserType] = useDeleteUserTypeMutation()
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
      onOk: async () => {
        try{
          await deleteUserType(record.id).unwrap();
          // setTypeUsers(typeUsers.filter((user) => user.id !== record.id));
          notification.success({
            message: "Tipo de usuario eliminado",
            description: `Se ha eliminado el tipo de usuario ${record.name}`,
            duration: 2,
          });
        }catch(error){
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

  const handleSwitch = (record:boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoading || isFetching;


  return (
    <div>
      <div className="flex justify-between  items-center">
        <Button type="primary" onClick={handleCreate}>
          Agregar tipo de Usuario
        </Button>
        <Switch defaultChecked checkedChildren="Activos" unCheckedChildren="Eliminados" onChange={handleSwitch}/>
      </div>
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
    
    }

     
    </div>
  );
};
