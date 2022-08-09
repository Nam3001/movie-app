import { useNavigate, useLocation } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import queryString from 'query-string'

const usePagination = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const currentSearchParam = queryString.parse(location.search)

	const page = useMemo(() => {
		const currentPage = queryString.parse(location.search)?.page
		return parseInt(currentPage) || 1
	}, [currentSearchParam?.page])

	const handlePageChange = useCallback((event, newPage) => {
		// remove prev page param if it exist
		currentSearchParam?.page && delete currentSearchParam?.page

		const search = queryString.stringify({
			...currentSearchParam,
			page: newPage
		})
		navigate({
			pathname: location.pathname,
			search
		})
	}, [location.search])

	return [ page, handlePageChange ]
}

export default usePagination
