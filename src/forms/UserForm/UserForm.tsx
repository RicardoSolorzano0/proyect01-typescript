import { Input, Form, Button, App } from "antd";
import type { FormProps } from "antd";
import { User } from "../../types/User";
import { useEffect } from "react";
const { useApp } = App;

const { useForm, useWatch, Item } = Form;

type UserFormProps = Omit<User, "id">;

type Props = {
  user?: User;
  users: User[];
  handleCancel: () => void;
  setUsers: (users: User[]) => void;
};

export const UserForm = ({ user, handleCancel, setUsers, users }: Props) => {
  const { notification } = useApp();
  const [form] = useForm<UserFormProps>();
  const age = useWatch("age", form);

  useEffect(() => {
    console.log("edad changed", age);
  }, [age]);

  const initialValues: Partial<UserFormProps> = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age,
    address: user?.address,
  };

  const onFinish = (values: UserFormProps) => {
    if (!user) {
      setUsers([...users, { ...values, id: Date.now().toString() }]);
      notification.success({
        message: "Usuario creado",
        description: "Se ha creado un nuevo usuario",
        duration: 2,
      });
    } else {
      setUsers(
        users.map((item) => {
          if (item.id === user.id) {
            return { ...item, ...values };
          }
          return item;
        })
      );
      notification.success({
        message: "Usuario actualizado",
        description: "Se ha actualizado el usuario",
        duration: 2,
      });
    }
    handleCancel();
  };

  const onFinishFailed: FormProps<UserFormProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    notification.error({
      message: "Error",
      description: "Revise los campos",
      duration: 2,
    });
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
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Item
        label="Nombre"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Apellido"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="Edad"
        name="age"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input type="number" />
      </Item>
      <Item
        label="Dirección"
        name="address"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Item>
      <div className="flex justify-center gap-2">
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button type="primary" htmlType="submit">
          {user ? "Editar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
};
