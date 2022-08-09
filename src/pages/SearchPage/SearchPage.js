import React, { useEffect, useState, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import Wrapper from '@/components/Wrapper'
import { Box, Typography } from '@mui/material'
import Heading from '@/components/Heading'
import movieApi from '@/utils/api/movieApi'
import ResultItem from './components/ResultItem'
import Pagination from '@/components/Pagination'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import config from '@/configs'
import usePagination from '@/hooks/usePagination'
import useLazyLoadImage from '@/hooks/useLazyLoadImage'
import ResultSkeletonList from './components/ResultSkeletonList'

const styles = {
	searchList: {
		px: '16px',
		my: 5
	}
}

const Search = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const movieListRef = useRef()

	const [movies, setMovies] = useState([])
	const [maxPage, setMaxPage] = useState(1)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [loading])

	useEffect(() => {
		const queryParams = queryString.parse(location.search)
		;(async () => {
			if (!loading) setLoading(true)

			const res = await movieApi.searchMovies(
				queryParams?.query,
				queryParams
			)
			const data = res.data

			setMaxPage(data?.total_pages)
			setMovies(data.results)
			setLoading(false)
		})()
	}, [location.search])

	// lazy load image
	useLazyLoadImage(movieListRef, loading)
	const [page, handlePageChange] = usePagination()

	return (
		<Wrapper>
			<Heading>Tìm Phim</Heading>
			<Box ref={movieListRef} sx={styles.searchList}>
				{!loading &&
					movies.map((movie, id) => (
						<ResultItem
							key={movie.id}
							title={movie.title}
							thumbnail={movie.poster_path}
							overview={movie.overview}
						/>
					))}

				{loading && <ResultSkeletonList />}

				{!loading && (
					<Pagination
						page={page}
						onPageChange={handlePageChange}
						maxPage={maxPage}
					/>
				)}
			</Box>
		</Wrapper>
	)
}

Search.propTypes = {}

export default memo(Search)
