import { TypeUser } from '@/types/TypeUsers';
import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';

export const columns = (t: TFunction<'usersType'>): TableColumnsType<TypeUser> => [
    {
        dataIndex: 'name',
        title: t('table.name')
    },
    {
        dataIndex: 'description',
        title: t('table.description')
    },
    {
        dataIndex: 'color',
        title: t('table.color'),
    },

];