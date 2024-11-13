/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { routes } from '@/constants/routes';
import { useFirebaseContext } from '@/context/FirebaseContext';
import { useAppDispatch } from '@/hooks';
import { logoutUser, setCurrentUser } from '@/store/slices/userSlice';
import { SideBar } from '@/ui/layouts/SideBar/SideBar';

const { Content, Footer } = Layout;

export const ContainerLayout = () => {
    const navigate = useNavigate();
    const { auth } = useFirebaseContext();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setLoading(true);
            if (!user) {
                dispatch(logoutUser());
                navigate(routes.login);
                setLoading(false);
            } else {
                dispatch(setCurrentUser({
                    displayName: user.displayName ? user.displayName : 'User',
                    email: user.email!,
                    uid: user.uid
                }));
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
        <Layout hasSider>
            <SideBar />

            <Layout className='ml-[200px]'>
                <Content
                    className='m-5 overflow-auto'
                    style={ { height: 'calc(100vh - 109px)' } }
                >
                    <div className='rounded-lg bg-white p-6'>
                        <Outlet />
                    </div>
                </Content>

                <Footer className='text-center'>
          App Users ©{new Date().getFullYear()} Creado por Ricardo Solórzano
                </Footer>
            </Layout>
        </Layout>
    );
};
