import { Button, Table, App } from "antd";
import Column from "antd/es/table/Column";
import { dataUsers } from "../../../dataMock/dataMock";
import { useState } from "react";
import { User } from "../../../types/User";
import { UserForm } from "../../../forms/UserForm/UserForm";
import dayjs from "dayjs";
import { Counter } from "../../../counter/Counter";

const { useApp } = App;

export const UsersPage = () => {
  const { modal, notification } = useApp();
  const [users, setUsers] = useState<User[]>(dataUsers);

  const handleEdit = (record: User) => {
    const mdl = modal.info({
      title: `Editar usuario ${record.firstName} ${record.lastName}`,
      content: (
        <UserForm
          user={record}
          handleCancel={() => mdl.destroy()}
          setUsers={setUsers}
          users={users}
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
          setUsers={setUsers}
          users={users}
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
      content: `¿Estas seguro de eliminar el usuario ${record.firstName} ${record.lastName}?`,
      onOk: () => {
        setUsers(users.filter((user) => user.id !== record.id));
        notification.success({
          message: "Usuario eliminado",
          description: `Se ha eliminado el usuario ${record.firstName} ${record.lastName}`,
          duration: 2,
        });
      },
    });
    console.log(users, "revisando la informacion que necesitamos")
  };

  return (
    <div>

      <Counter />
      <Button type="primary" onClick={handleCreate}>
        Agregar Usuario
      </Button>
      <br />
      <br />
      {users.length === 0 ? (
        <h1>No hay usuarios registra uno</h1>
      ) : (
        <Table
          rowKey={(record) => record.id}
          dataSource={users}
          pagination={false}
        >
          <Column title="Nombre" dataIndex="firstName" key="firstName" />
          <Column title="Apellido" dataIndex="lastName" key="lastName" />
          <Column title="Fecha de nacimiento" dataIndex="birthdate" key="birthdate" render={(date) => dayjs(date).format("DD/MM/YYYY")} />
          <Column title="Direccion" dataIndex="address" key="address" />
          <Column
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
          />
        </Table>
      )}
    </div>
  );
};
