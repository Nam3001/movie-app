import { memo, useState, useCallback } from 'react'
import LoginForm from './LoginForm'
import { Box, Typography, CardMedia, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@/components/Button'
import logo from '@/assets/img/logo.png'
import googleIcon from '@/assets/img/google.png'
import facebookIcon from '@/assets/img/facebook.png'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { auth } from '@/services/firebaseConfig'
import { signIn } from '@/store/authSlice'
import useToastMessage from '@/hooks/useToastMessage'

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
    signInMethod: {
        mt: 5,
        width: '320px',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    signInButton: {
        fontSize: '15px',
        py: '10px',
        px: {
            sm: '18px'
        },
        width: '98%',
        mt: 2,
        '&:hover': { color: '#333' }
    },
    btnContent: {
        display: 'flex',

        '& > img, & > svg': {
            width: '22px',
            height: '22px',
            mr: 1
        },
        '& > p': {
            m: 'auto',
            fontSize: '15px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }
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
    goBack: {
        position: 'absolute',
        paddingLeft: '20px',
        color: '#fff',
        left: 0,
        top: 0,
        width: '56px',
        height: '56px'
    }
}

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showToast = useToastMessage()

    // use to determine current position is sign in method or login form
    const [isLoginForm, setIsLoginForm] = useState(false)

    const [loging, setLoging] = useState(false)
    const [wrongPassword, setWrongPassword] = useState('')

    const handleClickBack = useCallback(() => {
        if (isLoginForm) {
            setIsLoginForm(false)
        } else {
            navigate(-1)
        }
    }, [isLoginForm])

    const handleLoginWithGoogle = useCallback(async () => {
        try {
            const googleProvider = new GoogleAuthProvider()
            const credential = await signInWithPopup(auth, googleProvider)

            // dispatch
            dispatch(signIn(credential.user))

            showToast('Đăng nhập thành công!', {
                variant: 'success',
                autoHideDuration: 3000
            })
            navigate('/')
        } catch (error) {
            showToast(error.code, {
                variant: 'error',
                autoHideDuration: 10000
            })
        }
    }, [])

    const handleLoginWithFacebook = useCallback(async () => {
        try {
            const facebookProvider = new FacebookAuthProvider()
            const credential = await signInWithPopup(auth, facebookProvider)

            // dispatch action
            dispatch(signIn(credential.user))

            showToast('Đăng nhập thành công!', {
                variant: 'success',
                autoHideDuration: 3000
            })

            navigate('/')
        } catch (error) {
            showToast(error.code, {
                variant: 'error',
                autoHideDuration: 10000
            })
        }
    }, [])

    const handleLoginWithPassword = useCallback(
        async (values) => {
            try {
                setLoging(true)
                if (wrongPassword) setWrongPassword(false)

                const email = values?.email
                const password = values?.password

                const credential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                // dispatch sign in action
                dispatch(signIn(credential.user))

                showToast('Đăng nhập thành công!', {
                    variant: 'success',
                    autoHideDuration: 3000
                })
                navigate('/')
            } catch (err) {
                if (err.code === 'auth/wrong-password') {
                    setWrongPassword(true)
                } else {
                    showToast(err.code, {
                        variant: 'error',
                        autoHideDuration: 10000
                    })
                }
            } finally {
                setLoging(false)
            }
        },
        [wrongPassword, loging]
    )

    return (
        <Box sx={styles.container}>
            <Box sx={styles.heading}>
                <IconButton sx={styles.goBack} onClick={handleClickBack}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography component="h1">Đăng nhập</Typography>
                <CardMedia sx={styles.logo} image={logo} component="img" />
            </Box>
            {/* sign in method */}
            {!isLoginForm && (
                <Box sx={styles.signInMethod}>
                    <Button
                        sx={styles.signInButton}
                        variant="outline"
                        color="light"
                        display="block"
                        pill
                        onClick={() => setIsLoginForm(true)}
                    >
                        <Box sx={styles.btnContent}>
                            <PermIdentityIcon />
                            <Typography>Sử dụng email / mật khẩu</Typography>
                        </Box>
                    </Button>
                    <Button
                        sx={styles.signInButton}
                        onClick={handleLoginWithGoogle}
                        variant="outline"
                        color="light"
                        display="block"
                        pill
                    >
                        <Box sx={styles.btnContent}>
                            <CardMedia component="img" image={googleIcon} />
                            <Typography>Tiếp tục với Google</Typography>
                        </Box>
                    </Button>
                    <Button
                        sx={styles.signInButton}
                        onClick={handleLoginWithFacebook}
                        variant="outline"
                        color="light"
                        display="block"
                        pill
                    >
                        <Box sx={styles.btnContent}>
                            <CardMedia component="img" image={facebookIcon} />
                            <Typography>Tiếp tục với Facebook</Typography>
                        </Box>
                    </Button>
                    <Typography sx={styles.donHaveAccount}>
                        Bạn chưa có tài khoản?{' '}
                        <Link to="/register">Đăng ký</Link>
                    </Typography>
                </Box>
            )}

            {/* login form */}
            {isLoginForm && (
                <LoginForm
                    onSubmit={handleLoginWithPassword}
                    loging={loging}
                    wrongPassword={!!wrongPassword}
                />
            )}
        </Box>
    )
}

export default memo(Login)
