import { TypeUser } from '@/types/TypeUsers';
import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';

export const columns = (t: TFunction<'usersType'>): TableColumnsType<TypeUser> => [
    {
        dataIndex: 'name',
        title: t('entity.name')
    },
    {
        dataIndex: 'description',
        title: t('entity.description')
    },
    {
        dataIndex: 'color',
        title: t('entity.color'),
    },

];