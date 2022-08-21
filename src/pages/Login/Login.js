import { memo, useState } from 'react'
import LoginForm from './LoginForm'
import { Box, Typography, CardMedia, IconButton } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import Button from '@/components/Button'
import logo from '@/assets/img/logo.png'
import googleIcon from '@/assets/img/google.png'
import facebookIcon from '@/assets/img/facebook.png'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'

const styles = {
    container: {
        bgcolor: (theme) => theme.color.primary.light,
        width: '600px',
        maxWidth: '90vw',
        height: '580px',
        maxHeight: '94vh',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderRadius: '10px',
        py: '30px',
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
        color: '#fff',
        left: '10px',
        top: '10px',
        width: '56px',
        height: '56px'
    }
}

function Login() {
    const navigate = useNavigate()

    // use to determine current position is sign in method or login form
    const [isLoginForm, setIsLoginForm] = useState(false)

    const handleClickBack = () => {
        if (isLoginForm) {
            setIsLoginForm(false)
        } else {
            navigate(-1)
        }
    }

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
                            <Typography>
                                Sử dụng email / hoặc số điện thoại
                            </Typography>
                        </Box>
                    </Button>
                    <Button
                        sx={styles.signInButton}
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
            {isLoginForm && <LoginForm />}
        </Box>
    )
}

export default memo(Login)
