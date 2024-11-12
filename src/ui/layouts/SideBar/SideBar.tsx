import { Button, Menu, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { menu } from "@/router/menu";
import { Link } from "react-router-dom";
import { LanguageSelector } from "@/ui/components/LanguageSelector";
import { LogOut } from "react-feather";
import { logoutFirebase } from "@/firebase/providers";
import { useAppDispatch } from "@/hooks";
import { logoutUser } from "@/store/slices/userSlice";

const items2 = menu.map((item) => ({
  key: item.path,
  icon: item.icon,
  label: <Link to={item.path}>{item.label}</Link>,
}));

export const SideBar = () => {
  const dispatch = useAppDispatch()

  return (
    <Sider className="overflow-auto h-screen fixed inset-y-0">
      <div className="h-full">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items2}
          onChange={() => { }}
        />

        <div className="absolute bottom-0 right-0 p-4">
          <Tooltip placement="left" title="Logout">
            <Button shape="circle" icon={<LogOut />} onClick={async () => {
              await logoutFirebase()
              dispatch(logoutUser())
            }} />
          </Tooltip>
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <LanguageSelector />
        </div>
      </div>
    </Sider>
  );
};
