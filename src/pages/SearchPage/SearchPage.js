import React, { useEffect, useState } from 'react'
import { useRef, memo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import queryString from 'query-string'

import Wrapper from '@/components/Wrapper'
import Heading from '@/components/Heading'
import movieApi from '@/utils/api/movieApi'
import ResultItem from './components/ResultItem'
import config from '@/configs'
import ResultSkeletonList from './components/ResultSkeletonList'
import { createPathname } from '@/utils/common'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import SpinnerLoading from '@/components/SpinnerLoading'
import { uniqBy } from '@/utils/common'

const styles = {
    searchList: {
        px: '16px',
        my: 5
    },
    notFound: {
        color: (theme) => theme.color.nav,
        textAlign: 'center',
        fontSize: '20px'
    }
}

const Search = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const movieListRef = useRef()

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    const lastElementRef = useRef(null)

    const { currentPage, resetCurrentPage } = useInfiniteScroll({
        hasMore,
        loading,
        lastElementRef
    })

    useEffect(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        if (scrollTop <= 0) return
        window.scrollTo(0, 0)
    }, [location.search])

    useEffect(() => {
        if (currentPage === 1) return

        const queryParams = queryString.parse(location.search)
        ;(async () => {
            try {
                if (!loading) setLoading(true)

                const res = await movieApi.searchMovies(queryParams?.query, {
                    ...queryParams,
                    page: currentPage
                })
                const data = res.data
                setMovies((prevMovies) => {
                    const newMovies = uniqBy(
                        [...prevMovies, ...data.results],
                        'id'
                    )
                    return newMovies
                })
                setHasMore(!!(data.page < data.total_pages))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
        // eslint-disable-next-line
    }, [currentPage])

    useEffect(() => {
        const queryParams = queryString.parse(location.search)
        ;(async () => {
            try {
                if (!loading) setLoading(true)
                setMovies([])

                const res = await movieApi.searchMovies(queryParams?.query, {
                    ...queryParams
                })
                const data = res.data
                setMovies(data.results)
                setHasMore(!!(data.page < data.total_pages))
                resetCurrentPage()
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        })()
        // eslint-disable-next-line
    }, [location.search])

    const handleClickMovie = useCallback((id) => {
        if (!id) return

        const pathname = createPathname(config.routes.movieDetail, id)
        navigate(pathname)
        // eslint-disable-next-line
    }, [])

    return (
        <Wrapper>
            <Heading>Tìm Phim</Heading>
            <Box ref={movieListRef} sx={styles.searchList}>
                {movies.length > 0 &&
                    movies.map((movie, idx) => {
                        if (idx === movies.length - 1) {
                            return (
                                <ResultItem
                                    ref={lastElementRef}
                                    id={movie.id}
                                    onClick={handleClickMovie}
                                    key={movie.id}
                                    title={movie.title}
                                    thumbnail={movie.poster_path}
                                    overview={movie.overview}
                                />
                            )
                        } else {
                            return (
                                <ResultItem
                                    id={movie.id}
                                    onClick={handleClickMovie}
                                    key={movie.id}
                                    title={movie.title}
                                    thumbnail={movie.poster_path}
                                    overview={movie.overview}
                                />
                            )
                        }
                    })}
                {movies.length === 0 && loading && <ResultSkeletonList />}
                {loading && movies.length > 0 && (
                    <SpinnerLoading color="primary" />
                )}
                {movies.length === 0 && (
                    <Typography sx={styles.notFound}>
                        No matching results.
                    </Typography>
                )}
            </Box>
        </Wrapper>
    )
}

Search.propTypes = {}

export default memo(Search)
