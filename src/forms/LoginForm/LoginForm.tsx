/* eslint-disable react-hooks/exhaustive-deps */
import { App, Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { routes } from '@/constants/routes';
import { useFirebaseContext } from '@/context/FirebaseContext';
import { loginWithEmailPassword } from '@/firebase/providers';
import { FormUi } from '@/forms/FormUi/FormUi';
import { useAppDispatch } from '@/hooks';
import { globalT } from '@/i18n';
import { logoutUser, setCurrentUser } from '@/store/slices/userSlice'; 

const { useApp } = App;

const { Item, useForm } = Form;

type LoginFormProps = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { auth } = useFirebaseContext();
    const navigate = useNavigate();
    const { t } = useTranslation('login');
    const [form] = useForm<LoginFormProps>();
    const [loading, setLoading] = useState(true);

    const initialValues: Partial<LoginFormProps> = {
        email: '',
        password: ''
    };

    const { notification } = useApp();

    const onFinish = async (values: LoginFormProps) => {
        try {
            const resp = await loginWithEmailPassword(auth, values);
            if (resp.ok) {
                notification.success({
                    description: t('messages.success.loginDescription'),
                    duration: 2,
                    message: t('messages.success.login')
                });
            } else {
                notification.error({
                    description: t(`messages.errors.NOT_FOUND`),
                    duration: 2,
                    message: 'Error'
                });
            }
        } catch (error) {
            const parsedError = error as { error: string; };
            notification.error({
                description: t(`messages.errors.${parsedError.error}`),
                duration: 2,
                message: 'Error'
            });
        }
    };

    const onFinishFailed: FormProps<LoginFormProps>['onFinishFailed'] = errorInfo => {
        notification.error({
            description: globalT('checkFields'),
            duration: 2,
            message: 'Error'
        });
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setLoading(true);
            if (user) {
                dispatch(setCurrentUser({
                    displayName: user.displayName ? user.displayName : 'User',
                    email: user.email!,
                    uid: user.uid
                }));
                navigate(routes.home.root);
                setLoading(false);
            } else {
                dispatch(logoutUser());
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center bg-[#001529]'>
                <div className='w-[400px] rounded-lg bg-white p-5'>
                    <div className='flex justify-center gap-2'>
                        Cargando
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex h-screen items-center justify-center bg-[#001529]'>
            <div className='w-[400px] rounded-lg bg-white p-5'>
                <h1 className='text-center text-2xl'>{t('page.login')}</h1>

                <FormUi
                    disabled={ loading }
                    form={ form }
                    initialValues={ initialValues }
                    layout='horizontal'
                    onFinish={ v => void onFinish(v) }
                    onFinishFailed={ onFinishFailed }
                >
                    <Item
                        className='mt-4'
                        label={ t('page.email') }
                        name='email'
                        rules={ [
                            {
                                message: globalT('fieldRequired'),
                                required: true
                            }
                        ] }
                    >
                        <Input type='email' />
                    </Item>

                    <Item
                        label={ t('page.password') }
                        name='password'
                        rules={ [
                            {
                                message: globalT('fieldRequired'),
                                required: true
                            }
                        ] }
                    >
                        <Input type='password' />
                    </Item>

                    <div className='flex justify-center gap-2'>
                        <Button
                            htmlType='submit'
                            type='primary'
                        >
                            {t('page.login')}
                        </Button>
                    </div>
                </FormUi>
            </div>

        </div >
    );
};