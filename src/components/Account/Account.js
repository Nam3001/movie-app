import React, { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import {
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Popper,
    Grow,
    Box,
    MenuList,
    Paper,
    ClickAwayListener,
    Typography,
    CardMedia
} from '@mui/material'
import { useSnackbar } from 'notistack'
import CloseIcon from '@mui/icons-material/Close'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/services/firebaseConfig'
import { signOut as signOutAction } from '@/store/authSlice'
import { userInfoSelector, loggedSelector } from '@/store/selectors'
import avatarPlaceholder from '@/assets/img/avatar-placeholder.png'
import config from '@/configs'

const styles = {
    menu: {
        mt: 1,
        backgroundColor: '#333',
        color: '#fff',
        px: 1.5
    },
    menuItem: {
        justifyContent: 'center',
        '& + li': {
            mt: 0.5
        },
        '&:hover': {
            borderRadius: 1,
            backgroundColor: '#999'
        }
    },
    accountButton: {
        p: 0,
        ml: {
            lg: 1,
            xs: 0
        }
    },
    avatarIcon: {
        backgroundColor: (theme) => theme.color.primary.main,
        width: {
            xs: '50px',
            md: '46px'
        },
        height: {
            xs: '50px',
            md: '46px'
        },
        '& img': {
            width: '100%',
            height: '100%'
        }
    }
}

const Account = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // global state
    const logged = useSelector(loggedSelector)
    const userInfo = useSelector(userInfoSelector)

    const [fallback, setFallback] = useState('')

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev)
    }, [open])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [open])

    const handleSignOut = useCallback(async () => {
        try {
            handleClose()
            await signOut(auth)

            // dispatch sign out action
            dispatch(signOutAction())

            enqueueSnackbar('Đăng xuất thành công!', {
                variant: 'success',
                action,
                autoHideDuration: 3000
            })
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'error',
                action
            })
        }
    }, [auth])

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

    const handleNavigateLoginPage = () => {
        navigate(config.routes.login)
    }

    return (
        <>
            {logged && (
                <>
                    <IconButton
                        ref={anchorRef}
                        edge="start"
                        color="inherit"
                        aria-label="account"
                        size="large"
                        sx={styles.accountButton}
                        onClick={handleToggle}
                    >
                        <Avatar sx={styles.avatarIcon}>
                            {userInfo.photoURL && (
                                <CardMedia
                                    component="img"
                                    image={fallback || userInfo.photoURL}
                                    onError={() => { setFallback(avatarPlaceholder) }}
                                />
                            )}
                        </Avatar>
                    </IconButton>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        placement="bottom-end"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-end'
                                            ? 'right top'
                                            : 'right bottom'
                                }}
                            >
                                <Paper sx={styles.menu}>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList>
                                            <MenuItem
                                                sx={{ mb: 1.2 }}
                                                sx={styles.menuItem}
                                                onClick={handleClose}
                                            >
                                                {userInfo.displayName}
                                            </MenuItem>
                                            <MenuItem
                                                sx={styles.menuItem}
                                                onClick={handleClose}
                                            >
                                                <BookmarkBorderOutlinedIcon />
                                                <Typography variant="body2">
                                                    Theo dõi
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                sx={styles.menuItem}
                                                onClick={handleSignOut}
                                            >
                                                <LogoutOutlinedIcon />
                                                <Typography variant="body2">
                                                    Đăng xuất
                                                </Typography>
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </>
            )}

            {!logged && (
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="account"
                    size="large"
                    sx={styles.accountButton}
                    onClick={handleNavigateLoginPage}
                >
                    <Avatar sx={styles.avatarIcon}>
                        <PermIdentityIcon />
                    </Avatar>
                </IconButton>
            )}
        </>
    )
}

Account.propTypes = {}

export default memo(Account)
