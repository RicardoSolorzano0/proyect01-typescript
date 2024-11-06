import { User } from '@/types/User';
import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';
import dayjs from 'dayjs';


export const columns = (t: TFunction<'users'>): TableColumnsType<User> => [
    {
        dataIndex: 'name',
        title: t('table.name')
    },
    {
        dataIndex: 'last_name',
        title: t('table.lastName')
    },
    {
        dataIndex: 'email',
        title: t('table.email')
    },
    {
        dataIndex: 'birthdate',
        title: t('table.birthdate'),
        render: (value) => dayjs(value).format('L')
    },
    {
        dataIndex: 'address',
        title: t('table.address')
    }
];