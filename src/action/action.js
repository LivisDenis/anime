import {createAction} from "@reduxjs/toolkit";

export const animeFetching = createAction('ANIME_FETCHING')
export const animeFetched = createAction('ANIME_FETCHED')
export const animeFetchingError = createAction('ANIME_FETCHING_ERROR')