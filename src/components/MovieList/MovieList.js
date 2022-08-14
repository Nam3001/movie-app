import { useState, useEffect, useRef } from 'react'
import { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Typography, MenuItem, Pagination } from '@mui/material'
import { useSelector } from 'react-redux'
import queryString from 'query-string'

import movieApi from '@/utils/api/movieApi'
import Wrapper from '@/components/Wrapper'
import { MovieSkeleton } from '@/components/MovieCard'
import { genresSelector } from '@/store/selectors'
import usePagination from '@/hooks/usePagination'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'
import CardList from './CardList'

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
            borderColor: (theme) => theme.color.nav
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
    const [currentPage, onPageChange] = usePagination()
    const genres = useSelector(genresSelector)

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

    return (
        <Box sx={styles.wrapper}>
            {isLoading && skeletonList}
            {!isLoading && (
                <CardList
                    movies={movies}
                    isLoading={isLoading}
                    genres={genres}
                />
            )}

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
