import config from '@/configs'
import Home from '@/pages/Home'
import MovieDetail from '@/pages/MovieDetail'
import WatchMovie from '@/pages/WatchMovie'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Trending from '@/pages/Trending'
import NowPlaying from '@/pages/NowPlaying'
import Upcoming from '@/pages/Upcoming'
import Popular from '@/pages/Popular'
import TopRated from '@/pages/TopRated'
import NotFound from '@/pages/NotFound'
import SearchPage from '@/pages/SearchPage'
import Casts from '@/pages/MovieDetail/pages/Casts'
import Overall from '@/pages/MovieDetail/pages/Overall'
import Reviews from '@/pages/MovieDetail/pages/Reviews'


const publicRoutes = [
    { path: config.routes.home, component: Home },
    {
        path: config.routes.movieDetail,
        component: MovieDetail,
        children: [
            { path: config.routes.overall, component: Overall },
            { path: config.routes.casts, component: Casts },
            { path: config.routes.reviews, component: Reviews },
        ]
    },
    { path: config.routes.watchMovie, component: WatchMovie },
    { path: config.routes.watchMovie, component: WatchMovie },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.trending, component: Trending },
    { path: config.routes.nowPlaying, component: NowPlaying },
    { path: config.routes.topRated, component: TopRated },
    { path: config.routes.popular, component: Popular },
    { path: config.routes.upcoming, component: Upcoming },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
