import { usersUris } from '@/api/constants/uris/users.uri';
import { userAppApi } from '@/api/rtk/userApp.api';
import { USERS_TAG } from '@/api/constants/endPointTags';
import { rtkCacher } from '@/api/utils/rtkQueryCacheUtils';
import { serializeUriWithFilters } from '@/api/utils/serializationUtils';
import type { OptionInGetQuerys, Paginated } from '@/types/generalTypes';
import type { CreateUserPayload, SelectPaginatePayloadWithUser, UpdateUserPayload } from '@/types/payloads/payloadUserForm';
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from '@/types/User';

export const usersApi = userAppApi.injectEndpoints({
    endpoints: builder => ({
        createUser: builder.mutation<void, CreateUserPayload>({
            invalidatesTags: rtkCacher.invalidatesList(USERS_TAG),
            query: body => ({
                body,
                method: 'POST',
                url: usersUris.createUser
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        deleteUser: builder.mutation<void, string>({
            invalidatesTags: rtkCacher.cacheByIdArg(USERS_TAG),
            query: id => ({
                method: 'DELETE',
                url: serializeUriWithFilters(usersUris.deleteUser, { id })
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        getUsers: builder.query<User[], OptionInGetQuerys>({
            providesTags: rtkCacher.providesList(USERS_TAG),
            // query: (option) => `selectUsers?option=${option}`,
            query: option=>serializeUriWithFilters(usersUris.selectUsers, { option })
            // providesTags: (result) =>
            //     // is result available?
            //     result
            //         ? // successful query
            //         [
            //             ...result.map(({ id }) => ({ type: 'User', id } as const)),
            //             { type: 'User', id: 'LIST' },
            //         ]
            //         : // an error occurred, but we still want to refetch this query when `{ type: 'User', id: 'LIST' }` is invalidated
            //         [{ type: 'User', id: 'LIST' }],
        }),
        selectPaginatedUsers: builder.query<Paginated<User>, SelectPaginatePayloadWithUser>({
            providesTags: rtkCacher.providesNestedList(USERS_TAG),
            query: options => serializeUriWithFilters(usersUris.selectPaginatedUsers, options)
        }),
        updateUser: builder.mutation<void, UpdateUserPayload>({
            invalidatesTags: rtkCacher.cacheByIdArgProperty(USERS_TAG),
            query: body => ({
                body,
                method: 'PATCH',
                url: usersUris.updateUser
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        })
    })
});

export const {  useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useSelectPaginatedUsersQuery, useUpdateUserMutation } = usersApi;