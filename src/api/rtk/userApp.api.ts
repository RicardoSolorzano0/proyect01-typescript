import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from './apiBaseQuery';
import { ENDPOINT_TAGS } from '../constants/endPointTags';

export const userAppApi = createApi({
    baseQuery: apiBaseQuery,
    endpoints: ()=>({}),
    reducerPath: 'userAppApi',
    tagTypes: ENDPOINT_TAGS
});