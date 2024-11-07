import { routes } from "@/constants/routes";
import { PandaSvg } from "@/ui/icons/PandaSvg";
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
  {
    path: routes.home.animals,
    label: "Animales",
    icon: <PandaSvg />,
  },
];
