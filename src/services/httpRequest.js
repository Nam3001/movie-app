import axios from 'axios'

// axios instance
const httpRequest = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json'
	}
})

// interceptors request
httpRequest.interceptors.request.use(config => {
	const accessToken = localStorage.getItem('access_token')

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	// add api key to params
	config.params = {
		...config.params,
		api_key: process.env.REACT_APP_API_KEY_MOVIEDB
	}

	return config
}, err => {
	throw new Error(err)
}, { synchonus: true })


// interceptors response
httpRequest.interceptors.response.use(response => {
	return response
}, err => {
	throw new Error(err)
})

export default httpRequest