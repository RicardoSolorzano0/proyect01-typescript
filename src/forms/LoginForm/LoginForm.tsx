import { routes } from "@/constants/routes";
import { useFirebaseContext } from "@/context/FirebaseCtx";
import { loginWithEmailPassword } from "@/firebase/providers";
import { FormUi } from "@/forms/FormUi/FormUi"
import { useAppDispatch } from "@/hooks";
import { globalT } from "@/i18n";
import { Button, Form, Input, App } from "antd";
import type { FormProps } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { logoutUser, setCurrentUser } from "@/store/slices/userSlice"; 

const { useApp } = App;

const { useForm, Item } = Form;

type LoginFormProps = {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { auth } = useFirebaseContext();
    const navigate = useNavigate()
    const { t } = useTranslation("login");
    const [form] = useForm<LoginFormProps>();
    const [loading, setLoading] = useState(true);

    const initialValues: Partial<LoginFormProps> = {
        email: "",
        password: "",
    };

    const { notification } = useApp();

    const onFinish = async (values: LoginFormProps) => {
        try {
            const resp = await loginWithEmailPassword(auth, values);
            if (resp.ok) {
                notification.success({
                    message:t("messages.success.login"),
                    description: t("messages.success.loginDescription"),
                    duration: 2,
                });
            }else{
                notification.error({
                    message: "Error",
                    description: t(`messages.errors.NOT_FOUND`),
                    duration: 2,
                })
            }
        } catch (error) {
              const parsedError = error as { error: string };
              notification.error({
                message: "Error",
                description: t(`messages.errors.${parsedError.error}`),
                duration: 2,
              })
        }
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

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setLoading(true)
            if (user) {
                dispatch(setCurrentUser({
                    displayName: user.displayName?user.displayName:"User",
                    email: user.email!,
                    uid: user.uid
                }))
                navigate(routes.home.root);
                setLoading(false)
            }else{
                dispatch(logoutUser())
                setLoading(false)
            }
        });
    }, []);

    if(loading){
        return <>
            <div className="flex items-center justify-center bg-[#001529] h-screen">
                <div className="bg-white rounded-lg p-5 w-[400px]">
                    <div className="flex justify-center gap-2">
                        Cargando
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <div className="flex items-center justify-center bg-[#001529] h-screen">
            <div className="bg-white rounded-lg p-5 w-[400px]">
                <h1 className="text-center text-2xl">{t("page.login")}</h1>
                <FormUi layout="horizontal" initialValues={initialValues} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} disabled={loading}>
                    <Item
                        className="mt-4"
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