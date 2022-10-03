import React, {useContext} from 'react';
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../../Loader";
import {useDispatch, useSelector} from "react-redux";
import './animeList.scss';
import {addFavorite} from "./animeSlice";
import AnimeCard from "../../AnimeCard";

const AnimeList = ({setOffsetList}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const {dataAnime, animeLoadingStatus} = useSelector(state => state.animeSlice)
    const dispatch = useDispatch()

    const addFavourites = (title) => {
        dataAnime.forEach(el => el.attributes.slug === title && dispatch(addFavorite(el)))
    }

    const renderCards = (anime) => {
        return anime.map(item => {
            const {slug} = item.attributes

            return (
                <div key={item.id} className="anime-card border border-primary rounded-2 p-2">
                    <AnimeCard item={item.attributes}>
                            <button
                                disabled={!user}
                                onClick={() => addFavourites(slug)}
                                className="btn btn-danger">
                                Add to favourite
                            </button>
                    </AnimeCard>
                </div>
            )
        })
    }

    if (dataAnime.length === 0) return <Loader/>

    const elements = renderCards(dataAnime)
    return (
        <div>
            <h2>Anime</h2>
            <hr/>
            <div className="cards">
                <div className='d-flex align-content-start justify-content-center flex-wrap gap-5 mb-4'>
                    {elements}
                </div>
                {animeLoadingStatus === 'loading'
                    ? <Loader/>
                    : <button
                        onClick={() => setOffsetList(offset => offset + 6)}
                        className='btn btn-primary text-center btn-more'>MORE</button>
                }
            </div>
        </div>
    );
};

export default AnimeList;