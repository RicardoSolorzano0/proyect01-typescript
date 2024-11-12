import { Layout } from "antd";
import { SideBar } from "@/ui/layouts/SideBar/SideBar";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(true)
      if (!user) {
        dispatch(logoutUser())
        navigate(routes.login);
        setLoading(false)
      }else{
        dispatch(setCurrentUser({
          displayName: user.displayName?user.displayName:"User",
          email: user.email!,
          uid: user.uid
        }))
        setLoading(false)
      } 
  });
  }, []);

  if(loading){
    return <>
        <div className="flex items-center justify-center bg-[#001529] h-screen">
            <div className="bg-white rounded-lg p-5 w-[400px]">
                <div className="flex justify-center gap-2">
                    Cargando
                </div>
            </div>
        </div>
    </>
}

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
