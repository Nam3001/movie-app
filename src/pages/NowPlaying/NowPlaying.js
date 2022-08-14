import React, { useEffect, useState, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Typography } from '@mui/material'

import Wrapper from '@/components/Wrapper'
import movieApi from '@/utils/api/movieApi'
import MovieList from '@/components/MovieList'
import useLoadingMovie from '@/hooks/useLoadingMovie'
import Heading from '@/components/Heading'

const NowPlaying = () => {
	const location = useLocation()

	const page = useMemo(() => {
		const currentPage = queryString.parse(location.search)?.page
		return parseInt(currentPage) || 1
	}, [location.search])

	const { isLoading, movies } = useLoadingMovie({
		movieApi: movieApi.getNowPlaying,
		reloadOnPageChange: true
	})

	return (
		<Wrapper>
			<Heading>Phim Đang Khởi Chiếu</Heading>
			<MovieList maxPage={50} movies={movies} isLoading={isLoading} />
		</Wrapper>
	)
}

NowPlaying.propTypes = {}

export default memo(NowPlaying)
