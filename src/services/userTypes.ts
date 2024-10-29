// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../constants/routes'
import { TypeUser } from '../types/TypeUsers'
import { TypeParamGetUserType, TypeUserFormProps } from '../types/payloads/payloadTypeUserForm'

export const userTypesApi = createApi({
    reducerPath: 'userTypesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['UserTypes'],
    endpoints: (builder) => ({
        getUserTypes: builder.query<TypeUser[], TypeParamGetUserType>({
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
        createUserType: builder.mutation<void, TypeUserFormProps>({
            query: (body) => ({
                url: 'createUserType',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'UserTypes', id: 'LIST' }],
        }),
        updateUserType: builder.mutation<void, TypeUserFormProps>({
            query: (body) => ({
                url: 'updateUserType',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'UserTypes', id: 'LIST' }],
        }),
        deleteUserType: builder.mutation<void, string>({
          query: (id) => `deleteUserType?id=${id}`,
          invalidatesTags: [{ type: 'UserTypes', id: 'LIST' }],
        }),

    })
})

export const {useGetUserTypesQuery, useCreateUserTypeMutation, useUpdateUserTypeMutation, useDeleteUserTypeMutation} = userTypesApi