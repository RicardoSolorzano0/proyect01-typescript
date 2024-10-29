import { Input, Form, Button, App, DatePicker } from "antd";
import type { FormProps } from "antd";
import { User } from "@/types/User";
import { FormUi } from "@/forms/FormUi/FormUi";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useCreateUserMutation, useUpdateUserMutation } from "@/services/user";

const { useApp } = App;

const { useForm, Item } = Form;

type UserFormProps = Omit<User, "id"| "birthdate"> & {
  birthdate: Dayjs;
};

type Props = {
  user?: User;
  handleCancel: () => void;
};

export const UserForm = ({ user, handleCancel }: Props) => {
  const [createUser, {isLoading: isCreating}] = useCreateUserMutation();
  const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();
  
  const { notification } = useApp();
  const [form] = useForm<UserFormProps>();
 
  const initialValues: Partial<UserFormProps> = {
    name: user?.name,
    last_name: user?.last_name,
    birthdate: user?  dayjs(user?.birthdate) : dayjs(), 
    address: user?.address,
  };

  const onFinish = async(values: UserFormProps) => {
    if (!user) {
      await createUser({ ...values, birthdate: values.birthdate.toDate() }).unwrap();

      notification.success({
        message: "Usuario creado",
        description: "Se ha creado un nuevo usuario",
        duration: 2,
      });
    } else {
      //setUsers(
       // users.map((item) => {
         // if (item.id === user.id) {
           // return { ...item, ...values, birthdate: values.birthdate.toDate() };
         // }
          //return item;
       // })
      //);
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

  const loading = isCreating || isUpdating;

  return (
    <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
        label="Apellido"
        name="last_name"
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
        name="birthdate"
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
