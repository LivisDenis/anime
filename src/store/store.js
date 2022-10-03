import {configureStore} from "@reduxjs/toolkit";
import animeSlice from "../components/pages/animeList/animeSlice";
import searchSlice from "../components/pages/animeSearch/searchSlice";

const store = configureStore({
    reducer: {
        animeSlice,
        searchSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store