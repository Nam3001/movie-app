const routes = {
	home: '/',
	movieDetail: '/@:movieId',
	movieList: '/movie-list',
	watchMovie: '/watch-movie',
	login: '/login',
	register: '/register',
	trending: '/trending',
	nowPlaying: '/now-playing',
	topRated: '/top-rated',
	popular: '/popular',
	upcoming: '/upcoming',
	category: 'category/@:categoryId',
	notFound: '*'
}

export default routes