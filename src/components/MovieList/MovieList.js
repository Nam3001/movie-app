import { useState, useEffect, memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import MovieCard, { MovieSkeleton } from '@/components/MovieCard'
import Wrapper from '@/components/Wrapper'
import { Box, Grid, Typography, MenuItem, Pagination } from '@mui/material'
import Select from '@/components/Select'
import movieApi from '@/utils/api/movieApi'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '@/store/genresSlice'
import { genresSelector } from '@/store/selectors'
import usePagination from '@/hooks/usePagination'

const styles = {
    wrapper: {
        marginTop: '20px',
        py: '40px',
        px: '16px'
    },
    pagination: {
        marginTop: '80px',
        marginBottom: '10px',

        '.MuiPaginationItem-root': {
            color: '#fff',
            borderColor: theme => theme.color.nav,
        },

        '.MuiPagination-ul': {
            justifyContent: 'center'
        },
        '& .Mui-selected': {
            backgroundColor: (theme) => `${theme.color.nav} !important`
        },
        '& .Mui-selected:hover': {
            backgroundColor: (theme) => `${theme.color.nav} !important`
        }
    }
}

function MovieList({ movies = [], isLoading = false, maxPage = 1 }) {
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    const genres = useSelector(genresSelector)

    const [currentPage, onPageChange ] = usePagination()

    // navigate to movie detail page
    const handleClickMovie = useCallback((id) => {
        if (!id) return
        navigate(`/@${id}`)
    }, [])

    const handleClickGenre = useCallback((id) => {
        if (!id) return

        navigate(`/category/@${id}`)
    }, [])


    // get genre list
    useEffect(() => {
        dispatch(getGenres())
    }, [])

    // scroll to top when change page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [movies, isLoading])


    const skeletonList = (
        <Grid container rowSpacing={8} columnSpacing={{ lg: 8 }}>
            {Array(4)
                .fill(null)
                .map((item, idx) => (
                    <Grid sx={{ p: '0' }} key={idx} item xs={12} sm={6} lg={3}>
                        <MovieSkeleton />
                    </Grid>
                ))}
        </Grid>
    )

    const cardList = (
        <Grid container rowSpacing={7} columnSpacing={10}>
            {movies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} lg={3}>
                    <MovieCard
                        ids={{ movieId: movie.id, genreId: movie.genre_ids[0] }}
                        onClick={handleClickMovie}
                        onClickGenre={handleClickGenre}
                        score={movie.vote_average}
                        title={movie.title}
                        thumbnail={movie.poster_path}
                        genre={genres[movie.genre_ids[0]]}
                    />
                </Grid>
            ))}
        </Grid>
    )

    return (
        <Box sx={styles.wrapper}>
            {isLoading ? skeletonList : cardList}
            {!isLoading && (
                <Pagination
                    shape="rounded"
                    page={currentPage}
                    onChange={onPageChange}
                    sx={styles.pagination}
                    count={maxPage}
                />
            )}
        </Box>
    )
}

MovieList.propTypes = {
    maxPage: PropTypes.number,
    isLoading: PropTypes.bool,
    movies: PropTypes.array
}

export default memo(MovieList)
