import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { ModalUI } from "../../components/ModalUI/ModalUI";
import { dataUsers } from "../../../dataMock/dataMock";
import { useModalHook } from "../../../dataMock/useModalHook";
import { useState } from "react";
import { User } from "../../../types/User";

export const UsersPage = () => {
  const { isModalOpen, handleOk, handleCancel, showModal } = useModalHook();
  const [edit, setEdit] = useState<User & { edit: boolean }>({
    edit: false,
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    address: "",
  });

  const handleEdit = (record: User) => {
    console.log(record, "editando");
    setEdit({ ...record, edit: true });
    showModal();
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
    showModal();
  };

  const handleDelete = (record: User) => {
    console.log("Eliminando usuario", record);
  };

  return (
    <div>
      <Button type="primary" onClick={() => handleCreate()}>
        Agregar Usuario
      </Button>
      <br />
      <br />
      <Table
        rowKey={(record) => record.id}
        dataSource={dataUsers}
        pagination={false}
      >
        <Column title="Nombre" dataIndex="firstName" key="firstName" />
        <Column title="Apellido" dataIndex="lastName" key="lastName" />
        <Column title="Edad" dataIndex="age" key="age" />
        <Column title="Direccion" dataIndex="address" key="address" />
        <Column
          title="Action"
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
      <ModalUI
        title={
          edit.edit ? `Editando usuario ${edit.firstName}` : "Agregar usuario"
        }
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};
