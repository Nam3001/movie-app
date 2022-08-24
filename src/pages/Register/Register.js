import { memo, useState } from 'react'
import { Box, Typography, CardMedia, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector, useDispatch } from 'react-redux'

import RegisterForm from './RegisterForm'
import Button from '@/components/Button'
import logo from '@/assets/img/logo.png'
import googleIcon from '@/assets/img/google.png'
import facebookIcon from '@/assets/img/facebook.png'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { auth } from '@/services/firebaseConfig'
import { signIn } from '@/store/authSlice'

const styles = {
    container: {
        bgcolor: (theme) => theme.color.primary.light,
        width: '600px',
        maxWidth: '90vw',
        minHeight: '480px',
        maxHeight: '100vh',
        position: 'absolute',
        left: '50%',
        top: '50%',
        overflow: 'auto',
        transform: 'translate(-50%, -50%)',
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
    registerMethod: {
        mt: 4,
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
    },
    hadAccount: {
        color: (theme) => theme.color.nav,
        fontSize: '15px',
        textAlign: 'center',
        mt: 4,
        '& > a': {
            color: (theme) => theme.color.heading,
            textDecoration: 'none',
            fontWeight: 500
        }
    }
}

function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    // use to determine current position is sign in method or login form
    const [isRegisterForm, setIsRegisterForm] = useState(false)

    const handleClickBack = () => {
        if (isRegisterForm) {
            setIsRegisterForm(false)
        } else {
            navigate(-1)
        }
    }

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

    const handleLoginWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider()
            const credential = await signInWithPopup(auth, googleProvider)
            
            // dispatch sign in action
            dispatch(signIn(credential.user))

            enqueueSnackbar('Đăng nhập thành công!', {
                variant: 'success',
                action,
                autoHideDuration: 3000
            })

            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (error) {
            enqueueSnackbar(error.code, {
                variant: 'error',
                action,
                autoHideDuration: 10000
            })
        }
    }

    const handleLoginWithFacebook = async () => {
        try {
            const facebookProvider = new FacebookAuthProvider()
            const credential = await signInWithPopup(auth, facebookProvider)
            
            // dispatch sign in action
            dispatch(signIn(credential.user))

            enqueueSnackbar('Đăng nhập thành công!', {
                variant: 'success',
                action,
                autoHideDuration: 3000
            })
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (error) {
            enqueueSnackbar(error.code, {
                variant: 'error',
                action,
                autoHideDuration: 10000
            })
        }
    }

    return (
        <Box sx={styles.container}>
            <IconButton sx={styles.goBack} onClick={handleClickBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box sx={styles.heading}>
                <Typography component="h1">Đăng ký tài khoản</Typography>
                <CardMedia sx={styles.logo} image={logo} component="img" />
            </Box>
            {!isRegisterForm && (
                <Box sx={styles.registerMethod}>
                    <Button
                        sx={styles.signInButton}
                        onClick={() => setIsRegisterForm(true)}
                        variant="outline"
                        color="light"
                        display="block"
                        pill
                    >
                        <Box sx={styles.btnContent}>
                            <PermIdentityIcon />
                            <Typography>
                                Sử dụng email / mật khẩu
                            </Typography>
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
                    <Typography sx={styles.hadAccount}>
                        Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                    </Typography>
                </Box>
            )}
            {isRegisterForm && <RegisterForm />}
        </Box>
    )
}

export default memo(Register)
