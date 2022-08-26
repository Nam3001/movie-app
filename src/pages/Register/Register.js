import { memo, useState, useCallback, useRef, useEffect } from 'react'
import { Box, Typography, CardMedia, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendEmailVerification,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'

import RegisterForm from './RegisterForm'
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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        bgcolor: (theme) => theme.color.primary.light,
        width: '600px',
        maxWidth: '90vw',
        minHeight: '480px',
        maxHeight: '100vh',
        position: 'absolute',
        borderRadius: '10px',
        overflow: 'auto',
        py: '40px',
        px: {
            xs: '12px',
            sm: '30px'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
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

    const showToast = useToastMessage()

    // use to determine current position is sign in method or login form
    const [isRegisterForm, setIsRegisterForm] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [emailUsed, setEmailUsed] = useState(false)

    const handleClickBack = useCallback(() => {
        if (isRegisterForm) {
            setIsRegisterForm(false)
        } else {
            navigate(-1)
        }
    }, [isRegisterForm])

    const handleLoginWithGoogle = useCallback(async () => {
        try {
            const googleProvider = new GoogleAuthProvider()
            const credential = await signInWithPopup(auth, googleProvider)

            // dispatch sign in action
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

            // dispatch sign in action
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
            const email = values?.email
            const password = values?.password
            const fullName = values?.fullName?.trim()

            try {
                setRegistering(true)
                if (emailUsed) setEmailUsed(false)

                const credential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                const user = credential.user
                await sendEmailVerification(user, {
                    url: 'http://localhost:3001'
                })
                await updateProfile(user, {
                    displayName: fullName
                })

                // dispatch sign in action
                dispatch(signIn(user))

                showToast('Xác minh email của bạn!', {
                    variant: 'info',
                    autoHideDuration: 3000
                })
                navigate('/')
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailUsed(true)
                } else {
                    showToast(error.code, {
                        variant: 'error',
                        autoHideDuration: 3000
                    })
                }
            } finally {
                setRegistering(false)
            }
        },
        [registering, emailUsed]
    )

    return (
        <Box sx={styles.container}>
            <Box sx={styles.inner}>
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
                                <CardMedia
                                    component="img"
                                    image={facebookIcon}
                                />
                                <Typography>Tiếp tục với Facebook</Typography>
                            </Box>
                        </Button>
                        <Typography sx={styles.hadAccount}>
                            Bạn đã có tài khoản?{' '}
                            <Link to="/login">Đăng nhập</Link>
                        </Typography>
                    </Box>
                )}
                {isRegisterForm && (
                    <RegisterForm
                        onSubmit={handleLoginWithPassword}
                        registering={registering}
                        emailUsed={emailUsed}
                    />
                )}
            </Box>
        </Box>
    )
}

export default memo(Register)
