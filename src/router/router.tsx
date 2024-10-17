import { createBrowserRouter } from "react-router-dom";
import { User } from "../ui/pages/User/User";
import { TypeUser } from "../ui/pages/TypeUser/TypeUser";
import { routes } from "../constants/routes";
import { ContainerLayout } from "../ui/layouts/ContainerLayout/ContainerLayout";
import { NotFound } from "../ui/pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: routes.home.root,
    element: <ContainerLayout />,
    children: [
      {
        path: routes.home.user,
        element: <User />,
      },
      {
        path: routes.home.typeUser,
        element: <TypeUser />,
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
