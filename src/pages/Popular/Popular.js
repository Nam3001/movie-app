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

const Popular = () => {
	const location = useLocation()

	const page = useMemo(() => {
		const currentPage = queryString.parse(location.search)?.page
		return parseInt(currentPage) || 1
	}, [location.search])

	const { isLoading, movies } = useLoadingMovie({
		movieApi: movieApi.getPopular,
		reloadOnPageChange: true
	})

	return (
		<Wrapper>
			<Heading>Phim Phổ Biến</Heading>
			<MovieList maxPage={100} movies={movies} isLoading={isLoading} />
		</Wrapper>
	)
}

Popular.propTypes = {}

export default memo(Popular)
