import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { ModalUI } from "../../components/ModalUI/ModalUI";
import { dataUsers } from "../../../dataMock/dataMock";
import { useModalHook } from "../../../dataMock/useModalHook";

export const UsersPage = () => {
  const { isModalOpen, handleOk, handleCancel, showModal } = useModalHook();
  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
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
              <Button variant="solid" onClick={() => console.log("A", record)}>
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
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};
