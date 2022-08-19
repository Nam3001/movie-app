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
    Typography
} from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

const styles = {
    menu: {
        mt: 1,
        backgroundColor: '#333',
        color: '#fff',
        px: 1.5,
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
        }
    }
}

const Account = () => {
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = useCallback(() => {
        setOpen((prev) => !prev)
    }, [open])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [open])

    return (
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
                    <PermIdentityIcon />
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
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem
                                        sx={{ mb: 1.2 }}
                                        sx={styles.menuItem}
                                        onClick={handleClose}
                                    >
                                        Nguyen Van Nam
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
                                        onClick={handleClose}
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
    )
}

Account.propTypes = {}

export default memo(Account)
