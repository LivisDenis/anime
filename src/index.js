import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/App";

// Style
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// Firebase
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCvYVMx78VA9U7W9RReskf4MDSGtWd9abM",
    authDomain: "authanime-2d1c1.firebaseapp.com",
    projectId: "authanime-2d1c1",
    storageBucket: "authanime-2d1c1.appspot.com",
    messagingSenderId: "525284070234",
    appId: "1:525284070234:web:debba4d996e5aee1db5963",
    measurementId: "G-EJ37WD6FYC"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const firestore = getFirestore(app)

// Context
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>
);
