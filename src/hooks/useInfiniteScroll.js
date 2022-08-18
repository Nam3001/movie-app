import { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'

export default function useInfiniteScroll(props) {
	const { hasMore, loading, lastElementRef } = props
	const { rootRef, threshold = 0 } = props

	const [currentPage, setCurrentPage] = useState(1)

	const observer = useRef(null)
	const observerCallback = useCallback(
		(entries) => {
			if (entries[0].isIntersecting && hasMore)
				setCurrentPage((prevPage) => prevPage + 1)
		},
		[hasMore]
	)

	useEffect(() => {
		if (loading || !lastElementRef.current) return

		observer.current = new IntersectionObserver(observerCallback, {
			root: rootRef?.current ?? null,
			threshold
		})
		observer.current.observe(lastElementRef.current)

		return () => observer.current.disconnect()
	}, [loading, hasMore, lastElementRef.current])

	const resetCurrentPage = useCallback(() => setCurrentPage(1), [])

	return { currentPage, resetCurrentPage }
}

useInfiniteScroll.propTypes = {
	hasMore: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	lastElementRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any })
	]),
	rootRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any })
	]),
	threshold: PropTypes.number
}
