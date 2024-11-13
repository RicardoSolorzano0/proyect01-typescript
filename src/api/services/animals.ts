import { ANIMALS_TAG } from '../constants/endPointTags';
import { animalUris } from '../constants/uris/animal.uri';
import { userAppApi } from '../rtk/userApp.api';
import { rtkCacher } from '../utils/rtkQueryCacheUtils';
import { serializeUriWithFilters } from '../utils/serializationUtils';
import type { Animal } from '@/types/Animals';
import type { OptionInGetQuerys, Paginated, SelectPaginatePayload } from '@/types/generalTypes';
import type { CreateAnimalPayload, UpdateAnimalPayload } from '@/types/payloads/payloadAnimalForm';

export const animalApi = userAppApi.injectEndpoints({
    endpoints: builder => ({
        createAnimal: builder.mutation<void, CreateAnimalPayload>({
            invalidatesTags: rtkCacher.invalidatesList(ANIMALS_TAG),
            query: body => ({
                body,
                method: 'POST',
                url: animalUris.createAnimal
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        deleteAnimal: builder.mutation<void, string>({
            invalidatesTags: rtkCacher.cacheByIdArg(ANIMALS_TAG),
            query: id => ({
                method: 'DELETE',
                url: serializeUriWithFilters(animalUris.deleteAnimal, { id })
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        }),
        getAnimals: builder.query<Animal[], OptionInGetQuerys>({
            providesTags: rtkCacher.providesList(ANIMALS_TAG),
            query: option => serializeUriWithFilters(animalUris.selectAnimals, { option })
        }),
        selectPaginatedAnimals: builder.query<Paginated<Animal>, SelectPaginatePayload>({
            providesTags: rtkCacher.providesNestedList(ANIMALS_TAG),
            query: options => serializeUriWithFilters(animalUris.selectPaginatedAnimals, options)
        }),
        updateAnimal: builder.mutation<void, UpdateAnimalPayload>({
            invalidatesTags: rtkCacher.cacheByIdArgProperty(ANIMALS_TAG),
            query: body => ({
                body,
                method: 'PATCH',
                url: animalUris.updateAnimal
            }),
            transformErrorResponse: response => {
                return response.data;
            }
        })
    })
});

export const { useCreateAnimalMutation, useDeleteAnimalMutation, useGetAnimalsQuery, useSelectPaginatedAnimalsQuery, useUpdateAnimalMutation } = animalApi;