import React, {useContext, useEffect, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import AnimeList from "../animeList/AnimeList";
import AnimePage from "../animePage/AnimePage";
import Favourite from "../favourite/Favourite";
import Login from "../login/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";
import {fetchAnime} from "../animeList/animeSlice";
import {useDispatch} from "react-redux";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [offset, setOffset] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAnime(offset))
    }, [offset])

    return user ?
        (
            <div className='w-100'>
                <Routes>
                    <Route path='/' element={<AnimeList setOffset={setOffset}/>}/>
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