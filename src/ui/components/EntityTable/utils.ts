import { TablePaginationConfig } from "antd";
import { store }                 from '@/store';
import { setPage }               from "@/store/slices/paginationSlice";

export const defaultPaginationProps: TablePaginationConfig = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    hideOnSinglePage: true,
    onChange: p => store.dispatch(setPage(p)),
    position: ['bottomCenter'],
    showSizeChanger: false,
    showTotal: (t, r) => `${ r[0] }-${ r[1] } of ${ t } items`
};