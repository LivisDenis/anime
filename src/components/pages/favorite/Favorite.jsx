import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAnime} from "../animeList/animeSlice";
import AnimeCard from "../../AnimeCard";

const Favorite = () => {
    const {favorites} = useSelector(state => state.animeSlice)
    const dispatch = useDispatch()

    const removeAnime = (title) => {
        dispatch(deleteAnime(title))
    }

    const renderCards = (anime) => {
        return anime.map(item => {
            const {slug} = item.attributes

            return (
                <div key={slug} className="anime-card border border-primary rounded-2 p-2">
                    <AnimeCard item={item.attributes}>
                        <button onClick={() => removeAnime(slug)} className="btn btn-danger">Delete</button>
                    </AnimeCard>
                </div>
            )
        })
    }

    const elements = renderCards(favorites)
    return (
        <div>
            <h2>Favourites</h2>
            <hr/>
            <div className="cards d-flex align-content-start flex-wrap gap-5">
                {elements}
            </div>
        </div>
    );
};

export default Favorite;