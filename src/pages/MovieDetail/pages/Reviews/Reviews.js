import { memo, useCallback, useState, useEffect, useMemo } from 'react'
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, MenuItem } from '@mui/material'
import queryString from 'query-string'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import avatarPlaceholder from '@/assets/img/avatar-placeholder.png'
import { BASE_URL_IMAGE } from '@/utils/constants/common'
import Truncate from '@/components/Truncate'
import Select from '@/components/Select'
import { sortByDate } from '@/utils/common'
import styles from './styles'

dayjs.extend(relativeTime)

const Reviews = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { reviews, setReviews } = useOutletContext()

    const params = queryString.parse(location.search)

    const initSort = useMemo(() => {
        if (!params.sort) return 'Ascending'
        return params.sort === 'asc' ? 'Ascending' : 'Descending'
    }, [params.sort])

    const [sortBy, setSortBy] = useState(initSort)

    // Sort reviews by date
    useEffect(() => {
        const newReviews = [...reviews]
        sortByDate({ arr: newReviews, order: params.sort, key: 'updated_at' })
        setReviews(newReviews)
    }, [params.sort, sortBy, reviews, setReviews])

    useEffect(() => {
        if (!params?.sort) {
            const queryParams = queryString.stringify({
                ...params,
                sort: 'asc'
            })

            if (params?.sort === 'asc') return

            navigate(
                {
                    pathname: location.pathname,
                    search: queryParams
                },
                { replace: true }
            )
        } else {
            const queryParams = queryString.stringify({
                ...params,
                sort: sortBy === 'Ascending' ? 'asc' : 'desc'
            })
            const { sort } = queryString.parse(queryParams)
            if (params.sort === sort) return
            navigate({
                pathname: location.pathname,
                search: queryParams
            })
        }
    }, [sortBy, location.pathname, params, navigate])

    // Handle select event
    const handleChangeOption = useCallback(
        (value) => {
            setSortBy(value)
        },
        []
    )
    const handleResetOption = useCallback(() => setSortBy('Ascending'), [])

    const setFallback = useCallback(
        (e) => {
            e.target.setAttribute('src', avatarPlaceholder)
        },
        []
    )

    if (reviews.length === 0)
        return <Typography sx={styles.content}>Không có review nào!</Typography>

    return (
        <>
            <Box sx={styles.selectContainer}>
                <Select
                    className="select"
                    onClear={handleResetOption}
                    selectValue={sortBy}
                    onChange={handleChangeOption}
                >
                    <MenuItem value="Ascending">Ascending</MenuItem>
                    <MenuItem value="Descending">Descending</MenuItem>
                </Select>
                <Typography className="label">Sort by date: </Typography>
            </Box>
            {reviews.map((review) => (
                <Box sx={styles.cast} key={review.id}>
                    <Box sx={styles.avatar}>
                        <img
                            src={
                                review?.author_details?.avatar_path
                                    ? `${BASE_URL_IMAGE}/${review?.author_details?.avatar_path}`
                                    : avatarPlaceholder
                            }
                            alt="avatar"
                            onError={setFallback}
                        />
                    </Box>
                    <Box sx={styles.text}>
                        <Typography sx={styles.name}>
                            {review?.author_details?.username}
                        </Typography>
                        <Truncate length={160} sx={styles.content}>
                            {review?.content}
                        </Truncate>
                        <Typography sx={styles.fromNow}>
                            {dayjs(review.updated_at).fromNow()}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}

Reviews.propTypes = {}

export default memo(Reviews)
