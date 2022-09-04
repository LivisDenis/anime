import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

import './animePage.scss';
import AnimeService from "../../services/AnimeService";

const AnimePage = () => {
    const {animeId} = useParams()
    const {getOneAnime} = AnimeService()
    const [dataAnime, setDataAnime] = useState([])

    useEffect(() => {
        onRequest(animeId)
    }, [])

    const onRequest =  (animeId) => {
        getOneAnime(animeId).then(res => setDataAnime(res))
    }

    // console.log(dataAnime)

    const {titles, description, posterImage, status, startDate, averageRating, episodeCount} = dataAnime
    return (
        <div className="single-anime">
            <div className='single-anime__body'>
                <div style={{display: 'flex', gap: 40}}>
                    <img src={posterImage} alt={titles} className="single-anime__img"/>
                    <div className="single-anime__info">
                        <h2 className="single-anime__name">{titles}</h2>
                        <p className="single-anime__descr">Rating: {averageRating}</p>
                        <p className="single-anime__descr">Episodes: {episodeCount}</p>
                        <p className="single-anime__descr">Release date: {startDate}</p>
                        <p className="single-anime__descr">Status: {status}</p>
                    </div>
                </div>
                <p className="single-anime__descr">{description}</p>
            </div>
            <Link to='/' className="single-anime__back">Back to all</Link>
        </div>
    );
};

export default AnimePage;