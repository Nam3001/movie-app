import React, { useEffect, useState } from 'react'
import { useRef, memo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, Fab } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import queryString from 'query-string'

import Wrapper from '@/components/Wrapper'
import Heading from '@/components/Heading'
import movieApi from '@/utils/api/movieApi'
import MovieList from '@/components/MovieList'
import MovieItem from '@/components/MovieItem'
import config from '@/configs'
import MovieListSkeleton from '@/components/MovieListSkeleton'
import { createPathname } from '@/utils/common'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import SpinnerLoading from '@/components/SpinnerLoading'
import { uniqBy } from '@/utils/common'
import ScrollTop from '@/components/ScrollTop'

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

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)

    const lastElementRef = useRef()

    const { currentPage, resetCurrentPage } = useInfiniteScroll({
        hasMore,
        loading,
        lastElementRef
    })

    // Load new movies when page change
    useEffect(() => {
        // not load movie on the first time
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

    // Load movie on the first time page load, and when user search again
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

                // reset current page when next search
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
            <Box sx={styles.searchList}>
                <MovieList
                    loading={loading}
                    movies={movies}
                    onClick={handleClickMovie}
                    lastElementRef={lastElementRef}
                />
                {movies.length === 0 && !loading && (
                    <Typography sx={styles.notFound}>
                        Không có kết quả phù hợp.
                    </Typography>
                )}
            </Box>
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Wrapper>
    )
}

Search.propTypes = {}

export default memo(Search)
