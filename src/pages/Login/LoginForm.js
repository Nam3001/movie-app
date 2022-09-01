import { useState, memo, useCallback } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import InputField from '@/components/form-control/InputField'
import Button from '@/components/Button'
import { auth } from '@/services/firebaseConfig'
import { signIn } from '@/store/authSlice'
import config from '@/configs'
import validationSchema from './validationSchema'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'

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
        '& button': {
            fontSize: '16px',
            fontWeight: '500',
            mt: 3,
            backgroundColor: (theme) => theme.color.heading
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
    },
    logingErrorMessage: {
        color: '#e92040',
        mt: 2,
        ml: 2,
        fontSize: '14px'
    }
}

function LoginForm({ loging, onSubmit, wrongPassword, userNotFound }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const yupResolver = useYupValidationResolver(validationSchema)
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver
    })

    const handleClickForgotPassword = useCallback(() => {
        navigate(config.routes.forgotPassword)
        // eslint-disable-next-line
    }, [])

    return (
        <Box sx={styles.formContainer}>
            <form
                onSubmit={handleSubmit}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
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
                                invalid={!!errors.email}
                                errorMessage={errors.email?.message}
                                sx={styles.inputField}
                                placeholder="Địa chỉ email"
                                pill
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <InputField
                                {...field}
                                invalid={!!errors.password}
                                errorMessage={errors.password?.message}
                                sx={styles.inputField}
                                placeholder="Mật khẩu"
                                pill
                                type="password"
                            />
                        )}
                    />
                </Box>
                {wrongPassword && (
                    <Typography sx={styles.logingErrorMessage}>
                        Mật khẩu không chính xác!
                    </Typography>
                )}

                {userNotFound && (
                    <Typography sx={styles.logingErrorMessage}>
                        Tài khoản không tồn tại!
                    </Typography>
                )}

                <Button
                    color="warning"
                    sx={styles.submitBtn}
                    type="submit"
                    disabled={loging}
                >
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
            <Typography
                onClick={handleClickForgotPassword}
                sx={styles.forgotPassword}
            >
                Quên mật khẩu?
            </Typography>
        </Box>
    )
}

export default memo(LoginForm)
