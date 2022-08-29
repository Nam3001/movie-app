import { useEffect, useState, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { Typography } from '@mui/material'

import Wrapper from '@/components/Wrapper'
import movieApi from '@/utils/api/movieApi'
import MovieListGrid from '@/components/MovieListGrid'
import useLoadingMovie from '@/hooks/useLoadingMovie'
import Heading from '@/components/Heading'

const TopRated = () => {
    const location = useLocation()

    const page = useMemo(() => {
        const currentPage = queryString.parse(location.search)?.page
        return parseInt(currentPage) || 1
    }, [location.search])

    const { isLoading, movies } = useLoadingMovie({
        movieApi: movieApi.getTopRated,
        reloadOnPageChange: true
    })

    return (
        <Wrapper>
            <Heading>Phim Được Đánh Giá Cao</Heading>
            <MovieListGrid maxPage={50} movies={movies} isLoading={isLoading} />
        </Wrapper>
    )
}

TopRated.propTypes = {}

export default memo(TopRated)
