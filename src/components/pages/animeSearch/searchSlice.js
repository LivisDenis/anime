import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchSearchAnime = createAsyncThunk(
    'anime/fetchSearchAnime',
    async (name) => {
        const response = await fetch(
            `https://kitsu.io/api/edge/anime?filter[text]=${name}&page[limit]=18&page[offset]=1`
        )

        const data = await response.json()
        return data.data
    }
)

const initialState = {
    searchAnime: [],
    animeLoadingStatus: 'idle',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSearchAnime.pending]: (state) => {
            return {...state, animeLoadingStatus: 'loading'}
        },
        [fetchSearchAnime.fulfilled]: (state, action) => {
            return {searchAnime: [...action.payload], animeLoadingStatus: 'idle'}
        },
        [fetchSearchAnime.rejected]: state => {
            return {...state, animeLoadingStatus: 'error'}
        }
    }
})

const {reducer} = searchSlice

// export const {} = actions

export default reducer