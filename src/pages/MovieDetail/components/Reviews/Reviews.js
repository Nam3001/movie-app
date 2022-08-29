import { memo, useCallback, useState, useEffect, useMemo, useRef } from 'react'
import { useOutletContext, useLocation, useNavigate } from 'react-router-dom'
import { Box, Typography, MenuItem } from '@mui/material'
import queryString from 'query-string'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import avatarPlaceholder from '@/assets/img/avatar-placeholder.png'
import { BASE_URL_IMAGE } from '@/utils/constants/common'
import Truncate from '@/components/Truncate'
import Select from '@/components/Select'
import useLazyLoadImage from '@/hooks/useLazyLoadImage'
import { sortByDate } from '@/utils/common'
import styles from './styles'

dayjs.extend(relativeTime)

const Reviews = ({ reviews }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [reviewList, setReviewList] = useState(reviews)

    const params = queryString.parse(location.search)

    const [sortBy, setSortBy] = useState({
        label: 'Mới nhất',
        value: 'asc'
    })

    // Sort reviews by date
    useEffect(() => {
        if (reviewList.length === 0) return

        const newReviews = [...reviewList]
        const sortedReviews = sortByDate({
            arr: newReviews,
            order: sortBy.value,
            key: 'updated_at'
        })

        setReviewList(sortedReviews)
        // eslint-disable-next-line
    }, [sortBy.value])

    // Handle select event
    const handleChangeOption = useCallback((option) => {
        setSortBy(option)
    }, [])
    const handleResetOption = useCallback(
        () =>
            setSortBy({
                label: 'Mới nhất',
                value: 'asc'
            }),
        []
    )

    const setFallback = useCallback((e) => {
        e.target.setAttribute('src', avatarPlaceholder)
    }, [])

    const listRef = useRef(null)
    useLazyLoadImage(listRef)

    if (reviews.length === 0)
        return (
            <Typography sx={styles.emptyReview}>
                Không có review nào!
            </Typography>
        )

    return (
        <>
            <Box sx={styles.selectContainer}>
                <Select
                    className="select"
                    handleClear={handleResetOption}
                    selected={sortBy}
                    handleChange={handleChangeOption}
                >
                    <MenuItem value="asc">Mới nhất</MenuItem>
                    <MenuItem value="desc">Cũ nhất</MenuItem>
                </Select>
                <Typography className="label">Sort by date: </Typography>
            </Box>
            <Box ref={listRef} sx={styles.reviewList}>
                {reviewList.map((review) => (
                    <Box sx={styles.review} key={review.id}>
                        <Box sx={styles.avatar}>
                            <img
                                lazy-src={
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
            </Box>
        </>
    )
}

Reviews.propTypes = {}

export default memo(Reviews)
