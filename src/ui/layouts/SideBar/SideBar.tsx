import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { menu } from "@/router/menu";
import { Link } from "react-router-dom";

const items2 = menu.map((item) => ({
  key: item.path,
  icon: item.icon,
  label: <Link to={item.path}>{item.label}</Link>,
}));

export const SideBar = () => {
  return (
    <Sider className="overflow-auto h-screen fixed inset-y-0">
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items2}
        onChange={() => {}}
      />
    </Sider>
  );
};
