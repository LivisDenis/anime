import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSelector} from "react-redux";
import './navbar.scss';
import {ANIME_LIST_ROUTE, ANIME_SEARCH, FAVOURITE_ROUTE, LOGIN_ROUTE} from "../../utils/consts";

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const {favorites} = useSelector(state => state.animeSlice)

    return (
        <nav className="position-fixed top-0 w-100 navbar bg-primary p-3">
            <div className="container-fluid">
                <Link to={ANIME_LIST_ROUTE} className="navbar-brand">Anime</Link>
                <div className="d-flex gap-3">
                    <Link to={ANIME_SEARCH} className="btn btn-light btn-favourite">
                        Search
                    </Link>
                    <Link to={FAVOURITE_ROUTE} className="btn btn-dark btn-favourite">
                        <span className='amount'>{favorites.length}</span>
                        Favourite
                    </Link>
                    {user
                        ? <button onClick={() => auth.signOut()} className="btn btn-dark">Logout</button>
                        : <Link to={LOGIN_ROUTE} className="btn btn-dark">Sign in</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;