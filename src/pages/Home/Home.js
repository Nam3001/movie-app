import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import MovieCard, { MovieSkeleton } from '@/components/MovieCard'
import Wrapper from '@/components/Wrapper'
import Heading from '@/components/Heading'
import Select from '@/components/Select'
import movieApi from '@/utils/api/movieApi'
import MovieList from '@/components/MovieList'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import useLoadingMovie from '@/hooks/useLoadingMovie'

const styles = {
    heading: {
        color: (theme) => theme.color.heading,
        fontSize: '34px',
        textTransform: 'uppercase',
        fontWeight: 500,
        pt: '50px',
        textAlign: {
            xs: 'center',
            lg: 'left'
        }
    }
}

function Home() {
    const location = useLocation()

    const page = useMemo(() => {
        const currentPage = queryString.parse(location.search)?.page
        return parseInt(currentPage) || 1
    }, [location.search])

    const { isLoading, movies } = useLoadingMovie({
        promise: movieApi.getAll({ page }),
        reloadOnPageChange: true
    })

    return (
        <Wrapper>
            <Heading>phim mới cập nhật</Heading>
            <MovieList maxPage={321} movies={movies} isLoading={isLoading} />
        </Wrapper>
    )
}

Home.propTypes = {}

export default memo(Home)
