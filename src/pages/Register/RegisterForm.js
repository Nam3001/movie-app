import { useState, useEffect, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Typography,
    Snackbar,
    IconButton,
    CircularProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller, useWatch } from 'react-hook-form'
import * as yup from 'yup'

import InputField from '@/components/form-control/InputField'
import Button from '@/components/Button'
import { auth } from '@/services/firebaseConfig'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { toCapitalize } from '@/utils/common'
import validationSchema from './validationSchema'

const styles = {
    inputLabelGroup: {
        px: 1,
        mt: {
            xs: 1,
            sm: 2
        },
        '& > p': {
            color: '#fff',
            fontWeight: '500'
        }
    },
    formContainer: {
        width: '360px',
        maxWidth: '98%',
        mt: 3
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
            mt: 4,
            backgroundColor: (theme) => theme.color.heading,
            borderColor: (theme) => theme.color.heading
        }
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
    },
    emailUsed: {
        color: '#e92040',
        fontSize: '14px',
        mt: 2,
        ml: 1.5
    }
}

function RegisterForm({ onSubmit, registering, emailUsed }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const yupResolver = useYupValidationResolver(validationSchema)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            passwordAgain: ''
        },
        resolver: yupResolver
    })

    const userFullName = useWatch({ name: 'fullName', control })
    const email = useWatch({ name: 'email', control })
    const password = useWatch({ name: 'password', control })
    const passwordAgain = useWatch({ name: 'passwordAgain', control })

    const [validFullName, setValidFullName] = useState(false)
    const [isDisableSubmit, setIsDisableSubmit] = useState(true)

    useEffect(() => {
        setValidFullName(() => {
            const nameWords = userFullName.split(' ')
            return nameWords.length >= 2 && nameWords[1] !== ''
        })
    }, [userFullName])

    useEffect(() => {
        const enableSubmit = validFullName && email && password && passwordAgain
        setIsDisableSubmit(!enableSubmit)
    }, [validFullName, email, password, passwordAgain])

    return (
        <Box sx={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box
                    className="inputForm_labelGroup"
                    sx={styles.inputLabelGroup}
                >
                    <Typography
                        className="inputForm_label"
                        sx={{ fontSize: '16px' }}
                    >
                        Tên của bạn?
                    </Typography>
                </Box>
                <Controller
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                        <InputField
                            {...field}
                            value={toCapitalize(field.value)}
                            onChange={(e) =>
                                field.onChange(toCapitalize(e.target.value))
                            }
                            sx={styles.inputField}
                            placeholder="Họ và tên của bạn"
                            pill
                            invalid={Boolean(errors.fullName)}
                            errorMessage={errors.fullName?.message}
                        />
                    )}
                />
                <Box
                    className="inputForm_labelGroup"
                    sx={styles.inputLabelGroup}
                >
                    <Typography
                        className="inputForm_label"
                        sx={{ fontSize: '16px' }}
                    >
                        Email
                    </Typography>
                </Box>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <InputField
                            {...field}
                            type="email"
                            inputMode="email"
                            sx={styles.inputField}
                            placeholder="Email của bạn"
                            pill
                            invalid={Boolean(errors.email)}
                            errorMessage={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <InputField
                            {...field}
                            type="password"
                            sx={styles.inputField}
                            placeholder="Mật khẩu"
                            pill
                            invalid={Boolean(errors.password)}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="passwordAgain"
                    render={({ field }) => (
                        <InputField
                            {...field}
                            type="password"
                            sx={styles.inputField}
                            placeholder="Nhập lại mật khẩu"
                            pill
                            invalid={Boolean(errors.passwordAgain)}
                            errorMessage={errors.passwordAgain?.message}
                        />
                    )}
                />
                {emailUsed && (
                    <Typography sx={styles.emailUsed}>
                        Email này đã được sử dụng!
                    </Typography>
                )}
                <Button
                    disabled={isDisableSubmit || registering}
                    sx={styles.submitBtn}
                >
                    {registering ? (
                        <CircularProgress sx={styles.registing} />
                    ) : (
                        'Đăng ký'
                    )}
                </Button>
                <Typography sx={styles.hadAccount}>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </Typography>
            </form>
        </Box>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default memo(RegisterForm)
