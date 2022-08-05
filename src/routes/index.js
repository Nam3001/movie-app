import config from '@/configs'
import Home from '@/pages/Home'
import MovieDetail from '@/pages/MovieDetail'
import WatchMovie from '@/pages/WatchMovie'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import SameGenre from '@/pages/SameGenre'
import Trending from '@/pages/Trending'
import NowPlaying from '@/pages/NowPlaying'
import Upcoming from '@/pages/Upcoming'
import Popular from '@/pages/Popular'
import TopRated from '@/pages/TopRated'
import NotFound from '@/pages/NotFound'



const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movieDetail, component: MovieDetail },
    { path: config.routes.watchMovie, component: WatchMovie },
    { path: config.routes.movieList, component: () => <></> },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.category, component: SameGenre },
    { path: config.routes.trending, component: Trending },
    { path: config.routes.nowPlaying, component: NowPlaying },
    { path: config.routes.topRated, component: TopRated },
    { path: config.routes.popular, component: Popular },
    { path: config.routes.upcoming, component: Upcoming },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
