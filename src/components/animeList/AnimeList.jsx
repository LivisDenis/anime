import React, {useContext, useEffect, useState} from 'react';
import AnimeService from "../../services/AnimeService";
import {Link} from "react-router-dom";

import './animeList.scss';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const AnimeList = ({addFavourite}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [anime, setAnime] = useState([])
    const [offset, setOffset] = useState(0)
    const {getAnime} = AnimeService()

    useEffect(() => {
        onRequest(offset)
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset) => {
        getAnime(offset).then(onAnimeLoading)
    }

    const onAnimeLoading = (newItems) => {
        setAnime(anime => [...anime, ...newItems])
        setOffset(offset => offset + 6)
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
                            <button disabled={!user} onClick={() => addFavourite(slug)} className="btn btn-danger">Add to favourite</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="cards d-flex align-content-start justify-content-between flex-wrap">
                {items}
                <button onClick={() => onRequest(offset)} className='btn btn-primary text-center btn-more'>MORE</button>
            </div>
        )
    }

    const elements = renderCards(anime)
    return (
        <div>
            {elements}
        </div>
    );
};

export default AnimeList;