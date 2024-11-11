import { FormUi } from "@/forms/FormUi/FormUi"
import { globalT } from "@/i18n";
import { Button, Form, Input, App } from "antd";
import type { FormProps } from "antd";
import { useTranslation } from "react-i18next";

const { useApp } = App;

const { useForm, Item } = Form;

type LoginFormProps = {
    email: string;
    password: string;
}

export const FormLogin = () => {
    const { t } = useTranslation("login");
    const [form] = useForm<LoginFormProps>();

    const initialValues: Partial<LoginFormProps> = {
        email: "",
        password: "",
    };

    const { notification } = useApp();

    const onFinish = async (values: LoginFormProps) => {
        console.log(values, "revisando la informacion")
        try {
            //   if (!user) {
            //     await createUser({ ...values, birthdate: values.birthdate.toDate() }).unwrap();
            //   } else {
            //     await updateUser({ id: user.id, ...values, birthdate: values.birthdate.toDate() }).unwrap();
            //   }
            //   notification.success({
            //     message: t(`messages.success.${user ? "update" : "create"}`),
            //     description: t(`messages.success.${user ? "updateDescription" : "createDescription"}`),
            //     duration: 2,
            //   });
        } catch (error) {
            //   const parsedError = error as { error: string };
            //   notification.error({
            //     message: "Error",
            //     description: t(`messages.errors.${parsedError.error}`),
            //     duration: 2,
            //   })
        }
        // handleCancel();
    };

    const onFinishFailed: FormProps<LoginFormProps>["onFinishFailed"] = (
        errorInfo
    ) => {
        notification.error({
            message: "Error",
            description: globalT("checkFields"),
            duration: 2,
        });
        console.log("Failed:", errorInfo);
    };

    const loading = false

    return (
        <div className="flex items-center justify-center bg-[#001529] h-screen">
            <div className="bg-white rounded-lg p-5">
                <h1 className="text-center text-2xl">{t("page.login")}</h1>
                <FormUi initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
                    <Item
                        label={t("page.email")}
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
                        label={t("page.password")}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: globalT("fieldRequired"),
                            },
                        ]}
                    >
                        <Input type="password" />
                    </Item>
                    <div className="flex justify-center gap-2">
                        <Button type="primary" htmlType="submit">
                            {t("page.login")}
                        </Button>
                    </div>
                </FormUi>
            </div>

        </div >
    )
}