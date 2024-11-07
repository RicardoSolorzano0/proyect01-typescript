import { Animal } from "@/types/Animals";
import { userAppApi } from "../rtk/userApp.api";
import { OptionInGetQuerys, Paginated, SelectPaginatePayload } from "@/types/generalTypes";
import { serializeUriWithFilters } from "../utils/serializationUtils";
import { animalUris } from "../constants/uris/animal.uri";
import { rtkCacher } from "../utils/rtkQueryCacheUtils";
import { ANIMALS_TAG } from "../constants/endPointTags";
import { CreateAnimalPayload, UpdateAnimalPayload } from "@/types/payloads/payloadAnimalForm";

export const animalApi = userAppApi.injectEndpoints({
    endpoints: (builder) => ({
        getAnimals: builder.query<Animal[], OptionInGetQuerys>({
            query: (option) => serializeUriWithFilters(animalUris.selectAnimals, { option }),
            providesTags: rtkCacher.providesList(ANIMALS_TAG)
        }),
        selectPaginatedAnimals: builder.query<Paginated<Animal>, SelectPaginatePayload>({
            query: (options) => serializeUriWithFilters(animalUris.selectPaginatedAnimals, options),
            providesTags: rtkCacher.providesNestedList(ANIMALS_TAG)
        }),
        createAnimal: builder.mutation<void, CreateAnimalPayload>({
            query: (body) => ({
                url: animalUris.createAnimal,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.invalidatesList(ANIMALS_TAG),
        }),
        updateAnimal: builder.mutation<void, UpdateAnimalPayload>({
            query: (body) => ({
                url: animalUris.updateAnimal,
                method: 'PATCH',
                body,
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.cacheByIdArgProperty(ANIMALS_TAG),
        }),
        deleteAnimal: builder.mutation<void, string>({
            query: (id) => ({
                url: serializeUriWithFilters(animalUris.deleteAnimal, { id }),
                method: 'DELETE',
            }),
            transformErrorResponse: (response) => {
                return response.data
            },
            invalidatesTags: rtkCacher.cacheByIdArg(ANIMALS_TAG),
        }),
    }),
})

export const { useSelectPaginatedAnimalsQuery,useGetAnimalsQuery, useCreateAnimalMutation,useUpdateAnimalMutation, useDeleteAnimalMutation } = animalApi