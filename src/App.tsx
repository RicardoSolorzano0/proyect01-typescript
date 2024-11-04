import { RouterProvider } from "react-router-dom";
import { router } from "@/router/router";
import { ConfigProvider, App as ContexModal } from "antd";
import { Provider } from "react-redux";
import { store } from '@/store';
import { useTranslation } from "react-i18next";
import { antdLocales } from "./i18n/antdLocales";
import { locale } from "dayjs";
import 'dayjs/locale/es';

const App = () => {
  const { i18n } = useTranslation();
  locale(i18n.language);

  return (
    <Provider store={store}>
      <ConfigProvider locale={antdLocales[i18n.language]}>
        <ContexModal>
          <RouterProvider router={router} />
        </ContexModal>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
