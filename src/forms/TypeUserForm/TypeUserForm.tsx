import { Input, Form, Button, App } from "antd";
import type { FormProps } from "antd";
import type { TypeUser } from "../../types/TypeUsers";

const { useApp } = App;

const { useForm, Item } = Form;

type TypeUserFormProps = Omit<TypeUser, "id">;

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
  const { notification } = useApp();
  const [form] = useForm();

  const initValues: Partial<TypeUserFormProps> = {
    name: typeUser?.name,
    description: typeUser?.description,
    color: typeUser?.color,
  };

  const onFinish = (values: TypeUserFormProps) => {
    if (!typeUser) {
      setTypeUsers([...typeUsers, { ...values, id: Date.now().toString() }]);
      notification.success({
        message: "Tipo de usuario creado",
        description: "Se ha creado un nuevo tipo de usuario",
        duration: 2,
      });
    } else {
      setTypeUsers(
        typeUsers.map((item) => {
          if (item.id === typeUser.id) {
            return { ...item, ...values };
          }
          return item;
        })
      );
      notification.success({
        message: "Tipo de usuario actualizado",
        description: "Se ha actualizado el tipo de usuario",
        duration: 2,
      });
    }
    handleCancel();
  };

  const onFinishFailed: FormProps<TypeUserFormProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Error",
      description: "Revisar campos del formulario",
      duration: 2,
    });
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
      form={form}
      initialValues={initValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Item
        label="Nombre"
        name="name"
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
        label="Descripción"
        name="description"
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
        label="Color"
        name="color"
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
          {typeUser ? "Editar" : "Crear"}
        </Button>
      </div>
    </Form>
  );
};
