import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Loader from "../../Loader";
import {useDispatch, useSelector} from "react-redux";
import {ANIME_LIST_ROUTE} from "../../../utils/consts";
import {addFavorite} from "../animeList/animeSlice";
import './animePage.scss';

const AnimePage = () => {
    const {animeId} = useParams()
    const [animePage, setAnimePage] = useState([])
    const [loading, setLoading] = useState(true)
    const {dataAnime, favorites} = useSelector(state => state.animeSlice)
    const {searchAnime} = useSelector(state => state.searchSlice)
    const dispatch = useDispatch()

    const addFavourites = (title) => {
        dataAnime.forEach(el => el.attributes.slug === title && dispatch(addFavorite(el)))
    }

    useEffect(() => {
        // dispatch(fetchFiltersAnime(animeId))
        dataAnime.forEach(el => {
            el.attributes.slug === animeId && setAnimePage(el)
        })
        searchAnime.forEach(el => {
            el.attributes.slug === animeId && setAnimePage(el)
        })
        favorites.forEach(el => {
            el.attributes.slug === animeId && setAnimePage(el)
        })
        setLoading(false)
    }, [animeId]) // eslint-disable-line

    // if (animeLoadingStatus === 'loading') return <Loader/>
    if (loading) return <Loader/>

    const {titles, description, posterImage, status, startDate, averageRating, episodeCount, slug, coverImage} = animePage.attributes
    return (
        <div className='anime-page'>
            {
                coverImage?.small && <div className='anime-page__image'>
                    <img className='single-anime-cover__image' src={coverImage.small} alt="coverImage"/>
                </div>
            }
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
                    <button
                        onClick={() => addFavourites(slug)}
                        className="btn btn-danger w-25 h-25 m-lg-auto">
                        Add to favourite
                    </button>
                    <div>
                        <h3>About {titles.en || titles.en_jp}:</h3>
                        <p className="single-anime__descr">{description}</p>
                    </div>
                </div>
                <Link to={ANIME_LIST_ROUTE} className="single-anime__back">Back to all</Link>
            </div>
        </div>
    );
};

export default AnimePage;