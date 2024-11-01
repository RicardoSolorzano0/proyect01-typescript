import { USERS_TAG } from "@/api/constants/endPointTags";
import { usersUris } from "@/api/constants/uris/users.uri";
import { userAppApi } from "@/api/rtk/userApp.api";
import { rtkCacher } from "@/api/utils/rtkQueryCacheUtils";
import { serializeUriWithFilters } from "@/api/utils/serializationUtils";
import { OptionInGetQuerys, Paginated } from "@/types/generalTypes";
import { CreateUserPayload, SelectPaginatePayloadWithUser, UpdateUserPayload } from "@/types/payloads/payloadUserForm";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { User } from "@/types/User";

export const usersApi = userAppApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], OptionInGetQuerys>({
            // query: (option) => `selectUsers?option=${option}`,
            query:(option)=>serializeUriWithFilters(usersUris.selectUsers,{option}),
            providesTags:rtkCacher.providesList(USERS_TAG)
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
            query: (options) => serializeUriWithFilters(usersUris.selectPaginatedUsers, options),
            providesTags: rtkCacher.providesNestedList(USERS_TAG)
          }),
        createUser: builder.mutation<void, CreateUserPayload>({
            query: (body) => ({
                url: usersUris.createUser,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.invalidatesList(USERS_TAG),
        }),
        updateUser: builder.mutation<void, UpdateUserPayload>({
            query: (body) => ({
                url: usersUris.updateUser,
                method: 'PATCH',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.cacheByIdArgProperty(USERS_TAG),
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: serializeUriWithFilters(usersUris.deleteUser, { id }),
                method: 'DELETE',
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.cacheByIdArg(USERS_TAG),
        })
    }),
})

export const {  useSelectPaginatedUsersQuery,useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = usersApi