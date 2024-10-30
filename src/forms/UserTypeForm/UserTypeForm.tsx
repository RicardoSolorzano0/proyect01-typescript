import { Input, Form, Button, App, ColorPicker } from "antd";
import type { FormProps } from "antd";
import { FormUi } from "@/forms/FormUi/FormUi";
import { useCreateUserTypeMutation, useUpdateUserTypeMutation } from "@/services/userTypes";
import { CreateUserTypePayload } from "@/types/payloads/payloadTypeUserForm";
import type { TypeUser } from '@/types/TypeUsers';

const { useApp } = App;
const { useForm, Item } = Form;

type Props = {
  typeUser?: TypeUser;
  handleCancel: () => void;
};

type TypeUserFormProps = CreateUserTypePayload;

export const UserTypeForm = ({
  typeUser,
  handleCancel,
}: Props) => {
  const { notification } = useApp();
  const [form] = useForm<TypeUserFormProps>();

  const [createUserType, { isLoading: isCreating }] = useCreateUserTypeMutation();
  // se puede hacer de la siguiente manera también
  //const [updateUserType,{data:dataUpdate, error:errorUpdate, isLoading:isLoadingUpdate, isSuccess:isSuccessUpdate}] = useUpdateUserTypeMutation();
  const [updateUserType, { isLoading: isUpdating }] = useUpdateUserTypeMutation();
  
  const loading = isCreating || isUpdating;

  const initValues: Partial<TypeUserFormProps> = {
    name: typeUser?.name,
    description: typeUser?.description,
    color: typeUser?.color,
  };

  const onFinish = async (values: TypeUserFormProps) => {
    try{
      if (!typeUser) {
        await createUserType(values).unwrap();
      } else {
        await updateUserType({ id: typeUser.id , ...values}).unwrap();
      }
      notification.success({
        message: `Tipo de usuario ${typeUser ? " actualizado" : " creado"}`,
        description: `Se ha ${typeUser ? "actualizado" : "creado"} un nuevo tipo de usuario`,
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
    <FormUi form={form} initialValues={initValues} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
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
        <ColorPicker onChange={(color) => form.setFieldsValue({ color: color.toHexString() })} />
      </Item>
      <div className="flex justify-center gap-2">
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button type="primary" htmlType="submit">
          {typeUser ? "Editar" : "Crear"}
        </Button>
      </div>
    </FormUi>
  );
};
