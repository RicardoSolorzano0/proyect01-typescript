import { Button, Table } from "antd";
import Column from "antd/es/table/Column";
import { ModalUI } from "../../components/ModalUI/ModalUI";

export const UsersPage = () => {
  const data = [
    {
      id: "1",
      firstName: "John",
      lastName: "Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      id: "2",
      firstName: "Jim",
      lastName: "Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      id: "3",
      firstName: "Joe",
      lastName: "Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div>
      <Button type="primary">Agregar Usuario</Button>
      <br />
      <br />
      <Table
        rowKey={(record) => record.id}
        dataSource={data}
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
            <div style={{ display: "flex", gap: 8 }}>
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
      <ModalUI />
    </div>
  );
};
