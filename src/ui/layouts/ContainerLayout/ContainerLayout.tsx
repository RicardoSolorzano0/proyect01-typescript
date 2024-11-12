import { Layout } from "antd";
import { SideBar } from "@/ui/layouts/SideBar/SideBar";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useFirebaseContext } from "@/context/FirebaseCtx";
import { onAuthStateChanged } from "firebase/auth";
import { routes } from "@/constants/routes";
import { useAppDispatch } from "@/hooks";
import { logoutUser, setCurrentUser } from "@/store/slices/userSlice";

const { Content, Footer } = Layout;

export const ContainerLayout = () => {
  const navigate = useNavigate();
  const { auth } = useFirebaseContext();
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(logoutUser())
        navigate(routes.login);
      }else{
        dispatch(setCurrentUser({
          displayName: user.displayName?user.displayName:"User",
          email: user.email!,
          uid: user.uid
        }))
      } 
  });
  }, []);

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
