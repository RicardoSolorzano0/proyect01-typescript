import { Button, Table, Modal } from "antd";
import Column from "antd/es/table/Column";
import { dataUsers } from "../../../dataMock/dataMock";
import { useState } from "react";
import { User } from "../../../types/User";
import { UserForm } from "../../../forms/UserForm/UserForm";

export const UsersPage = () => {
  const [modal, contextHolder] = Modal.useModal();
  const [users, setUsers] = useState<User[]>(dataUsers);
  const [edit, setEdit] = useState<User & { edit: boolean }>({
    edit: false,
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    address: "",
  });

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
      onOk: () => {
        setUsers(users.map((user) => (user.id === record.id ? edit : user)));
      },
      onCancel: () => {},
    });
  };

  const handleCreate = () => {
    console.log("creando un nuevo usuario");
    setEdit({
      edit: false,
      id: "",
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
    });
    //showModal();
    modal.confirm({
      title: "Crear nuevo usuario",
      content: (
        <UserForm handleCancel={() => {}} setUsers={setUsers} users={users} />
      ),
      onOk: () => {
        setUsers([...users, edit]);
        // handleCancel();
      },
      onClose: () => {
        console.log("se cerro");
      },
    });
  };

  const handleDelete = (record: User) => {
    modal.confirm({
      title: "Eliminar usuario",
      content: `¿Estas seguro de eliminar el usuario ${record.firstName} ${record.lastName}?`,
      onOk: () => {
        setUsers(users.filter((user) => user.id !== record.id));
      },
    });
  };

  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => handleCreate()}>
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
          <Column title="Edad" dataIndex="age" key="age" />
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
