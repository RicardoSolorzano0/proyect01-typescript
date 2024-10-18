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
  // handleOk: () => void;
  handleCancel: () => void;
};

export const UserForm = ({ user, handleCancel }: Props) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (!user) {
      console.log("creando un nuevo usuario");
    } else {
      console.log("editando un usuario");
    }

    console.log("Success:", values);
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
        name="firstname"
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
        name="lastname"
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
