import { Input, Form, Button, App, DatePicker } from "antd";
import type { FormProps } from "antd";
import { User } from "@/types/User";
import { FormUi } from "@/forms/FormUi/FormUi";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useCreateUserMutation, useUpdateUserMutation } from "@/api/services/user";
import { SelectUI } from "@/ui/components/SelectUI";
import { useGetUserTypesQuery } from "@/api/services/userTypes";
import { useTranslation } from "react-i18next";
import { globalT } from "@/i18n";

const { useApp } = App;

const { useForm, Item } = Form;

type UserFormProps = Omit<User, "id" | "birthdate"> & {
  birthdate: Dayjs;
};

type Props = {
  user?: User;
  handleCancel: () => void;
};

export const UserForm = ({ user, handleCancel }: Props) => {
  const { t } = useTranslation("users");
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { data, isLoading: isLoadingTypes } = useGetUserTypesQuery("active");

  const optionUserTypes = data?.map((type) => ({
    label: type.name,
    value: type.id
  }));

  const { notification } = useApp();
  const [form] = useForm<UserFormProps>();

  const initialValues: Partial<UserFormProps> = {
    name: user?.name,
    last_name: user?.last_name,
    birthdate: user ? dayjs(user?.birthdate) : dayjs(),
    address: user?.address,
    email: user?.email,
    gender: user?.gender,
    user_type_id: user?.user_type_id,
  };

  const onFinish = async (values: UserFormProps) => {
    try {
      if (!user) {
        console.log(values, "values")
        console.log(values.birthdate.toDate(), "values.birthdate.toDate()")
        await createUser({ ...values, birthdate: values.birthdate.toDate() }).unwrap();
      } else {
        await updateUser({ id: user.id, ...values, birthdate: values.birthdate.toDate() }).unwrap();
      }
      notification.success({
        //message: `${user ? t("messages.userUpdated") : t("messages.userCreated")}`,
        message: t(`messages.user${user ? "Updated" : "Created"}`),
        // message: `"Usuario ${user ? "actualizado" : "creado"}"`,
        description: `${user ? t("messages.userUpdatedDescription", { user: `${user?.name} ${user?.last_name}` }) : t("messages.userCreatedDescription")}`,
        duration: 2,
      });
    } catch (error) {
      const parsedError = error as { error: string };
      console.log(error, "revisando el mensaje de erro")
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
      description: globalT("checkFields"),
      duration: 2,
    });
    console.log("Failed:", errorInfo);
  };

  const loading = isCreating || isUpdating || isLoadingTypes;

  return (
    <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
      <Item
        label={t("form.name")}
        name="name"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label={t("form.lastName")}
        name="last_name"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label={t("form.birthdate")}
        name="birthdate"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <DatePicker format={"LL"} />
      </Item>
      <Item
        label={t("form.address")}
        name="address"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label={t("form.email")}
        name="email"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <Input type="email" />
      </Item>
      <Item
        label={t("form.gender")}
        name="gender"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <SelectUI size="large" placeholder={globalT("selectOption")} options={[
          { value: 'M', label: 'Masculino' },
          { value: 'F', label: 'Femenino' },
        ]}
        />
      </Item>
      <Item
        label={t("form.userType")}
        name="user_type_id"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <SelectUI size="large" placeholder={globalT("selectOption")} options={optionUserTypes}
        />
      </Item>
      <div className="flex justify-center gap-2">
        <Button onClick={handleCancel}>{globalT("cancel")}</Button>
        <Button type="primary" htmlType="submit">
          {user ? globalT("edit") : globalT("create")}
        </Button>
      </div>
    </FormUi>
  );
};
