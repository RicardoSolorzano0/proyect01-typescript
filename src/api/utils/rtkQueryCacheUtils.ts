import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { LIST_ID } from '../constants/endPointTags';


// ty https://gist.github.com/Shrugsy/6b6af02aef1f783df9d636526c1e05fa

export type CacheItem<T, ID> = { id: ID; type: T; };

export type CacheList<T, ID> = (CacheItem<T, ID> | CacheItem<T, typeof LIST_ID>)[];

type InnerProvidesList<T> = <
    Results extends { id: unknown; }[],
    Error extends FetchBaseQueryError
>(
    results: Results | undefined,
    error: Error | undefined
) => CacheList<T, Results[number]['id']>;

type InnerProvidesSimpleList<T> = <
    Results extends object[],
    Error extends FetchBaseQueryError
>(
    results: Results | undefined,
    error: Error | undefined
) => CacheItem<T, typeof LIST_ID>[];

const simpleList = <T extends string>(
    ...types: T[]
): CacheItem<T, typeof LIST_ID>[] => types.map(type => ({ id: LIST_ID, type }));

const providesSimpleList = <T extends string>(
    ...types: T[]
): InnerProvidesSimpleList<T> => () => types.map(type => ({ id: LIST_ID, type }));

const providesList = <T extends string>(
    type: T
): InnerProvidesList<T> => results => {
    if (results)
        return [
            { id: LIST_ID, type },
            ...results.map(({ id }) => ({ id, type } as const))
        ];

    return [{ id: LIST_ID, type }];
};

const invalidatesList = <T extends string>(type: T) => (): readonly [
    CacheItem<T, typeof LIST_ID>
] => [{ id: LIST_ID, type }] as const;

type InnerProvidesNestedList<T> = <
    Results extends { data: { id: unknown; }[]; },
    Error extends FetchBaseQueryError
>(
    results: Results | undefined,
    error: Error | undefined
) => CacheList<T, Results['data'][number]['id']>;

const providesNestedList = <T extends string>(
    type: T
): InnerProvidesNestedList<T> => results => {
    if (results)
        return [
            { id: LIST_ID, type },
            ...results.data.map(({ id }) => ({ id, type } as const))
        ];


    return [{ id: LIST_ID, type }];
};

const cacheByIdArg = <T extends string>(type: T) => <
    ID,
    Result = undefined,
    Error = undefined
>(
    _result: Result,
    _error: Error,
    id: ID
): readonly [CacheItem<T, ID>] => [{ id, type }] as const;

const cacheByIdArgProperty = <T extends string>(type: T) => <
    Arg extends { id: unknown; },
    Result = undefined,
    Error = undefined
>(
    _result: Result,
    _error: Error,
    arg: Arg
): [] | readonly [CacheItem<T, Arg['id']>] => [{ id: arg.id, type }] as const;

const cacheByIdArgPropertyNoInvalidateOnError = <T extends string>(type: T) => <
    Arg extends { id: unknown; },
    Result = undefined,
    Error = undefined
>(
    result: Result,
    error: Error,
    arg: Arg
): [] | readonly [CacheItem<string, Arg['id']>] => !error ? cacheByIdArgProperty(type)(result, error, arg) : [];

export const rtkCacher = {
    cacheByIdArg,
    cacheByIdArgProperty,
    cacheByIdArgPropertyNoInvalidateOnError,
    invalidatesList,
    providesList,
    providesNestedList,
    providesSimpleList,
    simpleList
};