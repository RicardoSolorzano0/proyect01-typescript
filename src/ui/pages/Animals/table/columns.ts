import { Animal } from '@/types/Animals';
import type { TableColumnsType } from 'antd';
import type { TFunction } from 'i18next';


export const columns = (t: TFunction<'animal'>): TableColumnsType<Animal> => [
    {
        dataIndex: 'name',
        title: t('entity.name')
    },
    {
        dataIndex: 'description',
        title: t('entity.description')
    },
];