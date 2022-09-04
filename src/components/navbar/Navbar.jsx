import React, {useContext} from 'react';
import {Link} from "react-router-dom";

import './navbar.scss';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = ({favouriteList}) => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <nav className="navbar bg-primary p-3">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">Anime</Link>
                <div className="d-flex gap-3">
                    <Link to='/favourite' className="btn btn-dark btn-favourite">
                        <span className='amount'>{favouriteList.length}</span>
                        Favourite
                    </Link>
                    {
                        user
                            ? <button onClick={() => auth.signOut()} className="btn btn-dark">Logout</button>
                            : <Link to='/login' className="btn btn-dark">Sign in</Link>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;