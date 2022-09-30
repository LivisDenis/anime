import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    dataAnime: [],
    animeLoadingStatus: 'idle',
    favourites: []
}

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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchSearchAnime.pending, state => {
                state.animeLoadingStatus = 'loading'
            })
            .addCase(fetchSearchAnime.fulfilled, (state, action) => {
                state.animeLoadingStatus = 'idle'
                state.dataAnime = action.payload
            })
            .addCase(fetchSearchAnime.rejected, state => {
                state.animeLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = animeSlice

export const {} = actions

export default reducer