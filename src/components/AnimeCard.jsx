import React from 'react';
import {Link} from "react-router-dom";

const AnimeCard = ({item, children}) => {
    const {titles, posterImage, status, startDate, averageRating, episodeCount, slug} = item

    return (
        <>
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
                    {children}
                </div>
            </div>
        </>
    );
};

export default AnimeCard;