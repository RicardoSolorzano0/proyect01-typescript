import { Input, Form, Button, App, DatePicker } from "antd";
import type { FormProps } from "antd";
import { User } from "../../types/User";
import { FormUi } from "../FormUi/FormUi";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { useApp } = App;

const { useForm, Item } = Form;

type UserFormProps = Omit<User, "id"| "age"> & {
  age: Dayjs;
};

type Props = {
  user?: User;
  users: User[];
  handleCancel: () => void;
  setUsers: (users: User[]) => void;
};

export const UserForm = ({ user, handleCancel, setUsers, users }: Props) => {
  const { notification } = useApp();
  const [form] = useForm<UserFormProps>();
 

  const initialValues: Partial<UserFormProps> = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?  dayjs(user?.age) : dayjs(), 
    address: user?.address,
  };

  const onFinish = (values: UserFormProps) => {
    if (!user) {
      setUsers([...users, { ...values, id: Date.now().toString(), age: values.age.toDate() }]);
      notification.success({
        message: "Usuario creado",
        description: "Se ha creado un nuevo usuario",
        duration: 2,
      });
    } else {
      setUsers(
        users.map((item) => {
          if (item.id === user.id) {
            return { ...item, ...values, age: values.age.toDate() };
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
    <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
        label="Fecha de nac"
        name="age"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
         <DatePicker format={"DD/MM/YYYY"}   />
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
    </FormUi>
  );
};
