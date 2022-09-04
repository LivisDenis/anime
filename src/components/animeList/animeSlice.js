import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    dataAnime: [],
    animeLoadingStatus: 'idle',
    favourites: []
}

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (offset = 1) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=6&page[offset]=${offset}`)

        const data = await response.json()
        return data.data
    }

)

export const fetchSearchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (name ) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${name}`)

        const data = await response.json()
        return data.data
    }

)

const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        addFavourite: (state, action) => {
            state.favourites = [...state.favourites, action.payload]
        },
        deleteAnime: (state, action) => {
            state.favourites = state.favourites.filter(item => item.slug !== action.payload)
        },
        // searchAnime: (state, action) => {
        //     state.dataAnime = state.dataAnime.filter(item => item.titles !== action.payload)
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAnime.pending, state => {
                state.animeLoadingStatus = 'loading'
            })
            .addCase(fetchAnime.fulfilled, (state, action) => {
                state.animeLoadingStatus = 'idle'
                state.dataAnime = [...state.dataAnime, ...action.payload]
            })
            .addCase(fetchAnime.rejected, state => {
                state.animeLoadingStatus = 'error'
            })
            // .addCase(fetchSearchAnime.pending, state => {
            //     state.animeLoadingStatus = 'loading'
            // })
            // .addCase(fetchSearchAnime.fulfilled, (state, action) => {
            //     state.animeLoadingStatus = 'idle'
            //     state.dataAnime = action.payload
            // })
            // .addCase(fetchSearchAnime.rejected, state => {
            //     state.animeLoadingStatus = 'error'
            // })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = animeSlice

export const {addFavourite, deleteAnime, searchAnime} = actions

export default reducer