import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {
    Box,
    CardMedia,
    Typography,
    Rating,
    LinearProgress
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'

import Tabs from '@/components/Tabs'
import config from '@/configs'
import Genre from '@/components/Genre'
import movieApi from '@/utils/api/movieApi'
import { BASE_URL_IMAGE } from '@/utils/constants/common'
import placeholderImage from '@/assets/img/placeholder.png'
import Wrapper from '@/components/Wrapper'
import styles from './styles'
import RecommendsMovie from '@/components/RecommendsMovie'

const Button = styled('button')((props) => ({
    cursor: 'pointer',
    border: 'none',
    padding: '12px 14px',
    backgroundColor:
        (props.color === 'primary' && '#3898ec') ||
        (props.color === 'danger' && '#e46466') ||
        '#ccc',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    '& + button': {
        marginLeft: '10px'
    },
    '&:hover': {
        opacity: 0.9
    }
}))

function MovieDetail() {
    const params = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const movieId = params.movieId
    const [movieInfo, setMovieInfo] = useState({})
    const [casts, setCasts] = useState([])
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                if (!isLoading) setIsLoading(true)

                const detailPromise = movieApi.getDetail(movieId)
                const castsPromise = movieApi.getCredits(movieId)
                const reviewsRes = movieApi.getReviews(movieId)

                const all = await Promise.all([
                    detailPromise,
                    castsPromise,
                    reviewsRes
                ])

                console.log('load data')

                setMovieInfo(all[0].data)
                setCasts(all[1].data.cast)
                setReviews(all[2].data.results)

                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        })()
        // eslint-disable-next-line
    }, [movieId])

    const backdropUrl = movieInfo.backdrop_path
        ? `url("${BASE_URL_IMAGE}${movieInfo.backdrop_path}")`
        : ''

    const formatedDate = dayjs(movieInfo?.release_date).format('DD/MM/YYYY')

    const outletContext = {
        movieInfo,
        casts,
        reviews,
        setCasts,
        setReviews,
        setMovieInfo
    }

    if (isLoading) return <LinearProgress sx={styles.progress} />

    return (
        <Box sx={{ paddingBottom: '50px' }}>
            <Box
                sx={styles.backdrop}
                style={{ backgroundImage: backdropUrl }}
            ></Box>
            <Wrapper>
                <Box sx={styles.movieIntro}>
                    <Box sx={styles.thumbnailContainer}>
                        <CardMedia
                            component="img"
                            src={
                                movieInfo.poster_path
                                    ? `${BASE_URL_IMAGE}${movieInfo.poster_path}`
                                    : placeholderImage
                            }
                            sx={styles.thumbnail}
                        />
                    </Box>
                    <Box sx={styles.main}>
                        <Typography sx={styles.title}>
                            {movieInfo?.title}
                        </Typography>
                        <Box sx={styles.info}>
                            <Rating
                                sx={styles.rating}
                                value={
                                    parseFloat(movieInfo.vote_average / 2) || 0
                                }
                                precision={0.1}
                                readOnly
                                emptyIcon={<StarIcon />}
                            />
                            <Genre sx={styles.genre}>
                                {movieInfo?.genres?.[0]?.name}
                            </Genre>
                            <Box sx={styles.releaseDay}>
                                <AccessTimeSharpIcon />
                                {movieInfo?.release_date && (
                                    <Typography>{formatedDate}</Typography>
                                )}
                            </Box>
                        </Box>
                        <Box sx={styles.control}>
                            <Button color="primary">Trailer</Button>
                            <Button color="danger">Xem Phim</Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.pageContent}>
                    <Tabs
                        tabs={[
                            { to: config.routes.overall, name: 'Overall' },
                            { to: config.routes.casts, name: 'Cast' },
                            { to: config.routes.reviews, name: 'Reviews' }
                        ]}
                    />

                    <Outlet context={outletContext} />
                </Box>
                    <RecommendsMovie movieId={movieId} />
            </Wrapper>
        </Box>
    )
}

MovieDetail.propTypes = {}

export default memo(MovieDetail)
