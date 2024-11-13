import { UserOutlined } from '@ant-design/icons';
import { routes } from '@/constants/routes';
import { PandaSvg } from '@/ui/icons/PandaSvg';

export const menu = [
    {
        icon: <UserOutlined />,
        label: 'Usuario',
        path: routes.home.user
    },
    {
        icon: <UserOutlined />,
        label: 'Tipo de usuario',
        path: routes.home.typeUser
    },
    {
        icon: <PandaSvg />,
        label: 'Animales',
        path: routes.home.animals
    }
];
