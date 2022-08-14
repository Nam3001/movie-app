import { useEffect, useState, useRef, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import Carousel from 'nuka-carousel'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { genresSelector } from '@/store/selectors'
import MovieCard from '@/components/MovieCard'
import movieApi from '@/utils/api/movieApi'
import Heading from '@/components/Heading'
import { createPathname } from '@/utils/common'
import config from '@/configs'

const RecommendsMovie = ({ movieId }) => {
    const navigate = useNavigate()

    const [slideAmount, setSlideAmount] = useState(4)

    const genres = useSelector(genresSelector)

    useEffect(() => {
        const handleSetSlideAmount = () => {
            if (window.innerWidth > 1024) setSlideAmount(4)
            else if (window.innerWidth <= 1024 && window.innerWidth > 768)
                setSlideAmount(3)
            else if (window.innerWidth <= 768 && window.innerWidth > 640)
                setSlideAmount(2)
            else setSlideAmount(1)
        }
        handleSetSlideAmount()

        window.addEventListener('resize', handleSetSlideAmount)
        return () => window.removeEventListener('resize', handleSetSlideAmount)
    }, [])

    const handleClickMovie = useCallback(
        (id) => {
            if (!id) return

            // movie detail pathname
            const parentPathname = createPathname(config.routes.movieDetail, id)

            // children route of movie detail
            // default is overall
            const pathname = `${parentPathname}/${config.routes.overall}`
            navigate(pathname)
        },
        [navigate]
    )

    const [list, setList] = useState([])
    useEffect(() => {
        ;(async () => {
            try {
                const res = await movieApi.getSimilarMovie(movieId)
                const data = res.data.results

                setList(data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [movieId])

    const nextBtn = <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
    const prevBtn = <ArrowBackIosNewIcon sx={{ fontSize: '18px' }} />
    const containerRef = useRef()

    if (!list) return null

    return (
        <Box>
            <Heading sx={{ textAlign: 'center', marginBottom: '20px' }}>
                có thể bạn cũng muốn xem
            </Heading>
            <Carousel
                innerRef={containerRef}
                style={{ paddingTop: '24px' }}
                wrapAround
                slidesToShow={slideAmount}
                swiping
                autoplay
                defaultControlsConfig={{
                    pagingDotsStyle: { display: 'none' },
                    nextButtonStyle: {
                        borderRadius: '5px',
                        marginRight: '10px'
                    },
                    prevButtonStyle: {
                        borderRadius: '5px',
                        marginLeft: '10px'
                    },
                    nextButtonText: nextBtn,
                    prevButtonText: prevBtn
                }}
            >
                {list.map((item) => (
                    <MovieCard
                        key={item.id}
                        score={item.vote_average}
                        title={item.title}
                        onClick={handleClickMovie}
                        thumbnail={item.poster_path}
                        genre={genres?.[item.genre_ids?.[0]]}
                        id={item.id}
                        isLazy={false}
                    />
                ))}
            </Carousel>
        </Box>
    )
}

RecommendsMovie.propTypes = {
    movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
}

export default memo(RecommendsMovie)
