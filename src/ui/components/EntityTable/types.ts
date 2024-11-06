import { ObjectWithId } from "@/types/ObjectWithId";
import { TableActionType } from "./actions";
import { TableColumnsType, TablePaginationConfig } from "antd";

export type EntityTableProps<RecordType extends ObjectWithId> = {
    actions?: TableActionType<RecordType>;
    columns: TableColumnsType<RecordType>;
    data: RecordType[];
    loading?: boolean;
    pagination?: Pick<TablePaginationConfig, 'disabled' | 'pageSize' | 'total'>;
};