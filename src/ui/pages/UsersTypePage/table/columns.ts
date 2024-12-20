import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';
import type { TypeUser } from '@/types/TypeUsers';  

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
        title: t('entity.color')
    }

];