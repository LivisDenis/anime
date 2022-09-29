import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteAnime} from "../animeList/animeSlice";

const Favourite = () => {
    const favourite = useSelector(state => state.animeSlice.favourites)
    const dispatch = useDispatch()

    const removeAnime = (title) => {
        dispatch(deleteAnime(title))
    }

    const renderCards = (anime) => {
        const items = anime.map(item => {
            const {titles, posterImage, status, startDate, averageRating, episodeCount, slug} = item

            return (
                <div key={item.slug} className="anime-card border border-primary rounded-2 p-2">
                    <Link to={`/favourite/${slug}`}>
                        <img src={posterImage} className="card-img-top" alt={titles}/>
                    </Link>
                    <div className="card-body mt-2">
                        <h5 className="card-title">{titles}</h5>
                        <hr/>
                        <div>Rating: {averageRating}</div>
                        <div>Release date: {startDate}</div>
                        <div>Episodes: {episodeCount}</div>
                        <div>Status: {status}</div>
                        <hr/>
                        <div className="btns d-flex justify-content-between">
                            <Link to={`/favourite/${slug}`} className="btn btn-primary mt-auto">View</Link>
                            <button onClick={() => removeAnime(slug)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="cards d-flex align-content-start flex-wrap gap-5">
                {items}
            </div>
        )
    }

    const elements = renderCards(favourite)
    return (
        <div>
            <h2>Favourites</h2>
            <hr/>
            {elements}
        </div>
    );
};

export default Favourite;