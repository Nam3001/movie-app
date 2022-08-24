import { useState, useEffect, memo, useRef } from 'react'
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import InputField from '@/components/form-control/InputField'
import Button from '@/components/Button'
import { auth } from '@/services/firebaseConfig'
import PhoneNumberField from '@/components/form-control/PhoneNumberField'
import { signIn } from '@/store/authSlice'

const styles = {
    formContainer: {
        width: '360px',
        maxWidth: '98%',
        mt: 5
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
    },
    donHaveAccount: {
        color: (theme) => theme.color.nav,
        fontSize: '15px',
        textAlign: 'center',
        mt: 4,
        '& > a': {
            color: (theme) => theme.color.heading,
            textDecoration: 'none',
            fontWeight: 500
        }
    },
    forgotPassword: {
        cursor: 'pointer',
        color: (theme) => theme.color.heading,
        textAlign: 'center',
        mt: 1
    },
    loging: {
        color: '#fff',
        width: '15px !important',
        height: '15px !important'
    }
}

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loging, setLoging] = useState(false)

    const action = (snackbarId) => (
        <IconButton
            sx={{ color: '#fff' }}
            onClick={() => {
                closeSnackbar(snackbarId)
            }}
        >
            <CloseIcon />
        </IconButton>
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoging(true)
            const formData = new FormData(e.target)

            const email = formData.get('email')
            const password = formData.get('password')

            const credential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            // dispatch sign in action
            dispatch(signIn(credential.user))

            enqueueSnackbar('Đăng nhập thành công!', {
                variant: 'success',
                action,
                autoHideDuration: 3000
            })
            setTimeout(() => {
                navigate('/')
            }, [1000])
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'error',
                action,
                autoHideDuration: 10000
            })
        } finally {
            setLoging(false)
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Box sx={styles.formContainer}>
            <form onSubmit={handleSubmit} noValidate>
                <Box>
                    <InputField
                        onChange={handleEmailChange}
                        value={email}
                        type="email"
                        name="email"
                        inputMode="email"
                        sx={styles.inputField}
                        placeholder="Địa chỉ email"
                        pill
                    />
                    <InputField
                        onChange={handlePasswordChange}
                        value={password}
                        name="password"
                        inputMode="text"
                        sx={styles.inputField}
                        placeholder="Mật khẩu"
                        pill
                        type="password"
                    />
                </Box>

                <Button color="warning" sx={styles.submitBtn} type="submit">
                    {loging ? (
                        <CircularProgress sx={styles.loging} />
                    ) : (
                        'Đăng nhập'
                    )}
                </Button>
            </form>
            <Typography sx={styles.donHaveAccount}>
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
            </Typography>
            <Typography sx={styles.forgotPassword}>Quên mật khẩu?</Typography>
        </Box>
    )
}

export default memo(LoginForm)
