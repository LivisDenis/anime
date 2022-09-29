import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import AnimeList from "../animeList/AnimeList";
import AnimePage from "../animePage/AnimePage";
import Favourite from "../favourite/Favourite";
import Login from "../login/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";
import {addFavourite, fetchAnime} from "../animeList/animeSlice";
import {useDispatch} from "react-redux";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [offset, setOffset] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        onRequest(offset)
    }, [offset])

    const onRequest = (offset) => {
        dispatch(fetchAnime(offset))
    }

    return user ?
        (
            <div>
                <Routes>
                    <Route path='/' element={<AnimeList addFavourite={addFavourite} setOffset={setOffset} />}/>
                    <Route path='/anime/:animeId' element={<AnimePage />}/>
                    <Route path='/favourite' element={<Favourite />}/>
                    <Route path='/favourite/:animeId' element={<AnimePage />}/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </div>
        )
        :
        (
            <div>
                <Routes>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/' element={<AnimeList />}/>
                    <Route path="*" element={<Navigate to="/login" replace />}/>
                </Routes>
            </div>
        )
    ;
};

export default AppRouter;