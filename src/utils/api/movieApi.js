import httpRequest from './httpRequest'

class MovieApi {
	getAll(params) {
		return httpRequest.get('/discover/movie', { params })
	}

	getNowPlaying(params) {
		return httpRequest.get(`/movie/now_playing`, { params })
	}

	getCredits(movieId) {
		return httpRequest.get(`/movie/${movieId}/credits`)
	}

	getPopular(params) {
		return httpRequest.get(`/movie/popular`, { params })
	}

	getTopRated(params) {
		return httpRequest.get(`/movie/top_rated`, { params })
	}

	getUpcoming(params) {
		return httpRequest.get(`/movie/upcoming`, { params })
	}

	getTrending(params) {
		return httpRequest.get('trending/movie/day', { params })
	}

	getDetail(id, params) {
		return httpRequest.get(`/movie/${id}`, { params })
	}

	getAcountState(id, params) {
		return httpRequest.get(`/movie/${id}/account_states`, { params })
	}

	getReviews(id, params) {
		return httpRequest.get(`/movie/${id}/reviews`, { params })
	}

	getRecommendations(id, params) {
		return httpRequest.get(`/movie/${id}/recommendations`, { params })
	}

	getSimilarMovie(id, params) {
		return httpRequest.get(`/movie/${id}/similar`, { params })
	}

	searchMovies(searchTerm, params) {
		const urlParams = {
			...params,
			query: searchTerm
		}
		return httpRequest.get('/search/movie', { params: urlParams })
	}

	getGenres() {
		return httpRequest.get('genre/movie/list')
	}
}

const movieApi = new MovieApi()

export default movieApi