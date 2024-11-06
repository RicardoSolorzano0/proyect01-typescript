import { User } from '@/types/User';
import type { TableColumnsType } from 'antd';
import type { TFunction }        from 'i18next';


export const columns = (t: TFunction<'users'>): TableColumnsType<User> => [
    {
        dataIndex: 'name',
        title: t('table.name')
    },
    {
        dataIndex: 'last_name',
        title: t('table.lastName')
    }
];