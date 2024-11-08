import { User } from '@/types/User';
import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';
import dayjs from 'dayjs';


export const columns = (t: TFunction<'users'>): TableColumnsType<User> => [
    {
        dataIndex: 'name',
        title: t('entity.name')
    },
    {
        dataIndex: 'last_name',
        title: t('entity.lastName')
    },
    {
        dataIndex: 'email',
        title: t('entity.email')
    },
    {
        dataIndex: 'birthdate',
        title: t('entity.birthdate'),
        render: (value) => dayjs(value).format('L')
    },
    {
        dataIndex: 'address',
        title: t('entity.address')
    }
];