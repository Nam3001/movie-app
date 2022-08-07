import React, { useEffect, useState, useMemo, memo } from 'react'
import Wrapper from '@/components/Wrapper'
import PropTypes from 'prop-types'
import movieApi from '@/utils/api/movieApi'
import MovieList from '@/components/MovieList'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import useLoadingMovie from '@/hooks/useLoadingMovie'
import { Typography } from '@mui/material'
import Heading from '@/components/Heading'

const Trending = () => {
	const location = useLocation()

	const page = useMemo(() => {
		const currentPage = queryString.parse(location.search)?.page
		return parseInt(currentPage) || 1
	}, [location.search])

	const { isLoading, movies } = useLoadingMovie({
		movieApi: movieApi.getTrending,
		reloadOnPageChange: true
	})

	return (
		<Wrapper>
			<Heading>Phim Trending Hiện Nay</Heading>
			<MovieList maxPage={15} movies={movies} isLoading={isLoading} />
		</Wrapper>
	)
}

Trending.propTypes = {}

export default memo(Trending)
