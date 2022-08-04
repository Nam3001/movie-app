import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import MovieCard, { MovieSkeleton } from '@/components/MovieCard'
import Wrapper from '@/components/Wrapper'
import { Box, Grid, Typography, MenuItem, Pagination } from '@mui/material'
import Select from '@/components/Select'
import movieApi from '@/utils/api/movieApi'
import { useNavigate, useLocation } from 'react-router-dom'
import MovieList from '@/components/MovieList'
import queryString from 'query-string'

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
    const navigate = useNavigate()
    const location = useLocation()
    console.log('rerender')

    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState([])

    const page = useMemo(() => {
        const currentPage = queryString.parse(location.search)?.page
        return parseInt(currentPage) || 1
    }, [location.search])

    // load movie on page change
    useEffect(() => {
        ;(async () => {
            try {
                if (!isLoading) setIsLoading(true)

                const res = await movieApi.getAll({ page })

                setIsLoading(false)
                setMovies(res.data.results)
            } catch (err) {
                throw new Error(err)
            }
        })()
    }, [page])

    return (
        <Wrapper>
            <Typography sx={styles.heading} variant="h1" component="p">
                phim mới cập nhật
            </Typography>
            <MovieList
                movies={movies}
                isLoading={isLoading}
            />
        </Wrapper>
    )
}

Home.propTypes = {}

export default memo(Home)
