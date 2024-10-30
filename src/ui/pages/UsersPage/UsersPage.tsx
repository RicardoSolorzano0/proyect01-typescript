import { Button, Table, App, Switch } from "antd";
import Column from "antd/es/table/Column";
import { useState } from "react";
import { User } from "@/types/User";
import { UserForm } from "@/forms/UserForm/UserForm";
import dayjs from "dayjs";
//import { ExampleRedux } from "@/counter/ExampleRedux";
import { useDeleteUserMutation, useGetUsersQuery } from "@/services/user";
import { OpitionsInGetQuerys } from "@/types/generalTypes";

const { useApp } = App;

export const UsersPage = () => {
  const [option, setOption] = useState<OpitionsInGetQuerys>("active");
  const {data, isLoading, isFetching} = useGetUsersQuery(option);
  const [deleteUser] = useDeleteUserMutation();

  const { modal, notification } = useApp();

  const handleEdit = (record: User) => {
    const mdl = modal.info({
      title: `Editar usuario ${record.name} ${record.last_name}`,
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
      title: "Crear nuevo usuario",
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
      title: "Eliminar usuario",
      content: `¿Estas seguro de eliminar el usuario ${record.name} ${record.last_name}?`,
      onOk:async  () => {
        try{
          await deleteUser(record.id).unwrap();
          notification.success({
            message: "Usuario eliminado",
            description: `Se ha eliminado el usuario ${record.name} ${record.last_name}`,
            duration: 2,
          });
        }catch(error){
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

  const handleSwitch = (record:boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoading || isFetching;

  return (
    <>
      {/* <ExampleRedux /> */}
      <div className="flex justify-between items-center">
      <Button type="primary" onClick={handleCreate}>
        Agregar Usuario
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
          <Column title="Apellido" dataIndex="last_name" key="last_name" />
          <Column title="Fecha de nacimiento" dataIndex="birthdate" key="birthdate" render={(date) => {
            return dayjs(date.toString().substring(0, 10)).format("DD/MM/YYYY")}} />
          <Column title="Direccion" dataIndex="address" key="address" />
          {option==="active" && <Column
            title="Acciones"
            key="action"
            render={(_, record: User) => (
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
          />}
        </Table>
      }
    </>
  );
};
