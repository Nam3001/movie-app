import { useCallback, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'

import config from '@/configs'
import MovieCard from '@/components/MovieCard'
import { createPathname } from '@/utils/common'
import useLazyLoadImage from '@/hooks/useLazyLoadImage'

function CardList({ movies = [], isLoading = true, genres }) {
    const navigate = useNavigate()

    // navigate to movie detail page
    const handleClickMovie = useCallback(
        (id) => {
            if (!id) return

            // movie detail pathname
            const pathname = createPathname(config.routes.movieDetail, id)
            navigate(pathname)
        },
        [navigate]
    )

    // lazy loading image
    const movieListRef = useRef()
    useLazyLoadImage(movieListRef, isLoading)

    return (
        <Grid ref={movieListRef} container rowSpacing={7} columnSpacing={10}>
            {movies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} lg={3}>
                    <MovieCard
                        id={movie.id}
                        onClick={handleClickMovie}
                        score={movie.vote_average}
                        title={movie.title}
                        thumbnail={movie.poster_path}
                        genre={genres[movie.genre_ids[0]]}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

CardList.propTypes = {
    movies: PropTypes.array
}

export default memo(CardList)
