import { User } from "@/types/User";
import { FormUi } from "../FormUi/FormUi";
import type { FormProps } from "antd";
import { Button, Form, App } from "antd";
import { CreateAnimalUserPayload } from "@/types/payloads/payloadAnimalUserForm";
import { globalT } from "@/i18n";
import { useTranslation } from "react-i18next";
import { Select, Space } from 'antd';
import { useGetAnimalsQuery } from "@/api/services/animals";
import { useCreateAnimalsUserMutation, useGetAnimalsUserQuery } from "@/api/services/animalsUser";
type Props = {
    user: User;
    handleCancel: () => void;
};

const { useForm, Item } = Form;

type AnimalUserFormProps = Pick<CreateAnimalUserPayload, 'animals'>

const { useApp } = App;
export const AnimalUserForm = ({ user, handleCancel }: Props) => {
    const { t } = useTranslation();
    const [form] = useForm<AnimalUserFormProps>()
    const { data, isLoading, isFetching } = useGetAnimalsQuery("active");
    const [create, { isLoading: isCreating }] = useCreateAnimalsUserMutation();
    const {data:dataAnimal, isLoading:isLoadingAnimals} = useGetAnimalsUserQuery({user_id:user.id});
    const { notification } = useApp();
    const optionsAnimals = data?.map((animal) => ({
        label: animal.name,
        value: animal.id,
    }))

    const initValues: Partial<AnimalUserFormProps> = {
        //user_id: user.id,
        animals: dataAnimal?.map((animal) => animal.id) || [],
    };

    // const initialValues = {
    //     user_id: '123',
    //     animals: undefined
    // }

    // useEffect(() => {
    //     form.setFieldsValue(initValues);
    // }, [initValues]);
    
    const onFinish = async (values: AnimalUserFormProps) => {
        try {
            await create({ user_id: user.id, ...values }).unwrap()
            notification.success({
                // message: ` ${typeUser ? t("messages.userUpdated") : t("messages.userCreated")}`,
                // description: `${typeUser ? t("messages.userUpdatedDescription") : t("messages.userCreatedDescription")}`,
                  message: `Animales favoritos`,
                 description: `Animales agregados exitosamente`,
                duration: 2,
            });
        } catch (error) {
              const parsedError = error as { error: string };
              notification.error({
                message: "Error",
                description: parsedError.error,
                duration: 2,
              })
        }
        handleCancel();
    };

    const onFinishFailed: FormProps<AnimalUserFormProps>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
        notification.error({
          message: "Error",
          description: globalT("checkFields"),
          duration: 2,
        });
    };

    const loading = isLoading || isFetching || isCreating || isLoadingAnimals;

    return (
        <>
            {
                dataAnimal === undefined 
                    ? <div>Cargando</div>
                    : (
                        <FormUi form={form} initialValues={initValues} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading} >
                            <Item
                                label={t("forms.animalUser.animal")}
                                name="animals"
                                rules={[
                                    {
                                        required: true,
                                        message: globalT("fieldRequired"),
                                    },
                                ]}
                            >
                                <Select
                                    optionFilterProp="label"
                                    mode="multiple"
                                    className="w-full mt-3"
                                    placeholder="Seleccione animales"
                                    options={optionsAnimals}
                                    optionRender={(option) => (
                                        <Space>
                                            {option.data.label}
                                        </Space>
                                    )}
                                />
                            </Item>
                            {/* <Item
                                className="hidden"
                                label={t("forms.animalUser.animal")}
                                name="user_id"
                            >
                            </Item> */}
                            <div className="flex justify-center gap-2 mt-5">
                                <Button onClick={handleCancel}>{globalT("cancel")}</Button>
                                <Button type="primary" htmlType="submit">
                                    Guardar
                                </Button>
                            </div>
                        </FormUi>
                    )
            }
       

        </>
    )
}