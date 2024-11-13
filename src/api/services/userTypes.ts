import { usersTypesUris } from '@/api/constants/uris/usersTypes.uri';
import { userAppApi } from '@/api/rtk/userApp.api';
import { USER_TYPES_TAG } from '@/api/constants/endPointTags';
import { rtkCacher } from '@/api/utils/rtkQueryCacheUtils';
import { serializeUriWithFilters } from '@/api/utils/serializationUtils';
import type { OptionInGetQuerys, Paginated } from '@/types/generalTypes';
import type { CreateUserTypePayload, SelectPaginatePayloadWithFilters, UpdateUserTypePayload } from '@/types/payloads/payloadTypeUserForm';
import type { TypeUser } from '@/types/TypeUsers';

export const userTypesApi = userAppApi.injectEndpoints({
    endpoints: builder => ({
        // lo primero lo que devuelve y lo segundo lo que le mando
        createUserType: builder.mutation<void, CreateUserTypePayload>({
            invalidatesTags: rtkCacher.invalidatesList(USER_TYPES_TAG),
            query: body => ({
                body,
                method: 'POST',
                url: usersTypesUris.createUserType
            }),
            // transformErrorResponse: (response: FetchBaseQueryError) => {
            // return {
            // status: response.status,
            //message: (response.data as { error: string }).error
            // }
            //},
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        deleteUserType: builder.mutation<void, string>({
            invalidatesTags: rtkCacher.cacheByIdArg(USER_TYPES_TAG),
            query: id => ({
                method: 'DELETE',
                url: serializeUriWithFilters(usersTypesUris.deleteUserType, { id })
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        getUserTypes: builder.query<TypeUser[], OptionInGetQuerys>({
            //query: (option) => `selectUserTypes?option=${option}`,
            providesTags: rtkCacher.providesList(USER_TYPES_TAG),
            query: option => serializeUriWithFilters(usersTypesUris.selectUserTypes, { option })
        }),
        selectPaginatedUserTypes: builder.query<Paginated<TypeUser>, SelectPaginatePayloadWithFilters>({
            //query: (option) => `selectUserTypes?option=${option}`,
            providesTags: rtkCacher.providesNestedList(USER_TYPES_TAG),
            query: options => serializeUriWithFilters(usersTypesUris.selectPaginatedUserTypes, options)
        }),
        updateUserType: builder.mutation<void, UpdateUserTypePayload>({
            invalidatesTags: rtkCacher.cacheByIdArgProperty(USER_TYPES_TAG),
            query: body => ({
                body,
                method: 'PATCH',
                url: usersTypesUris.updateUserType
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        })

    })
});

export const {  useCreateUserTypeMutation, useDeleteUserTypeMutation, useGetUserTypesQuery, useSelectPaginatedUserTypesQuery, useUpdateUserTypeMutation } = userTypesApi;