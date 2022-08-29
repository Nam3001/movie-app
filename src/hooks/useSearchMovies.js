import { useState, useEffect } from 'react'

import movieApi from '@/utils/api/movieApi'
import useInfiniteScroll from './useInfiniteScroll'
import { uniqBy } from '@/utils/common'

export default function useSearchMovies(props) {
	const { searchTerm, lastElementRef = {}, rootRef = {} } = props
	
	const [suggests, setSuggests] = useState([])
	const [hasMore, setHasMore] = useState(true)

	// if has lastElementRef element and rootRef element: loading === true
	const [loading, setLoading] = useState(false)

	const { currentPage, resetCurrentPage } = useInfiniteScroll({
		hasMore,
		loading,
		lastElementRef,
		rootRef
	})

	// load suggest when searchTerm change
	useEffect(() => {
		;(async () => {
			try {
				if (!searchTerm) {
					setSuggests([])
					return
				}
				if (!loading) setLoading(true)

				const res = await movieApi.searchMovies(searchTerm)

				const data = res.data

				setHasMore(!!(data.page < data.total_pages))
				setLoading(false)
				// setOpenSuggest(Boolean(data.results.length > 0))
				setSuggests(data.results)
				resetCurrentPage()
			} catch (err) {
				console.log(err)
			}
		})()
		 // eslint-disable-next-line
	}, [searchTerm])

	// load suggest when page change
	useEffect(() => {
		if (suggests.length === 0) return
		;(async () => {
			try {
				if (!searchTerm) {
					setSuggests([])
					return
				}
				if (!loading) setLoading(true)

				const res = await movieApi.searchMovies(searchTerm, {
					page: currentPage
				})

				const data = res.data
				setHasMore(!!(data.page < data.total_pages))
				setLoading(false)
				// setOpenSuggest(Boolean(data.results.length > 0))
				setSuggests((prevSuggests) => {
					const newSuggests = uniqBy(
						[...prevSuggests, ...data.results],
						'id'
					)
					return newSuggests
				})
			} catch (err) {
				console.log(err)
			}
		})()
		 // eslint-disable-next-line
	}, [currentPage])

	return {
		hasMore,
		suggests,
		loading
	}
}
