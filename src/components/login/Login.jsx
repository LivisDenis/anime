import React, {useContext} from 'react';
import {Context} from "../../index";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then(res => res)
    }

    return (
        <div className="card bg-light">
            <div className="card-body text-center">
                <h5 className="card-title">Аuthorization</h5>
                <button onClick={login} className="btn btn-primary">Sign in with Google</button>
            </div>
        </div>
    );
};

export default Login;