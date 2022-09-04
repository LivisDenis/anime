import {ANIME_LIST_ROUTE, ANIME_PAGE_ROUTE, FAVOURITE_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import Login from "./components/login/Login";
import Favourite from "./components/favourite/Favourite";
import AnimePage from "./components/animePage/AnimePage";
import AnimeList from "./components/animeList/AnimeList";


const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: Login
    },
    {
        path: ANIME_LIST_ROUTE,
        element: AnimeList
    }
]

const privateRoutes = [
    {
        path: FAVOURITE_ROUTE,
        element: Favourite
    },
    {
        path: ANIME_PAGE_ROUTE,
        element: AnimePage
    }
]