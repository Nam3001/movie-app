import { useState, useEffect, memo, useCallback, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {
    Box,
    CardMedia,
    Typography,
    Rating,
    LinearProgress,
    IconButton
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import clsx from 'clsx'

import checkeFollowedMovie from '@/utils/checkFollowedMovie'
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
import BookmarkModal from '@/components/BookmarkModal'
import { loggedSelector, userInfoSelector } from '@/store/selectors'
import { db } from '@/services/firebaseConfig'

function MovieDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const logged = useSelector(loggedSelector)
    const userId = useSelector(userInfoSelector).uid

    const [isLoading, setIsLoading] = useState(true)
    const movieId = params.movieId
    const [movieInfo, setMovieInfo] = useState({})
    const [casts, setCasts] = useState([])
    const [reviews, setReviews] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)

    const bookmarkStatus = config.bookmarkOptions
    const panes = useMemo(() => {
        return [
            {
                header: 'Overall',
                render: () => <Overall movieInfo={movieInfo} />
            },
            { header: 'Casts', render: () => <Casts casts={casts} /> },
            {
                header: 'Reviews',
                render: () => <Reviews reviews={reviews} />
            }
        ]
    }, [casts, reviews, movieInfo])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        ;(async () => {
            try {
                setIsFollowed(false)
                if (!userId) return

                const docRef = doc(db, 'bookmarks', userId)
                const docSnap = await getDoc(docRef)

                const followedIds = docSnap.data()?.movieIds
                if (!followedIds) return

                const followed = followedIds?.includes(movieInfo?.id)
                setIsFollowed(followed)
            } catch (error) {
                console.log(error.message)
            }
        })()
    }, [userId, movieInfo])

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

    const [openBookmarkModal, setOpenBookmarkModal] = useState(false)

    const handleClickBookmark = useCallback(() => {
        if (logged) {
            setOpenBookmarkModal(true)
        } else {
            navigate(config.routes.login)
        }
    }, [logged])

    const handleHideBookmarkModal = useCallback(() => {
        setOpenBookmarkModal(false)
    }, [])

    const setIsBookmarked = useCallback((value) => {
        setIsFollowed(value)
    }, [])

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
                            <Button color="info">Trailer</Button>
                            <Button color="danger">Xem Phim</Button>
                            <IconButton
                                onClick={handleClickBookmark}
                                size="large"
                                sx={styles.bookmarkBtn}
                                className={clsx({ followed: isFollowed })}
                            >
                                <BookmarkBorderOutlinedIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box sx={styles.pageContent}>
                    <Tabs panes={panes} />
                </Box>
                <RecommendsMovie movieId={movieId} onClick={handleClickMovie} />
            </Wrapper>
            <BookmarkModal
                movieInfo={movieInfo}
                open={openBookmarkModal}
                bookmarkStatus={bookmarkStatus}
                handleCloseModal={handleHideBookmarkModal}
                bookmarked={isFollowed}
                setIsBookmarked={setIsBookmarked}
            />
        </Box>
    )
}

MovieDetail.propTypes = {}

export default memo(MovieDetail)
