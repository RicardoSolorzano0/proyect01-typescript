import type { PaginationConfig }          from 'antd/es/pagination';
import { useEffect }                      from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { setPage } from '@/store/slices/paginationSlice';
import type { Paginated } from '@/types/generalTypes';
import type { ObjectWithId } from '@/types/ObjectWithId';
import type { EntityTableProps } from '@/ui/components/EntityTable';


export const useHandlePaginatedData = <T extends ObjectWithId>(data: Paginated<T> | undefined) => {
    const pagination: NonNullable<EntityTableProps<T>['pagination']> = {
        disabled: false,
        pageSize: data?.perPage,
        total: data?.total
    };

    return {
        data: data?.data,
        pagination
    };
};

/** Returns the current page */
export const usePagination = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector(({ pagination }) => pagination.page);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const queryPage = Number.parseInt(searchParams.get('page') ?? '');
        dispatch(setPage(!isNaN(queryPage) ? queryPage : null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!searchParams]);

    useEffect(() => {
        if (page !== null) {
            searchParams.set('page', page.toString());
        } else if (page === null || page <= 0) {
            searchParams.delete('page');
        }

        setSearchParams(searchParams);

    }, [page]);

    return page ?? 1;
};


export const usePageValidation = (pagination?: PaginationConfig) => {

    const page = useAppSelector(({ pagination }) => pagination.page);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Sets the page to the last valid page if accessing a non existing page
        // Ex.: If table has 3 pages and user tries to go to page 4, or even page 100, it will be redirected to page 3
        if (pagination?.total && pagination.pageSize && page) {
            const currentPageMinIndex = pagination.pageSize * (page - 1);
            if (page <= 0) {
                dispatch(setPage(1));
            } else if (pagination.total <= currentPageMinIndex) {
                const finalPage = Math.ceil(pagination.total / pagination.pageSize);
                dispatch(setPage(finalPage));
            } 
        } else if (pagination?.total === 0) {
            dispatch(setPage(1));
        }

    }, [dispatch, page, pagination?.total]);
};
