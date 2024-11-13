import type { ThemeConfig } from 'antd';

const primaryColor = '#AC5DD9';
const secondaryColor = '#F190B3';

export const mainTheme: ThemeConfig = {
    components: {
        DatePicker: {
            colorBorder: primaryColor,
            colorIcon: primaryColor,
            colorText: '#744999',
            fontSize: 16
        },
        Form: {
            labelColor: secondaryColor,
            labelFontSize: 16,
            labelHeight: 24
        },
        Input: {
            colorBorder: primaryColor,
            colorIcon: primaryColor,
            colorText: '#744999',
            fontSize: 16
        },
        Menu: {
            itemBg: '#F9EFFF'
        },
        Result: {
            colorTextHeading: primaryColor
        },
        Select: {
            colorBorder: primaryColor,
            colorIcon: primaryColor,
            colorText: '#744999',
            fontSize: 16
        },
        Upload: {
            padding: 0
        }
    },
    token: {
        borderRadius: 8,
        colorInfo: primaryColor,
        colorPrimary: primaryColor
    }
};