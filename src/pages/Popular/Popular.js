import { useEffect, useState, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import Wrapper from '@/components/Wrapper'
import movieApi from '@/utils/api/movieApi'
import MovieListGrid from '@/components/MovieListGrid'
import useLoadingMovie from '@/hooks/useLoadingMovie'
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
            <MovieListGrid
                maxPage={100}
                movies={movies}
                isLoading={isLoading}
            />
        </Wrapper>
    )
}

export default memo(Popular)
