import React, { useEffect, useState, memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { useParams, useOutletContext } from 'react-router-dom'
import dayjs from 'dayjs'

import movieApi from '@/utils/api/movieApi'
import Truncate from '@/components/Truncate'

const styles = {
    container: {
        width: '75%',
        mx: 'auto'
    },
    heading: {
        color: (theme) => theme.color.heading,
        fontSize: '32px',
        fontWeight: '400',
        my: 4
    },
    overview: {
        maxWidth: '600px',
        color: (theme) => theme.color.nav,
        fontSize: '18px',
        mt: 2,
        lineHeight: 1.5
    },
    overviewTitle: {
        color: '#fff',
        fontSize: '30px'
    },
    detailTitle: {
        color: '#fff',
        fontSize: '30px',
        mt: 4
    },
    detail: {
        color: (theme) => theme.color.nav,
        fontSize: '18px',
        lineHeight: 1.5,
        mt: 1.5
    }
}

const Overall = () => {
    const params = useParams()
    const movieId = params.movieId

    const { movieInfo } = useOutletContext()

    const formatedDate = useMemo(() => {
        if (!movieInfo?.release_date) return ''

        return dayjs(movieInfo?.release_date).format('DD/MM/YYYY')
    }, [movieInfo])

    if (Object.keys(movieInfo).length === 0) return null

    return (
        <Box sx={styles.container}>
            <Typography sx={styles.heading} variant="h1" component="p">
                {`Review Phim ${movieInfo?.title}`}
            </Typography>
            <Box>
                <Typography sx={styles.overviewTitle}>Nội dung phim</Typography>
                <Truncate sx={styles.overview} length={150}>
                    {movieInfo?.overview}
                </Truncate>
            </Box>
            <Typography sx={styles.detailTitle}>Chi tiết</Typography>
            <Box sx={styles.detail}>
                <Typography>
                    Trạng thái:{' '}
                    <Typography component="span">{movieInfo?.status}</Typography>
                </Typography>
                <Typography>
                    Ngày phát hành:{' '}
                    <Typography component="span">{formatedDate}</Typography>
                </Typography>
            </Box>
        </Box>
    )
}

Overall.propTypes = {}

export default memo(Overall)
