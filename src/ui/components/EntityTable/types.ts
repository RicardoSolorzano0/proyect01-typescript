import type { TableColumnsType, TablePaginationConfig } from 'antd';
import type { TableActionType } from './actions';
import type { ObjectWithId } from '@/types/ObjectWithId';

export type EntityTableProps<RecordType extends ObjectWithId> = {
    actions?: TableActionType<RecordType>;
    columns: TableColumnsType<RecordType>;
    data: RecordType[];
    loading?: boolean;
    pagination?: Pick<TablePaginationConfig, 'disabled' | 'pageSize' | 'total'>;
};