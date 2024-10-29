import { createBrowserRouter } from "react-router-dom";
import { UsersPage } from "@/ui/pages/UsersPage/UsersPage";
import { TypeUsersPage } from "@/ui/pages/TypeUsersPage/TypeUsersPage";
import { routes } from "@/constants/routes";
import { ContainerLayout } from "@/ui/layouts/ContainerLayout/ContainerLayout";
import { NotFound } from "@/ui/pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: routes.home.root,
    element: <ContainerLayout />,
    children: [
      {
        path: routes.home.user,
        element: <UsersPage />,
      },
      {
        path: routes.home.typeUser,
        element: <TypeUsersPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
