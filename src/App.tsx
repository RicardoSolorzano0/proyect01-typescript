import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { App as ContexModal } from "antd";
import { Provider } from "react-redux";
import { store } from '@/store';

const App = () => {
  return (
    <Provider store={store}>
    <ContexModal>
      <RouterProvider router={router} />
    </ContexModal>
    </Provider>
  );
};

export default App;
