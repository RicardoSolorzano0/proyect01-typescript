import { ConfigProvider, App as ContexModal } from 'antd';
import { locale } from 'dayjs';
import 'dayjs/locale/es';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { FirebaseCtx } from './context/FirebaseCtx';
import { FirebaseApp, FirebaseAuth } from './firebase/config';
import { antdLocales } from './i18n/antdLocales';
import { mainTheme } from './ui/theme/main.theme';
import { router } from '@/router/router';
import { store } from '@/store';

const App = () => {
    const { i18n } = useTranslation();
    locale(i18n.language);

    return (
        <Provider store={ store }>
            <FirebaseCtx.Provider value={ { app: FirebaseApp, auth: FirebaseAuth } }>
                <ConfigProvider
                    locale={ antdLocales[i18n.language] }
                    theme={ mainTheme }
                >
                    <ContexModal>
                        <RouterProvider router={ router } />
                    </ContexModal>
                </ConfigProvider>
            </FirebaseCtx.Provider>
        </Provider>
    );
};

export default App;
