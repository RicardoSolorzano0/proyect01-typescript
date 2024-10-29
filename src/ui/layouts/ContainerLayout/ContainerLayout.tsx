import { Layout } from "antd";
import { SideBar } from "@/ui/layouts/SideBar/SideBar";
import { Outlet } from "react-router";

const { Content, Footer } = Layout;

export const ContainerLayout = () => {
  return (
    <Layout hasSider>
      <SideBar />
      <Layout className="ml-[200px]">
        <Content
          className="m-5 overflow-auto"
          style={{ height: "calc(100vh - 109px)" }}
        >
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
