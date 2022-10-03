import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import AnimeList from "./pages/animeList/AnimeList";
import AnimePage from "./pages/animePage/AnimePage";
import Favorite from "./pages/favorite/Favorite";
import Login from "./pages/login/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import {fetchAnime} from "./pages/animeList/animeSlice";
import {useDispatch} from "react-redux";
import AnimeSearch from "./pages/animeSearch/AnimeSearch";
import {
    ANIME_LIST_ROUTE,
    ANIME_PAGE_ROUTE,
    ANIME_SEARCH,
    FAVOURITE_PAGE_ROUTE,
    FAVOURITE_ROUTE,
    LOGIN_ROUTE
} from "../utils/consts";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [offsetList, setOffsetList] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAnime(offsetList))
    }, [offsetList]) // eslint-disable-line

    return user ?
        (
            <div className='w-100'>
                <Routes>
                    <Route path={ANIME_LIST_ROUTE} element={<AnimeList setOffsetList={setOffsetList}/>}/>
                    <Route path={ANIME_PAGE_ROUTE} element={<AnimePage />}/>
                    <Route path={FAVOURITE_ROUTE} element={<Favorite />}/>
                    <Route path={ANIME_SEARCH} element={<AnimeSearch />}/>
                    <Route path={FAVOURITE_PAGE_ROUTE} element={<AnimePage />}/>
                    <Route path="*" element={<Navigate to={ANIME_LIST_ROUTE} replace />}/>
                </Routes>
            </div>
        )
        :
        (
            <div>
                <Routes>
                    <Route path={LOGIN_ROUTE} element={<Login />}/>
                    <Route path={ANIME_LIST_ROUTE} element={<AnimeList />}/>
                    <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />}/>
                </Routes>
            </div>
        )
    ;
};

export default AppRouter;