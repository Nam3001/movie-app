import { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

import MovieItem from '@/components/MovieItem'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import SpinnerLoading from '@/components/SpinnerLoading'
import MovieListSkeleton from '@/components/MovieListSkeleton'


const MovieList = ({ onClick, loading, movies, lastElementRef }) => {
	const location = useLocation()

	// scroll to top when change query params
	useEffect(() => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop
		if (scrollTop <= 0) return
		window.scrollTo(0, 0)
	}, [location.search])

	return (
		<Box component="ul" sx={{ mt: 3 }}>
			{movies.length > 0 &&
				movies.map((movie, idx) => {
					if (idx === movies.length - 1) {
						return (
							<MovieItem
								ref={lastElementRef}
								id={movie.id}
								onClick={onClick}
								key={movie.id}
								title={movie.title}
								thumbnail={movie.poster_path}
								overview={movie.overview}
							/>
						)
					} else {
						return (
							<MovieItem
								id={movie.id}
								onClick={onClick}
								key={movie.id}
								title={movie.title}
								thumbnail={movie.poster_path}
								overview={movie.overview}
							/>
						)
					}
				})}
			{movies.length === 0 && loading && <MovieListSkeleton />}
			{loading && movies.length > 0 && <SpinnerLoading color="primary" />}
		</Box>
	)
}

MovieList.propTypes = {
	movies: PropTypes.array,
	loading: PropTypes.bool,
	hasMore: PropTypes.bool,
	lastElementRef: PropTypes.object
}

export default memo(MovieList)
