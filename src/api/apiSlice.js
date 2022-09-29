import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kitsu.io/api/edge/anime'
    }),
    tagTypes: ['Anime'],
    endpoints: builder => ({
        getAnimeList: builder.query({
            query: (offset = 0) => `?page[limit]=6&page[offset]=${offset}`,
            // '?page[limit]=${limit}&page[offset]=${offset}'
            providesTags: ['Anime']
        }),
        getNewAnime: builder.mutation({
            // query: (limit = 6, offset) => `?page[limit]=${limit}&page[offset]=${offset}`,
            // invalidatesTags: ['Anime']
        })
    })

})

export const { useGetAnimeListQuery, useGetNewAnimeMutation } = apiSlice