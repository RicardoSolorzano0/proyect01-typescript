import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/constants/routes';
import { LoginForm } from '@/forms/LoginForm/LoginForm';
import { ContainerLayout } from '@/ui/layouts/ContainerLayout/ContainerLayout';
import { AnimalPage } from '@/ui/pages/Animals/AnimalPage';
import { NotFound } from '@/ui/pages/NotFound/NotFound';
import { UsersPage } from '@/ui/pages/UsersPage/UsersPage';
import { UsersTypePage } from '@/ui/pages/UsersTypePage/UsersTypePage';

export const router = createBrowserRouter([
    {
        children: [
            {
                element: <UsersPage />,
                path: routes.home.user
            },
            {
                element: <UsersTypePage />,
                path: routes.home.typeUser
            },
            {
                element: <AnimalPage />,
                path: routes.home.animals
            }
        ],
        element: <ContainerLayout />,
        path: routes.home.root
    },
    {
        element: <LoginForm />,
        path: routes.login
    },
    {
        element: <NotFound />,
        path: '/*'
    }
]);
