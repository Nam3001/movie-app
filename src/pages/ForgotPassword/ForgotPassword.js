import { memo, useCallback, useState } from 'react'
import {
	Box,
	IconButton,
	Typography,
	CardMedia,
	CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { sendPasswordResetEmail } from 'firebase/auth'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'

import Button from '@/components/Button'
import InputField from '@/components/form-control/InputField'
import useToastMessage from '@/hooks/useToastMessage'
import config from '@/configs'
import logo from '@/assets/img/logo.png'
import { auth } from '@/services/firebaseConfig'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'

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
		'& button': {
			fontSize: '16px',
			fontWeight: '500',
			mt: 3,
			backgroundColor: (theme) => theme.color.heading
		}
	},
	userNotFound: {
		color: '#e92040',
		fontSize: '14px',
		mt: 1,
		ml: 1.5
	},
	loading: {
		color: '#fff',
		width: '15px !important',
		height: '15px !important'
	}
}

const ForgotPassword = () => {
	const navigate = useNavigate()

	// state
	const [userNotFound, setUserNotFound] = useState(false)
	const [loading, setLoading] = useState(false)

	const showToast = useToastMessage()

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Email không hợp lệ.')
			.required('Hãy điền email của bạn')
	})
	const yupResolver = useYupValidationResolver(validationSchema)
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			email: ''
		},
		resolver: yupResolver
	})

	const handleClickBack = useCallback(() => {
		navigate(-1)
		// eslint-disable-next-line
	}, [])

	const handleSendPasswordResetEmail = useCallback(
		async (values) => {
			if (!values) return

			try {
				if (userNotFound) setUserNotFound(false)
				if (!loading) setLoading(true)

				await sendPasswordResetEmail(auth, values?.email)
				navigate(config.routes.login)
				showToast('Kiểm tra hộp thư của bạn!', {
					variant: 'success',
					autoHideDuration: 5000
				})
			} catch (error) {
				if (error.code === 'auth/user-not-found') {
					setUserNotFound(true)
				} else {
					showToast(error.code, {
						variant: 'error',
						autoHideDuration: 3000
					})
				}
			} finally {
				setLoading(false)
			}
		},
		// eslint-disable-next-line
		[userNotFound, loading]
	)

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
				<form
					onSubmit={handleSubmit(handleSendPasswordResetEmail)}
					noValidate
				>
					<Box>
						<Controller
							control={control}
							name="email"
							render={({ field }) => (
								<InputField
									{...field}
									type="email"
									inputMode="email"
									sx={styles.inputField}
									placeholder="Địa chỉ email"
									pill
									invalid={!!errors.email}
									errorMessage={errors.email?.message}
								/>
							)}
						/>
					</Box>

					{userNotFound && (
						<Typography sx={styles.userNotFound}>
							Tài khoản không tồn tại
						</Typography>
					)}

					<Button
						color="warning"
						sx={styles.submitBtn}
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress sx={styles.loading} />
						) : (
							'Gửi mã'
						)}
					</Button>
				</form>
			</Box>
		</Box>
	)
}

export default memo(ForgotPassword)
