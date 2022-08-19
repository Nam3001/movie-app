import { memo } from 'react'
import { Box, Typography, CardMedia, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
        height: '85vh',
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
        alignItems: 'center',
    },
    heading: {
        '& h1': {
            color: '#fff',
            fontSize: '28px',
            textAlign: 'center',
            fontWeight: '500'
        },
        '& > img': {
            mx: 'auto'
        }
    },
    logo: {
        width: '150px',
        mt: 2
    },
    content: {
        mt: 5,
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column'
    },
    signInButton: {
        fontSize: '15px',
        py: '10px',
        mt: 2,
        '&:hover': { color: '#333' }
    },
    btnContent: {
        display: 'flex',

        '& > img, & > svg': {
            mr: 1
        },
        '& > img': {
            width: '22px',
            height: '22px'
        },
        '& > p': {
            m: 'auto',
            fontSize: '15px'
        }
    },
    hadAccount: {
        color: (theme) => theme.color.nav,
        fontSize: '15px',
        textAlign: 'center',
        mt: 4,
        '& > a': {
            color: theme => theme.color.heading,
            textDecoration: 'none',
            fontWeight: 500
        }
    },
    goBack: {
        position: 'absolute',
        color: '#fff',
        left: '20px',
        top: '20px',
        width: '56px',
        height: '56px'
    }
}

function Register() {
    return (
        <Box sx={styles.container}>
            <IconButton sx={styles.goBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box sx={styles.heading}>
                <Typography component="h1">Đăng ký tài khoản</Typography>
                <CardMedia sx={styles.logo} image={logo} component="img" />
            </Box>
            <Box sx={styles.content}>
                <Button
                    sx={styles.signInButton}
                    variant="outline"
                    color="light"
                    display="block"
                    pill
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
                <Typography sx={styles.hadAccount}>
                    Bạn chưa có tài khoản? <Link to="/login">Đăng nhập</Link>
                </Typography>
            </Box>
        </Box>
    )
}

export default memo(Register)
