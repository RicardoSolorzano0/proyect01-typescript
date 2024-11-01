import { TypeUser } from '@/types/TypeUsers'
import { CreateUserTypePayload, SelectPaginatePayload, SelectPaginatePayloadWithFilters, UpdateUserTypePayload } from '@/types/payloads/payloadTypeUserForm'
import { OptionInGetQuerys, Paginated } from '@/types/generalTypes'
import { userAppApi } from '@/api/rtk/userApp.api'
import { serializeUriWithFilters } from '@/api/utils/serializationUtils'
import { usersTypesUris } from '@/api/constants/uris/usersTypes.uri'
import { rtkCacher } from '@/api/utils/rtkQueryCacheUtils'
import { USER_TYPES_TAG } from '@/api/constants/endPointTags'

export const userTypesApi = userAppApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserTypes: builder.query<TypeUser[], OptionInGetQuerys>({
      query: (option) => serializeUriWithFilters(usersTypesUris.selectUserTypes, {option}),
      //query: (option) => `selectUserTypes?option=${option}`,
      providesTags: rtkCacher.providesList(USER_TYPES_TAG)
    }),
    selectPaginatedUserTypes: builder.query<Paginated<TypeUser>, SelectPaginatePayloadWithFilters>({
      query: (options) => serializeUriWithFilters(usersTypesUris.selectPaginatedUserTypes, options),
      //query: (option) => `selectUserTypes?option=${option}`,
      providesTags: rtkCacher.providesNestedList(USER_TYPES_TAG)
    }),
    // lo primero lo que devuelve y lo segundo lo que le mando
    createUserType: builder.mutation<void, CreateUserTypePayload>({
      query: (body) => ({
        url: usersTypesUris.createUserType,
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
      invalidatesTags: rtkCacher.invalidatesList(USER_TYPES_TAG),
    }),
    updateUserType: builder.mutation<void, UpdateUserTypePayload>({
      query: (body) => ({
        url: usersTypesUris.updateUserType,
        method: 'PATCH',
        body,
      }),
      transformErrorResponse: (response) => {
        return response.data
      },
      invalidatesTags: rtkCacher.cacheByIdArgProperty(USER_TYPES_TAG),
    }),
    deleteUserType: builder.mutation<void, string>({
      query: (id) => ({
        url: serializeUriWithFilters(usersTypesUris.deleteUserType, { id }),
        method: 'DELETE',
      }),
      transformErrorResponse: (response) => {
        return response.data
      },
      invalidatesTags: rtkCacher.cacheByIdArg(USER_TYPES_TAG),
    }),

  })
})

export const {  useSelectPaginatedUserTypesQuery,useGetUserTypesQuery, useCreateUserTypeMutation, useUpdateUserTypeMutation, useDeleteUserTypeMutation } = userTypesApi