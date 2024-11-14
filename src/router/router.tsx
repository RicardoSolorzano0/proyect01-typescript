import { createBrowserRouter, Link } from 'react-router-dom';
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
                handle: {
                    crumb: ()=><Link to={ routes.home.user }>Usuarios</Link>
                },
                path: routes.home.user
            },
            {
                element: <UsersTypePage />,
                handle: {
                    crumb: ()=><Link to={ routes.home.typeUser }>Tipos de usuario</Link>
                },
                path: routes.home.typeUser
            },
            {
                element: <AnimalPage />,
                handle: {
                    crumb: ()=><Link to={ routes.home.animals }>Animales</Link>
                },
                path: routes.home.animals
            }
        ],
        element: <ContainerLayout />,
        handle: {
            crumb: ()=><Link to={ routes.home.root }>Home</Link>
        },
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
