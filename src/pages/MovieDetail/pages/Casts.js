import { memo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'

import avatarPlaceholder from '@/assets/img/avatar-placeholder.png'
import { BASE_URL_IMAGE } from '@/utils/constants/common'
import useLazyLoadImage from '@/hooks/useLazyLoadImage'

const styles = {
    castList: {
        display: 'flex',
        flexFlow: 'row wrap',
        m: 'auto',
        maxHeight: '800px',
        overflow: 'auto'
    },
    cast: {
        flex: {
            xs: '0 0 100%',
            sm: '0 0 50%'
        },
        display: 'flex',
        mt: 4
    },
    avatar: {
        width: '70px',
        height: '70px',
        flex: '0 0 70px',
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            visibility: 'hidden'
        }
    },
    text: {
        mr: 4
    },
    name: {
        fontSize: '20px',
        color: (theme) => theme.color.heading,
        ml: '20px'
    },
    role: {
        ml: '20px',
        fontSize: '18px',
        color: '#fff'
    },
    emptyCast: {
        ml: '20px',
        mt: '24px',
        fontSize: '18px',
        color: '#fff',
        maxHeight: '360px',
        overflow: 'auto',
        paddingRight: '10px',
        width: '100%',
        textAlign: 'center'
    }
}

const Casts = () => {
    const { casts } = useOutletContext()

    const listRef = useRef()

    useLazyLoadImage(listRef)

    if (casts.length === 0)
        return (
            <Typography sx={styles.emptyReview}>Not have any cast!</Typography>
        )

    return (
        <Box sx={{ paddingTop: '10px' }}>
            <Box sx={styles.castList} ref={listRef}>
                {casts.map((cast) => (
                    <Box sx={styles.cast} key={cast.cast_id}>
                        <Box sx={styles.avatar}>
                            <img
                                alt="avatar"
                                lazy-src={
                                    cast.profile_path
                                        ? `${BASE_URL_IMAGE}/${cast.profile_path}`
                                        : avatarPlaceholder
                                }
                            />
                        </Box>
                        <Box sx={styles.text}>
                            <Typography sx={styles.name}>
                                {cast.name}
                            </Typography>
                            {cast?.character && (
                                <Typography sx={styles.role}>
                                    as {cast.character}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default memo(Casts)

// lazy route
