import { useEffect, useState, useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

function useLoadingMovie({ promise, reloadOnPageChange }) {
	const location = useLocation()

	const [isLoading, setIsLoading] = useState(true)
	const [movies, setMovies] = useState([])

	const page = useMemo(() => {
		const currentPage = queryString.parse(location.search)?.page
		return parseInt(currentPage) || 1
	}, [location.search])

	// load movie when component mounted and on page change if reloadOnPageChange: true
	useEffect(() => {
		if (reloadOnPageChange) {
			;(async () => {
				try {
					if (!isLoading) setIsLoading(true)

					const res = await promise

					setIsLoading(false)
					setMovies(res.data.results)
				} catch (err) {
					throw new Error(err)
				}
			})()
		}
	}, [page])

	// load movie when component mounted if not reloadOnPageChange
	useEffect(() => {
		if (!reloadOnPageChange) {
			;(async () => {
				try {
					if (!isLoading) setIsLoading(true)

					const res = await promise

					setIsLoading(false)
					setMovies(res.data.results)
				} catch (err) {
					throw new Error(err)
				}
			})()
		}
	}, [])

	return {
		isLoading,
		movies
	}
}

export default useLoadingMovie
