import { Layout } from "antd";
import { SideBar } from "../SideBar/SideBar";
import { Outlet } from "react-router";

const { Content, Footer } = Layout;

export const ContainerLayout = () => {
  return (
    <Layout hasSider>
      <SideBar />
      <Layout className="ml-[200px]">
        <Content className="m-5 overflow-auto">
          <div className="p-6 bg-white rounded-lg">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center">
          App Users ©{new Date().getFullYear()} Creado por Ricardo Solórzano
        </Footer>
      </Layout>
    </Layout>
  );
};
