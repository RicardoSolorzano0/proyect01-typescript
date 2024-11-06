import { App, Table, type TableColumnType } from 'antd';
import type { TablePaginationConfig } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { ActionsColumn } from './actions';
import type { EntityTableProps } from './types';
import { ObjectWithId } from '@/types/ObjectWithId';
import { usePageValidation } from '@/hooks/paginate';
import { useAppSelector } from '@/hooks';
import { defaultPaginationProps } from './utils';

const { useApp } = App;

export const EntityTable = <RecordType extends ObjectWithId>(props: EntityTableProps<RecordType>) => {
    const { t } = useTranslation('common');
    const { actions, columns: propColumns, data, loading, pagination } = props;

    const page = useAppSelector(({ pagination }) => pagination.page);
    const { modal } = useApp();

    const columns = () => {
        if (!actions)
            return propColumns;

        const actionsColumn: TableColumnType<RecordType> = {
            key: 'actions',
            render: (_, r) => <ActionsColumn actions={actions} modal={modal} record={r} />,
            title: t('actions')
        };

        return [...propColumns, actionsColumn];
    };

    const internalPagination: TablePaginationConfig | undefined = pagination ? Object.assign<object, TablePaginationConfig, TablePaginationConfig>(
        {},
        defaultPaginationProps,
        {
            current: page ?? 1,
            ...pagination
        }
    ) : undefined;

    usePageValidation(pagination);

    return (
        <Table
            columns={columns()}
            dataSource={data}
            loading={loading}
            pagination={internalPagination}
            rowKey={({ id }) => id}
        />
    );
};