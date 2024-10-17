import { ReactNode } from "react";
import { Layout } from "antd";
import { SideBar } from "../SideBar/SideBar";

const { Content, Footer } = Layout;

type Props = {
  children: ReactNode;
};

export const ContainerLayout = ({ children }: Props) => {
  return (
    <Layout hasSider>
      <SideBar />
      <Layout className="ml-[200px]">
        <Content className="m-5 overflow-auto">
          <div className="p-6 bg-white rounded-lg">{children}</div>
        </Content>
        <Footer className="text-center">
          Ant Design ©{new Date().getFullYear()} Created by Ricardo Solórzano
        </Footer>
      </Layout>
    </Layout>
  );
};
