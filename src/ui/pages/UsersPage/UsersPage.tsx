import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { ModalUI } from "../../components/ModalUI/ModalUI";
import { dataUsers } from "../../../dataMock/dataMock";
import { useModalHook } from "../../../dataMock/useModalHook";
import { useState } from "react";
import { AnyObject } from "antd/es/_util/type";

export const UsersPage = () => {
  const { isModalOpen, handleOk, handleCancel, showModal } = useModalHook();
  const [edit, setEdit] = useState(false);

  const handleEdit = (record: AnyObject) => {
    console.log(record, "editando");
    setEdit(true);
    showModal();
  };

  const handleCreate = () => {
    console.log("creando un nuevo usuario");
    setEdit(false);
    showModal();
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
          render={(_, record) => (
            <div className="flex gap-2">
              <Button variant="solid" onClick={() => handleEdit(record)}>
                Editar
              </Button>
              <Button
                variant="solid"
                color="danger"
                onClick={() => console.log("B", record)}
              >
                Eliminar
              </Button>
            </div>
          )}
        />
      </Table>
      <ModalUI
        title={edit ? "Editando usuario " : "Agregar usuario"}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};
