import { useState, useEffect, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import MovieCard, { MovieSkeleton } from '@/components/MovieCard'
import Wrapper from '@/components/Wrapper'
import { Box, Grid, Typography, MenuItem, Pagination } from '@mui/material'
import Select from '@/components/Select'
import movieApi from '@/utils/api/movieApi'

const styles = {
    wrapper: {
        marginTop: '20px',
        py: '40px',
        px: '16px'
    },
    heading: {
        color: (theme) => theme.color.heading,
        fontSize: '34px',
        textTransform: 'uppercase',
        fontWeight: 500,
        pb: '60px',
        textAlign: {
            xs: 'center',
            lg: 'left'
        }
    },
    pagination: {
        marginTop: '80px',
        marginBottom: '10px',

        '.MuiPaginationItem-root': {
            color: '#fff'
        },

        '.MuiPagination-ul': {
            justifyContent: 'center'
        },
        '.Mui-selected': {
            backgroundColor: (theme) => theme.color.primary.light
        },
        '.Mui-selected:hover': {
            backgroundColor: (theme) => theme.color.primary.light
        }
    }
}

function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const res = await movieApi.getAll({ page: 400 })
                setIsLoading(false)
                setMovies(res.data.results)
            } catch (err) {
                throw new Error(err)
            }
        })()
    }, [])

    const handleClickCard = () => {}
    const handleClickGenre = () => {}

    const skeletonList = (
        <Grid container rowSpacing={8} columnSpacing={{ lg: 10 }}>
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
        <Grid container rowSpacing={8} columnSpacing={{ lg: 10 }}>
            {movies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} lg={3}>
                    <MovieCard
                        score={movie.vote_average}
                        title={movie.title}
                        thumbnail={movie.poster_path}
                        genre="Actions"
                    />
                </Grid>
            ))}
        </Grid>
    )

    return (
        <Wrapper>
            <Box sx={styles.wrapper}>
                <Typography sx={styles.heading} variant="h1" component="p">
                    phim mới cập nhật
                </Typography>
                {isLoading ? skeletonList : cardList}
                {!isLoading && (
                    <Pagination sx={styles.pagination} count={500} />
                )}
            </Box>
        </Wrapper>
    )
}

Home.propTypes = {}

export default Home
