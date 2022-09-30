import Navbar from "../navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {useContext} from "react";
import AppRouter from "../appRouter/AppRouter";
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../loader/Loader";
import Filters from "../filters/Filters";

function App() {
    const {auth} = useContext(Context)
    const [user, loading] = useAuthState(auth)

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <div className="anime-container d-flex">
                    {
                        loading
                        ? <Loader/>
                        : <AppRouter />
                    }
                    {/*<Filters/>*/}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
