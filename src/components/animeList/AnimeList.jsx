import React, {useContext} from 'react';
import AnimeService from "../../services/AnimeService";
import {Link} from "react-router-dom";

import './animeList.scss';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../loader/Loader";
import {addFavourite} from "./animeSlice";
import {useDispatch, useSelector} from "react-redux";

const AnimeList = ({setOffset}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const {getOneAnime} = AnimeService()
    const {dataAnime, animeLoadingStatus} = useSelector(state => state.animeSlice)
    const dispatch = useDispatch()

    const addFavourites = (title) => {
        getOneAnime(title).then(res => dispatch(addFavourite(res)))
    }

    const renderCards = (anime) => {
        const items = anime.map(item => {
            const {titles, posterImage, status, startDate, averageRating, episodeCount, slug} = item.attributes

            return (
                <div key={item.id} className="anime-card border border-primary rounded-2 p-2">
                    <Link to={`/anime/${slug}`}>
                        <img src={posterImage.medium} className="card-img-top" alt={titles.en || titles.en_jp}/>
                    </Link>
                    <div className="card-body mt-2">
                        <h5 className="card-title">{titles.en || titles.en_jp}</h5>
                        <hr/>
                        <div>Rating: {averageRating}</div>
                        <div>Release date: {startDate}</div>
                        <div>Episodes: {episodeCount}</div>
                        <div>Status: {status}</div>
                        <hr/>
                        <div className="btns d-flex justify-content-between">
                            <Link to={`/anime/${slug}`} className="btn btn-primary mt-auto">View</Link>
                            <button
                                disabled={!user}
                                onClick={() => addFavourites(slug)}
                                className="btn btn-danger"
                            >
                                Add to favourite
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="cards">
                <div className='d-flex align-content-start justify-content-center flex-wrap gap-5 mb-4'>
                    {items}
                </div>
                {animeLoadingStatus === 'loading'
                    ? <Loader/>
                    : <button
                            onClick={() => setOffset(offset => offset + 6)}
                            className='btn btn-primary text-center btn-more'>MORE</button>
                }
            </div>
        )
    }

    if (dataAnime.length === 0) return <Loader/>

    const elements = renderCards(dataAnime)
    return (
        <div>
            <h2>Anime</h2>
            <hr/>
            {elements}
        </div>
    );
};

export default AnimeList;