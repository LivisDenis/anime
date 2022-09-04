import Navbar from "../navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {useContext, useState} from "react";
import AppRouter from "../appRouter/AppRouter";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../loader/Loader";

function App() {
    const {auth} = useContext(Context)
    const [user, loading] = useAuthState(auth)
    const [favouriteList, setFavouriteList] = useState([])

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar favouriteList={favouriteList}/>
                <div className="anime-container">
                    {
                        loading
                        ? <Loader/>
                        : <AppRouter favouriteList={favouriteList} setFavouriteList={setFavouriteList}/>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
