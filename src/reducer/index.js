import {createReducer} from "@reduxjs/toolkit";
import {animeFetched, animeFetching, animeFetchingError} from "../action/action";

const initialState = {
    dataAnime: [],
    animeLoadingStatus: 'idle'
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(animeFetching, state => {
            state.animeLoadingStatus = 'loading'
        })
        .addCase(animeFetched, (state, action) => {
            state.animeLoadingStatus = 'idle'
            state.dataAnime = action.payload
        })
        .addCase(animeFetchingError, state => {
            state.animeLoadingStatus = 'error'
        })
})

export default reducer