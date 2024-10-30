import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '@/constants/routes'
import { TypeUser } from '@/types/TypeUsers'
import { CreateUserTypePayload, UpdateUserTypePayload } from '@/types/payloads/payloadTypeUserForm'
import { OptionInGetQuerys } from '@/types/generalTypes'

export const userTypesApi = createApi({
    reducerPath: 'userTypesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['UserTypes'],
    endpoints: (builder) => ({
        getUserTypes: builder.query<TypeUser[], OptionInGetQuerys>({
            query: (option) => `selectUserTypes?option=${option}`,
            providesTags: (result) =>
                // is result available?
                result
                  ? // successful query
                    [
                      ...result.map(({ id }) => ({ type: 'UserTypes', id } as const)),
                      { type: 'UserTypes', id: 'LIST' },
                    ]
                  : // an error occurred, but we still want to refetch this query when `{ type: 'UserTypes', id: 'LIST' }` is invalidated
                    [{ type: 'UserTypes', id: 'LIST' }],
        }),
        // lo primero lo que devuelve y lo segundo lo que le mando
        createUserType: builder.mutation<void, CreateUserTypePayload>({
            query: (body) => ({
                url: 'createUserType',
                method: 'POST',
                body,
            }),
           // transformErrorResponse: (response: FetchBaseQueryError) => {
             // return {
               // status: response.status,
                //message: (response.data as { error: string }).error
             // }
            //},
            transformErrorResponse: (response) => {
              return response.data
            },
            invalidatesTags: [{ type: 'UserTypes', id: 'LIST' }],
        }),
        updateUserType: builder.mutation<void, UpdateUserTypePayload>({
            query: (body) => ({
                url: 'updateUserType',
                method: 'PATCH',
                body,
            }),
            transformErrorResponse: (response) => {
              return response.data
            },
            invalidatesTags: (_, __, { id }) => [{ type: 'UserTypes', id }],
        }),
        deleteUserType: builder.mutation<void, string>({
          query: (id) => ({
            url: `deleteUserType?id=${id}`,
            method: 'DELETE',
          }),
          transformErrorResponse: (response) => {
            return response.data
          },
          invalidatesTags: (_, __, id) => [{ type: 'UserTypes', id }],
        }),

    })
})

export const {useGetUserTypesQuery, useCreateUserTypeMutation, useUpdateUserTypeMutation, useDeleteUserTypeMutation} = userTypesApi