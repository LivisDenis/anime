import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchAnime = createAsyncThunk(
    'anime/fetchAnime',
    async (offset = 1) => {
        const response = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=6&page[offset]=${offset}`)

        const data = await response.json()
        return data.data
    }
)

const initialState = {
    dataAnime: [],
    animeLoadingStatus: 'idle',
    favorites: []
}

const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites = [...state.favorites, action.payload]
        },
        deleteAnime: (state, action) => {
            state.favourites = state.favourites.filter(item => item.attributes.slug !== action.payload)
        }
    },
    extraReducers: {
        [fetchAnime.pending]: state => {
            return {...state, animeLoadingStatus: 'loading'}
        },
        [fetchAnime.fulfilled]: (state, action) => {
            return {...state, dataAnime: [...state.dataAnime, ...action.payload], animeLoadingStatus: 'idle'}
        },
        [fetchAnime.rejected]: state => {
            return {...state, animeLoadingStatus: 'error'}
        }
    }
})

const {actions, reducer} = animeSlice

export const {addFavorite, deleteAnime} = actions

export default reducer