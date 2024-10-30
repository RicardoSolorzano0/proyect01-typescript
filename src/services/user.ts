import { baseUrl } from "@/constants/routes";
import { OptionInGetQuerys } from "@/types/generalTypes";
import { CreateUserPayload, UpdateUserPayload } from "@/types/payloads/payloadUserForm";
import { User } from "@/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], OptionInGetQuerys>({
            query: (option) => `selectUsers?option=${option}`,
            providesTags: (result) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map(({ id }) => ({ type: 'User', id } as const)),
                        { type: 'User', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'User', id: 'LIST' }` is invalidated
                    [{ type: 'User', id: 'LIST' }],
        }),
        createUser: builder.mutation<void, CreateUserPayload>({
            query: (body) => ({
                url: 'createUser',
                method: 'POST',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        updateUser: builder.mutation<void, UpdateUserPayload>({
            query: (body) => ({
                url: 'updateUser',
                method: 'PATCH',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `deleteUser?id=${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: (_result, _error, id) => [{ type: 'User', id }],
        })
    }),
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = userApi