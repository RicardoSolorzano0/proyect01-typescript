import { ANIMAL_USER_TAG } from '../constants/endPointTags';
import { animalUserUris } from '../constants/uris/animalUser.uri';
import { userAppApi } from '../rtk/userApp.api';
import { rtkCacher } from '../utils/rtkQueryCacheUtils';
import { serializeUriWithFilters } from '../utils/serializationUtils';
import type { AnimalUserResponse } from '@/types/AnimalUser';
import type { CreateAnimalUserPayload, SelectAnimalUsersPayload } from '@/types/payloads/payloadAnimalUserForm';

export const animalsUser = userAppApi.injectEndpoints({
    endpoints: builder => ({
        createAnimalsUser: builder.mutation<void, CreateAnimalUserPayload>({
            invalidatesTags: rtkCacher.invalidatesList(ANIMAL_USER_TAG),
            query: body => ({
                body,
                method: 'POST',
                url: animalUserUris.createAnimalUser
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        getAnimalsUser: builder.query<AnimalUserResponse[], SelectAnimalUsersPayload>({
            providesTags: rtkCacher.providesList(ANIMAL_USER_TAG),
            query: option => serializeUriWithFilters(animalUserUris.selectAnimalUsers, option)
        })
    })
});

export const { useCreateAnimalsUserMutation, useGetAnimalsUserQuery } = animalsUser;