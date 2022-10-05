import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Loader";
import {addFavorite} from "../animeList/animeSlice";
import {Context} from "../../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {fetchSearchAnime} from "./searchSlice";
import AnimeCard from "../../AnimeCard";
import InputSearch from "../../InputSearch";

const AnimeSearch = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const {searchAnime, animeLoadingStatus} = useSelector(state => state.searchSlice)
    const dispatch = useDispatch()

    const search = (e) => {
        e.preventDefault()
        dispatch(fetchSearchAnime(value))
        setSearchQuery(value)
        setValue('')
    }

    const addFavourites = (title) => {
        searchAnime.forEach(el => el.attributes.slug === title && dispatch(addFavorite(el)))
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

    const elements = renderCards(searchAnime)
    return (
        <div>
            <h2>Search</h2>
            <hr/>
            <InputSearch value={value} setValue={setValue} search={search}/>
            <h2 className='mt-3'>Query search: {searchQuery}</h2>
            <hr/>
            <div>
                {animeLoadingStatus === 'loading'
                    ? <Loader/>
                    : <div className="cards">
                        <div className='d-flex align-content-start justify-content-center flex-wrap gap-5 mb-4'>
                            {elements}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AnimeSearch;