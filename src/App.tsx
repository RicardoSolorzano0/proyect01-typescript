import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { App as ContexModal } from "antd";

const App = () => {
  return (
    <ContexModal>
      <RouterProvider router={router} />
    </ContexModal>
  );
};

export default App;
