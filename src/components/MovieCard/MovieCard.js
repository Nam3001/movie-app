import { useState, memo, useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Card, CardHeader } from '@mui/material'
import { CardContent, Rating, CardMedia } from '@mui/material'
import { lazy, Suspense } from 'react'
import StarIcon from '@mui/icons-material/Star'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import clsx from 'clsx'

import Genre from '@/components/Genre'
import { BASE_URL_IMAGE, DEFAULT_FUNC } from '@/utils/constants/common'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'

const LazyRating = lazy(() => import('@mui/material/Rating'))

const styles = {
    thumbnailWrapper: {
        maxWidth: '100%',
        margin: 'auto',
        position: 'relative',
        backgroundColor: '#212529',
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
        }
    },
    thumbnail: {
        borderRadius: {
            xs: '8px',
            lg: '6px'
        },
        width: '100%',
        height: '100%',
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
        alignItems: 'center',
        height: '18px'
    },
    rating: {
        '& span + span': {
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

const MovieCard = (props) => {
    const { score = 0, title } = props
    const { genre, id, onClick = DEFAULT_FUNC } = props
    let { thumbnail } = props

    const [fallback, setFallback] = useState(false)

    thumbnail &&= BASE_URL_IMAGE + thumbnail

    // set default thumbnail when not pass thumbnail prop
    thumbnail ||= thumbnailPlaceholder

    const rating = useMemo(() => parseFloat(score) / 2, [score])

    const handleClick = useCallback(() => {
        onClick(id)
    }, [id])

    return (
        <Box sx={{ px: 2 }}>
            <Box onClick={handleClick} sx={styles.thumbnailWrapper}>
                <CardMedia
                    component="img"
                    className="thumbnail"
                    image={thumbnail || thumbnailPlaceholder}
                    sx={styles.thumbnail}
                />
                <Box sx={styles.score}>{score.toFixed(1)}</Box>
            </Box>
            <Box className="rate" sx={styles.ratingWrapper}>
                <Suspense
                    fallback={
                        <Rating
                            sx={styles.rating}
                            value={0}
                            readOnly
                            emptyIcon={<StarIcon />}
                        />
                    }
                >
                    <LazyRating
                        sx={styles.rating}
                        value={rating}
                        readOnly
                        emptyIcon={<StarIcon />}
                    />
                </Suspense>
            </Box>
            <Typography
                onClick={handleClick}
                sx={styles.title}
                variant="h5"
                component="p"
            >
                {title}
            </Typography>
            <Genre>{genre}</Genre>
        </Box>
    )
}

MovieCard.propTypes = {
    id: PropTypes.number,
    score: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    onClick: PropTypes.func,
    genre: PropTypes.string,
    thumbnail: PropTypes.string
}

export default memo(MovieCard)
