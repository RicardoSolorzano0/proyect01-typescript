import { Button, Menu, Switch, Tooltip } from 'antd';

import Sider from 'antd/es/layout/Sider';
import type { MenuTheme } from 'antd/lib';
import { useState } from 'react';
import { LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import { logoutFirebase } from '@/firebase/providers';
import { useAppDispatch } from '@/hooks';
import { menu } from '@/router/menu';
import { logoutUser } from '@/store/slices/userSlice';
import { LanguageSelector } from '@/ui/components/LanguageSelector';

const items2 = menu.map(item => ({
    icon: item.icon,
    key: item.path,
    label: <Link to={ item.path }>{item.label}</Link>
}));

export const SideBar = () => {
    const dispatch = useAppDispatch();
    const [theme, setTheme] = useState<MenuTheme>('dark');


    const handleLogout = async () =>{
        await logoutFirebase();
        dispatch(logoutUser());
    };

    return (
        <Sider
            className='fixed inset-y-0 h-screen overflow-auto'
            theme={ theme }
        >
            <div className='h-full'>
                <Menu
                    defaultSelectedKeys={ ['1'] }
                    items={ items2 }
                    mode='inline'
                    theme={ theme }
                    onChange={ () => { } }
                />

                <div className='ml-6 mt-4'>
                    <Switch
                        defaultChecked
                        onChange={ () => setTheme(theme === 'light' ? 'dark' : 'light') }
                    />
                </div>

                <div className='absolute bottom-0 right-0 p-4'>
                    <Tooltip
                        placement='left'
                        title='Logout'
                    >
                        <Button
                            icon={ <LogOut /> }
                            shape='circle'
                            onClick={ ()=> void handleLogout() }
                        />
                    </Tooltip>
                </div>

                <div className='absolute bottom-0 left-0 p-4'>
                    <LanguageSelector />
                </div>
            </div>
        </Sider>
    );
};
