import {
    Home,
    MovieDetail,
    WatchMovie,
    Login,
    Register,
    MovieList
} from '@/pages'

const publicRoutes = [
    { path: '/', component: Home },
    { path: 'movie-detail', component: MovieDetail },
    { path: 'watch-movie', component: WatchMovie },
    { path: 'movie-list', component: MovieList },
    { path: 'login', component: Login, layout: null },
    { path: 'register', component: Register, layout: null }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
