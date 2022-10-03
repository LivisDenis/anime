import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useSelector} from "react-redux";
import './navbar.scss';

const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const favourite = useSelector(state => state.animeSlice.favourites)

    return (
        <nav className="position-fixed top-0 w-100 navbar bg-primary p-3">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">Anime</Link>
                <div className="d-flex gap-3">
                    <Link to='/search' className="btn btn-light btn-favourite">
                        Search
                    </Link>
                    <Link to='/favourite' className="btn btn-dark btn-favourite">
                        <span className='amount'>{favourite.length}</span>
                        Favourite
                    </Link>
                    {user
                        ? <button onClick={() => auth.signOut()} className="btn btn-dark">Logout</button>
                        : <Link to='/login' className="btn btn-dark">Sign in</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;