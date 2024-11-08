import { AnimalUserResponse } from "@/types/AnimalUser";
import { userAppApi } from "../rtk/userApp.api";
import { serializeUriWithFilters } from "../utils/serializationUtils";
import { animalUserUris } from "../constants/uris/animalUser.uri";
import { rtkCacher } from "../utils/rtkQueryCacheUtils";
import { ANIMAL_USER_TAG } from "../constants/endPointTags";
import { CreateAnimalUserPayload, SelectAnimalUsersPayload } from "@/types/payloads/payloadAnimalUserForm";

export const animalsUser = userAppApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnimalsUser: builder.query<AnimalUserResponse[], SelectAnimalUsersPayload>({
            query: (option) => serializeUriWithFilters(animalUserUris.selectAnimalUsers, option),
            providesTags: rtkCacher.providesList(ANIMAL_USER_TAG)
        }),
        createAnimalsUser: builder.mutation<void, CreateAnimalUserPayload>({
            query: (body) => ({
                url: animalUserUris.createAnimalUser,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.invalidatesList(ANIMAL_USER_TAG),
        }),
    })
})

export const {useCreateAnimalsUserMutation, useGetAnimalsUserQuery} = animalsUser