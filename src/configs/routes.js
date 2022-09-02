const routes = {
	home: '/',
	movieDetail: '/movieDetail/@:movieId',
	movieList: '/movie-list',
	trending: '/trending',
	nowPlaying: '/now-playing',
	topRated: '/top-rated',
	popular: '/popular',
	upcoming: '/upcoming',
	search: '/search',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	follow: '/follow',
	notFound: '*',
	watching: 'watching',
	completed: 'completed',
	paused: 'paused',
	intended: 'intended'
}

export default routes