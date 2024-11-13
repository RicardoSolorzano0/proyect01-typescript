import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { ConfigProvider, App as ContexModal } from "antd";
import { Provider } from "react-redux";
import { store } from '@/store';
import { useTranslation } from "react-i18next";
import { antdLocales } from "./i18n/antdLocales";
import { locale } from "dayjs";
import 'dayjs/locale/es';
import { FirebaseCtx } from "./context/FirebaseCtx";
import { FirebaseApp, FirebaseAuth } from './firebase/config';
import { mainTheme } from "./ui/theme/main.theme";

const App = () => {
  const { i18n } = useTranslation();
  locale(i18n.language);

  return (
    <Provider store={store}>
      <FirebaseCtx.Provider value={{ app: FirebaseApp, auth: FirebaseAuth }}>
        <ConfigProvider theme={mainTheme} locale={antdLocales[i18n.language]}>
          <ContexModal>
            <RouterProvider router={router} />
          </ContexModal>
        </ConfigProvider>
      </FirebaseCtx.Provider>
    </Provider>
  );
};

export default App;
