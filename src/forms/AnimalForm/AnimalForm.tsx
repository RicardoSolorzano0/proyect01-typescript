import { Animal } from "@/types/Animals";
import { FormUi } from "../FormUi/FormUi";
import { Input, Form, App, FormProps, Button } from 'antd'
import { useTranslation } from "react-i18next";
import { globalT } from "@/i18n";
import { useCreateAnimalMutation, useUpdateAnimalMutation } from "@/api/services/animals";

type Props = {
  animal?: Animal;
  handleCancel: () => void;
};

type AnimalFormProps = Omit<Animal, 'id'>

const { useApp } = App

const { useForm, Item } = Form

export const AnimalForm = ({ animal, handleCancel }: Props) => {
  const { t } = useTranslation("animals");
  const [createAnimal, { isLoading: isCreating }] = useCreateAnimalMutation();
  const [updateAnimal, { isLoading: isUpdating }] = useUpdateAnimalMutation();
  const { notification } = useApp()
  const [form] = useForm<AnimalFormProps>();


  const onFinish = async (values: AnimalFormProps) => {
    try {
      if (!animal) {
        await createAnimal({ ...values}).unwrap();
      } else {
         await updateAnimal({ id: animal.id, ...values }).unwrap();
      }
      notification.success({
        message: t(`messages.success.${animal ? "update" : "create"}`),
        description: `${animal ? t("messages.success.updateDescription", { animal: `${animal?.name}` }) : t("messages.success.createDescription")}`,
        duration: 2,
      });
    } catch (error) {
      const parsedError = error as { error: string };

      notification.error({
        message: "Error",
        description: t(`messages.errors.${parsedError.error}`),
        duration: 2,
      })
    }
    handleCancel();
  };

  const onFinishFailed: FormProps<AnimalFormProps>["onFinishFailed"] = (
    errorInfo
  ) => {
    notification.error({
      message: "Error",
      description: globalT("checkFields"),
      duration: 2,
    });
    console.log("Failed:", errorInfo);
  };

  const initialValues: Partial<AnimalFormProps> = {
    name: animal?.name,
    description: animal?.description
  };

  const loading = isCreating ||isUpdating

  return (
    <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
      <Item
        label={t("entity.name")}
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
        label={t("entity.description")}
        name="description"
        rules={[
          {
            required: true,
            message: globalT("fieldRequired"),
          },
        ]}
      >
        <Input />
      </Item>
      <div className="flex justify-center gap-2">
        <Button onClick={handleCancel}>{globalT("cancel")}</Button>
        <Button type="primary" htmlType="submit">
          {animal ? globalT("edit") : globalT("create")}
        </Button>
      </div>
    </FormUi>
  )
}