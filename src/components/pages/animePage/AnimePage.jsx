import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Loader from "../../Loader";
import {useSelector} from "react-redux";
import './animePage.scss';

const AnimePage = () => {
    const {animeId} = useParams()
    const [animePage, setAnimePage] = useState([])
    const [loading, setLoading] = useState(true)
    const {dataAnime} = useSelector(state => state.animeSlice)
    const {searchAnime} = useSelector(state => state.searchSlice)

    useEffect(() => {
        dataAnime.forEach(el => {
            el.attributes.slug === animeId && setAnimePage(el)
            setLoading(false)
        })
        searchAnime.forEach(el => {
            el.attributes.slug === animeId && setAnimePage(el)
            setLoading(false)
        })
    }, [animeId]) // eslint-disable-line

    if (loading) return <Loader/>

    const {titles, description, posterImage, status, startDate, averageRating, episodeCount} = animePage.attributes
    return (
        <div className="single-anime">
            <div className='single-anime__body'>
                <div style={{display: 'flex', gap: 40}}>
                    <img src={posterImage.medium} alt={titles.en || titles.en_jp} className="single-anime__img"/>
                    <div className="single-anime__info">
                        <h2 className="single-anime__name">{titles.en || titles.en_jp}</h2>
                        <p className="single-anime__descr">Rating: {averageRating}</p>
                        <p className="single-anime__descr">Episodes: {episodeCount}</p>
                        <p className="single-anime__descr">Release date: {startDate}</p>
                        <p className="single-anime__descr">Status: {status}</p>
                    </div>
                </div>
                <div>
                    <h3>About {titles.en || titles.en_jp}:</h3>
                    <p className="single-anime__descr">{description}</p>
                </div>
            </div>
            <Link to='/' className="single-anime__back">Back to all</Link>
        </div>
    );
};

export default AnimePage;