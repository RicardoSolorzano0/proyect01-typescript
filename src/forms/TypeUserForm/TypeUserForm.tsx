import { Input, Form, Button } from "antd";
import type { FormProps } from "antd";
import type { TypeUser } from "../../types/TypeUsers";

type Props = {
  typeUser?: TypeUser;
  typeUsers: TypeUser[];
  handleCancel: () => void;
  setTypeUsers: (users: TypeUser[]) => void;
};

export const TypeUserForm = ({
  typeUser,
  typeUsers,
  handleCancel,
  setTypeUsers,
}: Props) => {
  const onFinish: FormProps["onFinish"] = (values) => {
    if (!typeUser) {
      setTypeUsers([...typeUsers, { ...values, id: Date.now() }]);
    } else {
      setTypeUsers(
        typeUsers.map((item) => {
          if (item.id === typeUser.id) {
            return { ...item, ...values };
          }
          return item;
        })
      );
    }
    handleCancel();
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
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
        name="name"
        initialValue={typeUser?.name}
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
        label="Descripción"
        name="description"
        initialValue={typeUser?.description}
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
        label="Color"
        name="color"
        initialValue={typeUser?.color}
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
          {typeUser ? "Editar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
};
