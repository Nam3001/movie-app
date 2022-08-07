import React, { useState, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Rating
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'

const styles = {
    thumbnailWrapper: {
        maxWidth: '100%',
        margin: 'auto',
        position: 'relative'
    },
    thumbnail: {
        visibility: 'hidden',
        borderRadius: {
            xs: '8px',
            lg: '6px'
        },
        width: {
            xs: '200px',
            lg: '168px'
        },
        height: {
            xs: '300px',
            lg: '256px'
        },
        objectFit: 'cover',
        cursor: 'pointer',
        margin: 'auto',
        '&:hover': {
            opacity: 0.8
        }
    },
    ratingWrapper: {
        mt: 2.7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rating: {
        '.MuiRating-decimal + .MuiRating-decimal': {
            ml: '3px'
        },
        '& svg': {
            fontSize: {
                xs: '18px',
                lg: '16px'
            }
        },
        '& .MuiRating-icon': {
            color: '#efce4a'
        },
        '& .MuiRating-iconEmpty': {
            color: '#848d93'
        }
    },
    title: {
        color: '#fff',
        fontSize: {
            xs: '23px',
            lg: '20px'
        },
        lineHeight: {
            xs: '40px',
            lg: '30px'
        },
        fontWeight: 600,
        textAlign: 'center',
        mb: 0.6,
        width: 'fit-content',
        margin: '8px auto',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',

        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    },
    genre: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        textDecoration: 'underline',
        cursor: 'pointer',
        color: (theme) => theme.color.nav,
        '& .MuiTypography-root, & svg': {
            fontSize: '13px'
        },

        '&:hover': {
            color: '#ccc'
        }
    },
    score: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -36%)',
        margin: '0 auto',
        padding: '9px 0',
        width: '40px',
        borderRadius: 10,
        backgroundColor: (theme) => theme.color.heading,
        textAlign: 'center',
        color: '#fff',
        fontSize: '14px',
        lineHeight: '14px'
    }
}

const DEFAULT_FUNC = () => {}

const MovieCard = ({
    ids,
    score = 0,
    title,
    onClick = DEFAULT_FUNC,
    onClickGenre = DEFAULT_FUNC,
    genre,
    thumbnail
}) => {
    const [fallback, setFallback] = useState(false)

    // set base url for thumbnail url
    const thumbnailBaseURL = 'https://image.tmdb.org/t/p/original'
    thumbnail &&= thumbnailBaseURL + thumbnail

    // set default thumbnail when not pass thumbnail prop
    thumbnail ||= thumbnailPlaceholder

    const rating = parseFloat(score) / 2

    const handleClickMovie = useCallback(() => {
        if (!ids?.movieId) return
        onClick(ids?.movieId)
    }, [ids?.movieId])

    const handleClickGenre = useCallback(() => {
        if (!ids?.genreId) return
        onClickGenre(ids?.genreId)
    }, [ids?.genreId])

    return (
        <Box sx={{ px: 2 }}>
            <Box sx={styles.thumbnailWrapper}>
                <CardMedia
                    onClick={handleClickMovie}
                    component="img"
                    className="thumbnail"
                    lazy-src={thumbnail}
                    sx={styles.thumbnail}
                />
                <Box sx={styles.score}>{score.toFixed(1)}</Box>
            </Box>
            <Box className="rate" sx={styles.ratingWrapper}>
                <Rating
                    sx={styles.rating}
                    value={rating}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarIcon />}
                />
            </Box>
            <Typography
                onClick={onClick}
                sx={styles.title}
                variant="h5"
                component="p"
            >
                {title}
            </Typography>
            <Box onClick={handleClickGenre} sx={styles.genre}>
                <LocalOfferIcon />
                <Typography
                    sx={{ marginLeft: '4px' }}
                    component="p"
                    variant="body2"
                >
                    {genre}
                </Typography>
            </Box>
        </Box>
    )
}

MovieCard.propTypes = {
    ids: PropTypes.objectOf(PropTypes.number),
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    onClick: PropTypes.func,
    onClickGenre: PropTypes.func,
    genre: PropTypes.string,
    thumbnail: PropTypes.string
}

export default memo(MovieCard)
