import React from 'react';
import {Link} from "react-router-dom";

const Favourite = ({favouriteList}) => {

    const renderCards = (anime) => {
        const items = anime.map(item => {
            const {titles, posterImage, status, startDate, averageRating, episodeCount, slug} = item

            return (
                <div key={item.id} className="anime-card border border-primary rounded-2 p-2">
                    <Link to={`/anime/${slug}`}>
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
                            <Link to={`/anime/${slug}`} className="btn btn-primary mt-auto">View</Link>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="cards d-flex align-content-start justify-content-between flex-wrap">
                {items}
            </div>
        )
    }

    const elements = renderCards(favouriteList)
    return (
        <div>
            {elements}
        </div>
    );
};

export default Favourite;