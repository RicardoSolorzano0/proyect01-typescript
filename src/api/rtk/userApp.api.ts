import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "./apiBaseQuery";
import { ENDPOINT_TAGS } from "../constants/endPointTags";

export const userAppApi = createApi({
    reducerPath: 'userAppApi',
    baseQuery: apiBaseQuery,
    tagTypes: ENDPOINT_TAGS,
    endpoints:()=>({})
})