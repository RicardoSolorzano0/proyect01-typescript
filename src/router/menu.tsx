import { routes } from "../constants/routes";
import { UserOutlined } from "@ant-design/icons";

export const menu = [
  {
    path: routes.home.user,
    label: "Usuario",
    icon: <UserOutlined />,
  },
  {
    path: routes.home.typeUser,
    label: "Tipo de usuario",
    icon: <UserOutlined />,
  },
];
