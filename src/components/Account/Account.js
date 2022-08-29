import { useState, useCallback, memo, useRef } from 'react'
import { IconButton, Avatar, Menu } from '@mui/material'
import { Paper, ClickAwayListener, Typography, CardMedia } from '@mui/material'
import { MenuItem, Popper, Grow, Box, MenuList } from '@mui/material'
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
import useToastMessage from '@/hooks/useToastMessage'
import DialogAlert from '@/components/DialogAlert'

const styles = {
    menu: {
        mt: 1,
        backgroundColor: '#333',
        color: '#fff',
        px: 1.5,
        maxWidth: '180px',
        minWidth: '120px'
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
    },
    truncate: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }
}

const Account = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const showToast = useToastMessage()

    const logged = useSelector(loggedSelector)
    const userInfo = useSelector(userInfoSelector)

    // fallback for avatar
    const [fallback, setFallback] = useState('')

    const [openMenu, setOpenMenu] = useState(false)
    const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

    const anchorRef = useRef(null)

    const handleToggleMenu = useCallback(() => {
        setOpenMenu((prev) => !prev)
    }, [openMenu])

    const handleCloseMenu = useCallback(() => {
        setOpenMenu(false)
    }, [openMenu])

    const handleSignOut = useCallback(async () => {
        try {
            handleCloseMenu()
            setShowSignOutConfirm(false)
            await signOut(auth)

            // dispatch sign out action
            dispatch(signOutAction())

            showToast('Đăng xuất thành công!', {
                variant: 'success',
                autoHideDuration: 3000
            })
        } catch (err) {
            showToast(err.message, {
                variant: 'error',
                autoHideDuration: 5000
            })
        }
    }, [auth])

    const handleShowConfirm = useCallback(() => {
        setShowSignOutConfirm(true)
    }, [])

    const handleCloseConfirm = useCallback(() => {
        setShowSignOutConfirm(false)
    }, [])

    const handleNavigateLoginPage = useCallback(() => {
        setOpenMenu(false)
        navigate(config.routes.login)
    }, [])

    const handleNavigateFollowPage = useCallback(async () => {
        setOpenMenu(false)
        navigate(config.routes.follow)
    }, [])

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
                        onClick={handleToggleMenu}
                    >
                        <Avatar sx={styles.avatarIcon}>
                            {userInfo.photoURL && (
                                <CardMedia
                                    component="img"
                                    image={fallback || userInfo.photoURL}
                                    onError={() => {
                                        setFallback(avatarPlaceholder)
                                    }}
                                />
                            )}
                        </Avatar>
                    </IconButton>
                    <Popper
                        open={openMenu}
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
                                        onClickAway={handleCloseMenu}
                                    >
                                        <MenuList>
                                            <MenuItem
                                                sx={{ mb: 1.2 }}
                                                sx={styles.menuItem}
                                                onClick={handleCloseMenu}
                                            >
                                                <Typography
                                                    sx={styles.truncate}
                                                >
                                                    {userInfo.displayName}
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                sx={styles.menuItem}
                                                onClick={handleNavigateFollowPage}
                                            >
                                                <BookmarkBorderOutlinedIcon />
                                                <Typography variant="body2">
                                                    Theo dõi
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem
                                                sx={styles.menuItem}
                                                onClick={handleShowConfirm}
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

            {/* Button to navigate to login page */}
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
            <DialogAlert
                open={showSignOutConfirm}
                onClose={handleCloseConfirm}
                onAllow={handleSignOut}
                title="Đăng xuất tài khoản"
                content="Bạn có chắc đăng xuất tài khoản này không?"
            />
        </>
    )
}

export default memo(Account)
