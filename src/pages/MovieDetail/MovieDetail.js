import { useState, useEffect, memo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import { createPathname } from '@/utils/common'
import config from '@/configs'
import Genre from '@/components/Genre'
import movieApi from '@/utils/api/movieApi'
import { BASE_URL_IMAGE } from '@/utils/constants/common'
import placeholderImage from '@/assets/img/placeholder.png'
import Wrapper from '@/components/Wrapper'
import styles from './styles'
import RecommendsMovie from '@/components/RecommendsMovie'
import Reviews from './components/Reviews'
import Overall from './components/Overall'
import Casts from './components/Casts'
import Button from '@/components/Button'

function MovieDetail() {
    const params = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const movieId = params.movieId
    const [movieInfo, setMovieInfo] = useState({})
    const [casts, setCasts] = useState([])
    const [reviews, setReviews] = useState([])

    const [tabs, setTabs] = useState([
        { name: 'Overall', active: true, component: Overall },
        { name: 'Casts', active: false, component: Casts },
        { name: 'Reviews', active: false, component: Reviews }
    ])

    const handleClickTab = useCallback(
        (name) => {
            if (!name) return
            const newTabs = Array.from(tabs)

            for (let tab of newTabs) {
                if (tab.name === name) {
                    for (let t of newTabs) {
                        if (t.active) t.active = false
                    }
                    tab.active = true
                    break
                }
            }
            setTabs(newTabs)
        },
        [tabs]
    )

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

    const handleClickMovie = useCallback((id) => {
        if (!id) return

        // movie detail pathname
        const pathname = createPathname(config.routes.movieDetail, id)
        navigate(pathname)
    }, [])

    if (isLoading) return <LinearProgress sx={styles.progress} />

    const tabData = {
        movieInfo,
        casts,
        reviews,
        setCasts,
        setReviews,
        setMovieInfo
    }

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
                            <Button color="info">Trailer</Button>
                            <Button color="danger">Xem Phim</Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.pageContent}>
                    <Tabs tabs={tabs} onClick={handleClickTab} />
                    {tabs.map((tab) => {
                        const Component = tab.component
                        if (tab.active)
                            return <Component key={tab.name} data={tabData} />
                    })}
                </Box>
                <RecommendsMovie movieId={movieId} onClick={handleClickMovie} />
            </Wrapper>
        </Box>
    )
}

MovieDetail.propTypes = {}

export default memo(MovieDetail)
