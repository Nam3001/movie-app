import React, { useEffect, useState } from 'react'
import { useRef, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import queryString from 'query-string'

import Wrapper from '@/components/Wrapper'
import Heading from '@/components/Heading'
import movieApi from '@/utils/api/movieApi'
import ResultItem from './components/ResultItem'
import Pagination from '@/components/Pagination'
import config from '@/configs'
import usePagination from '@/hooks/usePagination'
import useLazyLoadImage from '@/hooks/useLazyLoadImage'
import ResultSkeletonList from './components/ResultSkeletonList'
import { createPathname } from '@/utils/common'

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
            try {
                if (!loading) setLoading(true)

                const res = await movieApi.searchMovies(
                    queryParams?.query,
                    queryParams
                )
                const data = res.data

                setMaxPage(data?.total_pages)
                setMovies(data.results)
                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [location.search])

    // lazy load image
    useLazyLoadImage(movieListRef, loading)
    const [page, handlePageChange] = usePagination()

    const handleClickMovie = useCallback((id) => {
        if (!id) return

        const ParentPathname = createPathname(config.routes.movieDetail, id)
        const pathname = `${ParentPathname}/${config.routes.overall}`
        navigate(pathname)
    }, [])

    return (
        <Wrapper>
            <Heading>Tìm Phim</Heading>
            <Box ref={movieListRef} sx={styles.searchList}>
                {!loading &&
                    movies.map((movie, id) => (
                        <ResultItem
                            id={movie.id}
                            onClick={handleClickMovie}
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
