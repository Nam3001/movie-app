import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'

const styles = {
    wrapper: {
        p: {
            xs: '0 26px',
            lg: '0 16px'
        }
    },
    thumbnail: {
        bgcolor: alpha('#fff', 0.2),
        width: {
            xs: '200px',
            lg: '168px'
        },
        height: {
            xs: '300px',
            lg: '256px'
        },
        borderRadius: {
            xs: '8px',
            lg: '6px'
        },
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    rate: {
        width: '130px',
        bgcolor: alpha('#fff', 0.2),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '21px',
        marginBottom: '12px'
    },
    title: {
        bgcolor: alpha('#fff', 0.2),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        height: {
            xs: '28px',
            lg: '24px'
        }
    },
    genre: {
        bgcolor: alpha('#fff', 0.2),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '16px',
        height: '16px',
        width: '36%'
    }
}

const MovieSkeleton = () => {
    return (
        <Box sx={styles.wrapper}>
            <Skeleton
                variant="rectangular"
                sx={styles.thumbnail}
                animation="wave"
            />
            <Skeleton variant="text" sx={styles.rate} animation="wave" />
            <Skeleton variant="text" sx={styles.title} animation="wave" />
            <Skeleton
                variant="text"
                sx={styles.title}
                width="95%"
                animation="wave"
            />
            <Skeleton variant="text" sx={styles.genre} animation="wave" />
        </Box>
    )
}

MovieSkeleton.propTypes = {}

export default MovieSkeleton
