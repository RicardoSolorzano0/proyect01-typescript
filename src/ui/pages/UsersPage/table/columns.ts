import type { TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import type { TFunction } from 'i18next';
import type { User } from '@/types/User';


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
        render: (_, { birthdate }) => dayjs(birthdate).format('L'),
        title: t('entity.birthdate')
    },
    {
        dataIndex: 'address',
        title: t('entity.address')
    }
];