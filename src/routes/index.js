import config from '@/configs'
import Home from '@/pages/Home'
import MovieDetail from '@/pages/MovieDetail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Trending from '@/pages/Trending'
import NowPlaying from '@/pages/NowPlaying'
import Upcoming from '@/pages/Upcoming'
import Popular from '@/pages/Popular'
import TopRated from '@/pages/TopRated'
import NotFound from '@/pages/NotFound'
import SearchPage from '@/pages/SearchPage'
import ForgotPassword from '@/pages/ForgotPassword'
import Follow from '@/pages/Follow'


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.trending, component: Trending },
    { path: config.routes.nowPlaying, component: NowPlaying },
    { path: config.routes.topRated, component: TopRated },
    { path: config.routes.upcoming, component: Upcoming },
    { path: config.routes.popular, component: Popular },
    { path: config.routes.movieDetail, component: MovieDetail },
    { path: config.routes.search, component: SearchPage },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: null },
    { path: config.routes.notFound, component: NotFound }
]

const privateRoutes = [
    { path: config.routes.follow + '/*', component: Follow },
]

export { publicRoutes, privateRoutes }
