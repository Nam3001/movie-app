import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	IconButton,
	Box,
	CardMedia,
	Typography,
	MenuItem,
	CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector, useDispatch } from 'react-redux'
import { setDoc, doc, getDoc } from 'firebase/firestore'

import Button from '@/components/Button'
import { DEFAULT_FUNC, BASE_URL_IMAGE } from '@/utils/constants/common'
import Select from '@/components/Select'
import imagePlaceholder from '@/assets/img/placeholder.png'
import useToastMessage from '@/hooks/useToastMessage'
import { userInfoSelector } from '@/store/selectors'
import { db } from '@/services/firebaseConfig'
import SpinnerLoading from '@/components/SpinnerLoading'
import styles from './styles'
import { handleAddMovie, handleUpdateMovie, handleRemoveMovie } from './utils'

const BookmarkModal = ({
	open,
	movieInfo = {},
	handleCloseModal = DEFAULT_FUNC,
	bookmarkStatus = [],
	bookmarked,
	setIsBookmarked = DEFAULT_FUNC
}) => {
	const showToast = useToastMessage()
	// user infomation to save
	const userId = useSelector(userInfoSelector).uid

	// state
	const [saveOption, setSaveOption] = useState(bookmarkStatus[0])
	const movieThumbnail = BASE_URL_IMAGE + movieInfo?.poster_path
	const [fallback, setFallback] = useState('')
	const [loading, setLoading] = useState(false)

	const getFallback = useCallback(() => {
		setFallback(imagePlaceholder)
	}, [])

	const handleChangeOption = useCallback((option) => {
		setSaveOption(option)
	}, [])

	const onAdd = useCallback(() => {
		handleAddMovie({
			bookmarked,
			loading,
			setLoading,
			setIsBookmarked,
			handleCloseModal,
			userId,
			movieInfo,
			showToast,
			saveOption
		})
	}, [bookmarked, saveOption, userId])

	const onUpdate = useCallback(() => {
		handleUpdateMovie({
			bookmarked,
			loading,
			setLoading,
			setIsBookmarked,
			handleCloseModal,
			userId,
			movieInfo,
			showToast,
			saveOption
		})
	}, [bookmarked, saveOption, userId])

	const onRemove = useCallback(() => {
		handleRemoveMovie({
			bookmarked,
			loading,
			setLoading,
			setIsBookmarked,
			handleCloseModal,
			userId,
			movieInfo,
			showToast,
			saveOption
		})
	}, [bookmarked, saveOption, userId])

	return (
		<Dialog
			fullScreen
			transitionDuration={100}
			sx={styles.modal}
			open={open}
			onClose={handleCloseModal}
		>
			<DialogTitle id="alert-dialog-title">
				<IconButton
					size="large"
					onClick={handleCloseModal}
					sx={{
						position: 'absolute',
						right: 5,
						top: 5,
						color: (theme) => theme.palette.grey[500]
					}}
				>
					<CloseIcon />
				</IconButton>
				<Typography sx={styles.title}>Thêm vào danh sách</Typography>
			</DialogTitle>
			<DialogContent sx={styles.content}>
				<Box sx={styles.thumbnail}>
					<CardMedia
						component="img"
						image={fallback || movieThumbnail}
						onError={getFallback}
					/>
				</Box>
				<Box sx={styles.mainContent}>
					<Typography sx={styles.movieName}>
						{movieInfo.title}
					</Typography>
					<Typography sx={styles.label}>Danh sách:</Typography>
					<Box sx={{ width: '260px' }}>
						<Select
							handleChange={handleChangeOption}
							selected={saveOption}
						>
							{bookmarkStatus.map((option, idx) => (
								<MenuItem
									key={idx}
									value={option.value}
									sx={styles.option}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</Box>
				</Box>
			</DialogContent>
			{bookmarked && (
				<DialogActions>
					{loading ? (
						<SpinnerLoading sx={styles.loading} />
					) : (
						<>
							<Button
								disabled={loading}
								sx={styles.btn}
								onClick={onRemove}
								inline
							>
								Xóa
							</Button>
							<Button
								disabled={loading}
								sx={styles.btn}
								onClick={onUpdate}
								inline
							>
								Cập nhật
							</Button>
						</>
					)}
				</DialogActions>
			)}
			{!bookmarked && (
				<DialogActions>
					{loading ? (
						<SpinnerLoading sx={styles.loading} />
					) : (
						<Button
							disabled={loading}
							sx={styles.btn}
							onClick={onAdd}
							autoFocus
						>
							Lưu
						</Button>
					)}
				</DialogActions>
			)}
		</Dialog>
	)
}

BookmarkModal.propTypes = {
	open: PropTypes.bool,
	movieInfo: PropTypes.object,
	handleClose: PropTypes.func,
	bookmarkStatus: PropTypes.array,
	bookmarked: PropTypes.bool,
	setIsBookmarked: PropTypes.func
}

export default BookmarkModal
