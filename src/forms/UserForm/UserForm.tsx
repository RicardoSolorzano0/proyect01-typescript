import { Input, Form, Button, App, DatePicker } from "antd";
import type { FormProps } from "antd";
import { User, UserGender } from "@/types/User";
import { FormUi } from "@/forms/FormUi/FormUi";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useCreateUserMutation, useUpdateUserMutation } from "@/services/user";
import { SelectUI } from "@/ui/components/SelectUI";
import { useGetUserTypesQuery } from "@/services/userTypes";

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
  const {data, isLoading: isLoadingTypes} = useGetUserTypesQuery("active");
  
  const optionUserTypes = data?.map((type) => ({
    label: type.name,
    value: type.id
  }));

  const { notification } = useApp();
  const [form] = useForm<UserFormProps>();
 
  const initialValues: Partial<UserFormProps> = {
    name: user?.name,
    last_name: user?.last_name,
    birthdate: user?  dayjs(user?.birthdate) : dayjs(), 
    address: user?.address,
    email: user?.email,
    gender: user?.gender,
    user_type_id: user?.user_type_id,
  };

  const onFinish = async(values: UserFormProps) => {
    try{
      if (!user) {
        await createUser({ ...values, birthdate: values.birthdate.toDate() }).unwrap();
      } else {
        await updateUser({ id: user.id, ...values, birthdate: values.birthdate.toDate() }).unwrap();
      }
       notification.success({
          message: `"Usuario ${user? "actualizado": "creado"}"`,
          description: `Se ha ${user? "actualizado": "creado"} el usuario`,
          duration: 2,
        });
    }catch(error){
      const parsedError = error as { error: string };
      notification.error({
        message: "Error",
        description: parsedError.error,
        duration: 2,
      })
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

  const handleSelectChange = (value:UserGender) =>{
    form.setFieldsValue({gender: value})
  }

  const handleSelectChangeType = (value:string) =>{
    form.setFieldsValue({user_type_id: value})
  }

  const loading = isCreating || isUpdating || isLoadingTypes;

  return (
    <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
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
      <Item
        label="Correo"
        name="email"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input type="email" />
      </Item>
      <Item
        label="Género"
        name="gender"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
         <SelectUI size="large" placeholder="Seleccione una opción" options={[
        { value: 'M', label: 'Masculino' },
        { value: 'F', label: 'Femenino' },
      ]}
      onChange={handleSelectChange}
    />
      </Item>
      <Item
        label="Tipo de usuario"
        name="user_type_id"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
         <SelectUI size="large" placeholder="Seleccione una opción" options={optionUserTypes}
      onChange={handleSelectChangeType}
    />
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
