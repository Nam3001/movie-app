import { memo, useCallback, useState } from 'react'
import { Box, IconButton, Typography, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { sendPasswordResetEmail } from 'firebase/auth'

import Button from '@/components/Button'
import InputField from '@/components/form-control/InputField'
import useToastMessage from '@/hooks/useToastMessage'
import config from '@/configs'
import logo from '@/assets/img/logo.png'
import { auth } from '@/services/firebaseConfig'

const styles = {
	container: {
		bgcolor: (theme) => theme.color.primary.light,
		width: '600px',
		maxWidth: '90vw',
		height: '580px',
		maxHeight: '94vh',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflowY: 'auto',
		borderRadius: '10px',
		py: '40px',
		px: {
			xs: '12px',
			sm: '30px'
		},
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	formContainer: {
		width: '360px',
		maxWidth: '98%',
		mt: 4
	},
	heading: {
		'& h1': {
			color: '#fff',
			fontSize: '28px',
			textAlign: 'center',
			fontWeight: '500'
		},
		'& img': {
			mx: 'auto'
		}
	},
	logo: {
		width: '150px',
		mt: 2
	},
	goBack: {
		position: 'absolute',
		paddingLeft: '20px',
		color: '#fff',
		left: 0,
		top: 0,
		width: '56px',
		height: '56px'
	},
	inputField: {
		width: '100%',
		mt: 2
	},
	submitBtn: {
		width: '100%',
		fontSize: '16px',
		fontWeight: '500',
		mt: 4,
		backgroundColor: (theme) => theme.color.heading
	}
}

const ForgotPassword = () => {
	const navigate = useNavigate()

	const showToast = useToastMessage()

	const [email, setEmail] = useState('')

	const handleChangeEmail = useCallback((e) => {
		setEmail(e.target.value)
	}, [])

	const handleClickBack = useCallback(() => {
		navigate(-1)
		 // eslint-disable-next-line
	}, [])

	const handleSendPasswordResetEmail = useCallback(async () => {
		try {
			navigate(config.routes.login)
			showToast('Kiểm tra hộp thư của bạn!', {
				variant: 'success',
				autoHideDuration: 5000
			})
			await sendPasswordResetEmail(auth, email)
		} catch (error) {
			showToast(error.code, {
				variant: 'error',
				autoHideDuration: 3000
			})
		}
		 // eslint-disable-next-line
	}, [email])

	return (
		<Box sx={styles.container}>
			<Box sx={styles.heading}>
				<IconButton sx={styles.goBack} onClick={handleClickBack}>
					<ArrowBackIosIcon />
				</IconButton>
				<Typography component="h1">Quên mật khẩu</Typography>
				<CardMedia sx={styles.logo} image={logo} component="img" />
			</Box>
			<Box sx={styles.formContainer}>
				<form onSubmit={handleSendPasswordResetEmail} noValidate>
					<Box>
						<InputField
							name="email"
							type="email"
							inputMode="email"
							sx={styles.inputField}
							placeholder="Địa chỉ email"
							value={email}
							onChange={handleChangeEmail}
							pill
						/>
					</Box>

					<Button color="warning" sx={styles.submitBtn} type="submit">
						Gửi mã
					</Button>
				</form>
			</Box>
		</Box>
	)
}

export default memo(ForgotPassword)
