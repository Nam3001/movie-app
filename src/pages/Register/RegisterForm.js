import { useState, useEffect, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import InputField from '@/components/form-control/InputField'
import Button from '@/components/Button'

const styles = {
    inputLabelGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        px: 1,
        mt: 3,
        '& > p': {
            color: '#fff',
            fontSize: '15px',
            fontWeight: '500'
        }
    },
    inputLabelLeft: {},
    inputLabelRight: {
        cursor: 'pointer'
    },
    formContainer: {
        width: '360px',
        maxWidth: '98%',
        mt: 2
    },
    inputField: {
        width: '100%',
        mt: 2,
        border: '1px solid #fff'
    },
    submitBtn: {
        width: '100%',
        fontSize: '15px',
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
}

function RegisterForm() {
    const [isEmail, setIsEmail] = useState(false)
    const toggleSignInMode = () => {
        setIsEmail((prev) => !prev)
    }

    return (
        <Box sx={styles.formContainer}>
            <Box className="inputForm_labelGroup" sx={styles.inputLabelGroup}>
                <Typography
                    className="inputForm_label"
                    sx={styles.inputLabelLeft}
                >
                    {isEmail ? 'Email' : 'Số điện thoại'}
                </Typography>
                <Typography
                    onClick={toggleSignInMode}
                    className="inputForm_label"
                    sx={styles.inputLabelRight}
                >
                    {isEmail ? 'Đăng ký với SĐT' : 'Đăng ký với email'}
                </Typography>
            </Box>
            <form>
                {isEmail && (
                    <InputField
                        sx={styles.inputField}
                        placeholder="Địa chỉ email"
                        pill
                    />
                )}
                {!isEmail && (
                    <InputField
                        sx={styles.inputField}
                        placeholder="Số điện thoại"
                        pill
                    />
                )}
                <InputField
                    sx={styles.inputField}
                    placeholder="Mật khẩu"
                    pill
                />
                <Button color="warning" sx={styles.submitBtn}>
                    Đăng ký
                </Button>
                <Typography sx={styles.hadAccount}>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </Typography>
            </form>
        </Box>
    )
}

export default memo(RegisterForm)
