import { useState, useEffect, memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Snackbar,
    IconButton,
    CircularProgress
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'

import InputField from '@/components/form-control/InputField'
import PhoneNumberField from '@/components/form-control/PhoneNumberField'
import Button from '@/components/Button'
import { auth } from '@/services/firebaseConfig'
import { signIn } from '@/store/authSlice'

const styles = {
    inputLabelGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        px: 1,
        mt: {
            xs: 3,
            sm: 3.5
        },
        '& > p': {
            color: '#fff',
            fontSize: '15px',
            fontWeight: '500'
        }
    },
    inputLabelRight: {
        cursor: 'pointer'
    },
    formContainer: {
        width: '360px',
        maxWidth: '98%',
        mt: 1
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
    },
    registing: {
        color: '#fff',
        width: '15px !important',
        height: '15px !important'
    }
}

function RegisterForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [userFullName, setUserFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [validFullName, setValidFullName] = useState(false)
    const [isDisableSubmit, setIsDisableSubmit] = useState(true)
    const [isRegisting, setIsRegisting] = useState(false)

    useEffect(() => {
        setValidFullName(() => {
            const nameWords = userFullName.split(' ')
            return nameWords.length >= 2 && nameWords[1] !== ''
        })
    }, [userFullName])

    useEffect(() => {
        const enableSubmit = validFullName && email && password
        setIsDisableSubmit(!enableSubmit)
    }, [validFullName, email, password])

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

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

    const handleUserNameChange = (e) => {
        setUserFullName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const email = formData.get('email')
        const password = formData.get('password')
        const displayName = formData.get('username')

        try {
            setIsRegisting(true)
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
                displayName
            })
            
            // dispatch sign in action
            dispatch(signIn(user))

            enqueueSnackbar('Xác minh email của bạn!', {
                variant: 'info',
                action,
                autoHideDuration: 10000
            })
        } catch (error) {
            enqueueSnackbar(error.code, {
                variant: 'error',
                action
            })
        } finally {
            setIsRegisting(false)
        }
    }

    return (
        <Box sx={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <Box
                    className="inputForm_labelGroup"
                    sx={styles.inputLabelGroup}
                >
                    <Typography className="inputForm_label">
                        Tên của bạn?
                    </Typography>
                </Box>
                <InputField
                    name="username"
                    onChange={handleUserNameChange}
                    value={userFullName}
                    sx={styles.inputField}
                    pill
                    placeholder="Họ và tên của bạn"
                />
                <Box
                    className="inputForm_labelGroup"
                    sx={styles.inputLabelGroup}
                >
                    <Typography
                        className="inputForm_label"
                        sx={styles.inputLabelLeft}
                    >
                        Email
                    </Typography>
                </Box>
                <Box className="email_form">
                    <InputField
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        inputMode="email"
                        sx={styles.inputField}
                        placeholder="Địa chỉ email"
                        pill
                    />
                    <InputField
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        sx={styles.inputField}
                        placeholder="Mật khẩu"
                        pill
                    />
                    <InputField
                        type="password"
                        name="passwordAgain"
                        sx={styles.inputField}
                        placeholder="Nhập lại mật khẩu"
                        pill
                    />
                </Box>

                <Button
                    disable={isDisableSubmit || isRegisting}
                    sx={styles.submitBtn}
                >
                    {isRegisting ? (
                        <CircularProgress sx={styles.registing} />
                    ) : (
                        'Đăng ký'
                    )}
                </Button>
            </form>
            <Typography sx={styles.hadAccount}>
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </Typography>
        </Box>
    )
}

export default memo(RegisterForm)
