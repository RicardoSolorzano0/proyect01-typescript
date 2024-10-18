import { Input, Form, Button } from "antd";
import type { FormProps } from "antd";
import { User } from "../../types/User";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type Props = {
  user?: User;
  users: User[];
  handleCancel: () => void;
  setUsers: (users: User[]) => void;
};

export const UserForm = ({ user, handleCancel, setUsers, users }: Props) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!user) {
      console.log("agregar un nuevo usuario");
      // setUsers([...users, { ...values, id: Date.now() }]);
    } else {
      setUsers(
        users.map((item) => {
          if (item.id === user.id) {
            return { ...item, ...values };
          }
          return item;
        })
      );
    }
    handleCancel();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="firstName"
        initialValue={user?.firstName}
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Apellido"
        name="lastName"
        initialValue={user?.lastName}
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Edad"
        name="age"
        initialValue={user?.age}
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Dirección"
        name="address"
        initialValue={user?.address}
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <div className="flex justify-center gap-2">
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button type="primary" htmlType="submit">
          {user ? "Editar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
};
