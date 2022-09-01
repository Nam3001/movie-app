import React, { memo, useState, useCallback, useEffect } from 'react'
import {
	CardMedia,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Typography,
	IconButton,
	Box,
	InputLabel,
	Avatar
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'

import { updateAvatar } from '@/store/authSlice'
import { userInfoSelector } from '@/store/selectors'
import SpinnerLoading from '@/components/SpinnerLoading'
import avatarPlaceholder from '@/assets/img/avatar-placeholder.png'
import Button from '@/components/Button'
import useToastMessage from '@/hooks/useToastMessage'
import { storage, auth } from '@/services/firebaseConfig'

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center'
	},
	avatar: {
		borderRadius: '50%',
		cursor: 'pointer',
		overflow: 'hidden',
		width: '50px',
		width: '50px',
		aspectRatio: '1/1',
		mb: 1
	},
	modal: {
		backdropFilter: 'blur(4px)',
		'& .MuiDialog-container': {
			alignItems: 'center !important'
		},
		'& .MuiPaper-root': {
			borderRadius: {
				xs: 0,
				sm: '10px !important'
			},
			p: 1,
			backgroundColor: (theme) => theme.color.primary.light,
			width: {
				xs: '100vw',
				md: '866px'
			},
			height: {
				xs: '100vh',
				md: '560px'
			},
			maxWidth: {
				xs: '100vw',
				sm: '95vw'
			},
			maxHeight: {
				xs: '100vh',
				sm: '95vh'
			}
		}
	},
	preview: {
		borderRadius: '50%',
		width: '130px',
		height: '130px',
		maxWidth: '80%',
		maxHeight: '80%',
		aspectRatio: '1/1',
		mx: 'auto',
		my: 2
	},
	description: {
		color: '#fff',
		textAlign: 'center'
	},
	imageInput: {
		position: 'absolute',
		left: '50%',
		transform: 'translateX(-50%)',
		mt: 5,
		'& .btn-file': {
			p: '10px',
			color: '#fff',
			cursor: 'pointer',
			borderRadius: '6px',
			fontSize: '16px',
			backgroundColor: (theme) => theme.color.heading,
			borderColor: (theme) => theme.color.heading,
			'&:hover': {
				opacity: 0.9
			}
		}
	},
	button: {
		'& button': {
			backgroundColor: (theme) => theme.color.heading,
			borderColor: (theme) => theme.color.heading
		}
	},
	loading: {
		color: (theme) => theme.color.heading,
		width: '20px !important',
		height: '20px !important'
	}
}

const AvatarModifier = ({ imageUrl, sx }) => {
	const dispatch = useDispatch()

	// state
	const [openModal, setOpenModal] = useState(false)
	const [fallback, setFallback] = useState('')
	const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)

	const userId = useSelector(userInfoSelector)?.uid

	const showToast = useToastMessage()

	const handleError = useCallback(() => {
		setFallback(avatarPlaceholder)
	}, [])

	const handleShowUploadModal = useCallback(() => {
		setOpenModal(true)
	}, [])

	const handleCloseModal = useCallback((e) => {
		setImage({})
		setOpenModal(false)
	}, [])

	const handleChangeFile = useCallback((e) => {
		const file = e.target.files[0]
		if (!file) {
			setImage({})
			return
		}

		const MAX_SIZE = 1024 * 1000 //1mb
		if (file.size <= MAX_SIZE) {
			const preview = URL.createObjectURL(file)
			setImage({
				preview,
				file
			})
		} else {
			showToast('Ảnh đã chọn quá lớn', {
				variant: 'error',
				autoHideDuration: 3000
			})
		}
		// reset file value
		e.target.value = null
	}, [])

	useEffect(() => {
		return () => {
			if (image.preview) URL.revokeObjectURL(image.preview)
		}
	}, [image])

	const handleUploadAvatar = useCallback(async () => {
		if (!image.file) {
			showToast('Bạn chưa chọn hình', {
				variant: 'error',
				autoHideDuration: 3000
			})
			return
		}

		try {
			if (!loading) setLoading(true)

			// storage ref
			const storageRef = ref(storage, userId)

			const snapshot = await uploadBytes(storageRef, image.file)
			const photoURL = await getDownloadURL(storageRef)

			const user = auth.currentUser
			await updateProfile(user, {
				photoURL
			})

			dispatch(updateAvatar(photoURL))
			setLoading(false)
			setOpenModal(false)
			showToast('Cập nhật thành công!', {
				variant: 'success',
				autoHideDuration: 3000
			})
		} catch (error) {
			showToast(error.code, {
				variant: 'error',
				autoHideDuration: 3000
			})
		}
	}, [image, userId])

	return (
		<Box sx={styles.container}>
			{userId && (
				<CardMedia
					className="avatar-img"
					sx={styles.avatar}
					component="img"
					image={fallback || imageUrl}
					onError={handleError}
					onClick={handleShowUploadModal}
				/>
			)}
			<Dialog
				fullScreen
				transitionDuration={100}
				sx={styles.modal}
				open={openModal}
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
					<Typography sx={styles.title}></Typography>
				</DialogTitle>
				<DialogContent>
					<CardMedia
						sx={styles.preview}
						component="img"
						image={fallback || image.preview || imageUrl}
						onError={handleError}
						onClick={handleShowUploadModal}
					/>
					<Typography sx={styles.description}>
						Preview Avatar
					</Typography>
					<Box sx={styles.imageInput}>
						<InputLabel htmlFor="image-input" className="btn-file">
							Chọn ảnh
						</InputLabel>

						<input
							id="image-input"
							type="file"
							accept="image/*"
							onChange={handleChangeFile}
							hidden
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					{loading ? (
						<SpinnerLoading sx={styles.loading} />
					) : (
						<Button onClick={handleUploadAvatar} sx={styles.button}>
							Lưu
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</Box>
	)
}

AvatarModifier.propTypes = {
	imageUrl: PropTypes.string,
	sx: PropTypes.object
}

export default memo(AvatarModifier)
