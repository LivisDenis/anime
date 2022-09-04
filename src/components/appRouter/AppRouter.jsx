import React, {useContext, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import AnimeList from "../animeList/AnimeList";
import AnimePage from "../animePage/AnimePage";
import Favourite from "../favourite/Favourite";
import AnimeService from "../../services/AnimeService";
import Login from "../login/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../../index";

const AppRouter = ({favouriteList, setFavouriteList}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [favourite, setFavourite] = useState([])
    const {getOneAnime} = AnimeService()

    const addFavourite = (name) => {
        getOneAnime(name).then(res => setFavourite(res))
        setFavouriteList(favouriteList => [...favouriteList, favourite])
    }

    return user ?
        (
            <div>
                <Routes>
                    <Route path='/' element={<AnimeList addFavourite={addFavourite} />}/>
                    <Route path='/anime/:animeId' element={<AnimePage />}/>
                    <Route path='/favourite' element={<Favourite favouriteList={favouriteList} />}/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </div>
        )
        :
        (
            <div>
                <Routes>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/' element={<AnimeList addFavourite={addFavourite} />}/>
                    <Route path="*" element={<Navigate to="/login" replace />}/>
                </Routes>
            </div>
        )
    ;
};

export default AppRouter;