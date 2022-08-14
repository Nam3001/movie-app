import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import Wrapper from '@/components/Wrapper'
import Heading from '@/components/Heading'
import Select from '@/components/Select'
import movieApi from '@/utils/api/movieApi'
import MovieList from '@/components/MovieList'
import useLoadingMovie from '@/hooks/useLoadingMovie'

function Home() {
    const location = useLocation()

    const page = useMemo(() => {
        const currentPage = queryString.parse(location.search)?.page
        return parseInt(currentPage) || 1
    }, [location.search])

    const { isLoading, movies } = useLoadingMovie({
        movieApi: movieApi.getAll,
        reloadOnPageChange: true
    }) 

    return (
        <Wrapper>
            <Heading>Phim Mới Cập Nhật</Heading>
                <MovieList
                    maxPage={200}
                    movies={movies}
                    isLoading={isLoading}
                />
        </Wrapper>
    )
}

Home.propTypes = {}

export default memo(Home)
