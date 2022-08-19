import React, { useState, memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Drawer, List, ListItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'

const styles = {
    paper: {
        backgroundColor: (theme) => theme.color.primary.main,
        color: (theme) => theme.color.nav,
        width: '280px',
        padding: '0 48px',
        paddingTop: '50px'
    },
    menuItem: {
        p: 0,
        '& a': {
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            textAlign: 'center',
            borderBottom: (theme) => '2px solid #8d9eac1a',
            padding: '18px 0',
            justifyContent: 'center',
            color: (theme) => theme.color.nav,
            textDecoration: 'none',

            '&.active': {
                color: '#fff',
                borderBottomColor: (theme) => theme.color.heading
            }
        }
    },
    closeIcon: {
        color: (theme) => theme.color.nav,
        fontSize: '34px'
    },
    closeBtn: {
        width: '60px',
        position: 'absolute',
        top: 0,
        right: 0
    },
    menuIconBtn: {
        marginTop: '4px',
        p: 2,
        '& svg': {
            fontSize: '28px'
        }
    }
}

const NavList = ({ items, display }) => {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const toggleShowMenu = useCallback(
        (value) => {
            setIsShowMenu(value)
        },
        [isShowMenu]
    )

    return (
        <>
            <IconButton
                onClick={() => toggleShowMenu(true)}
                edge="start"
                color="inherit"
                aria-label="menu"
                size="large"
                sx={{ ...styles.menuIconBtn, display }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={isShowMenu}
                onClose={() => toggleShowMenu(false)}
                PaperProps={{ sx: styles.paper }}
            >
                <IconButton
                    onClick={() => toggleShowMenu(false)}
                    color="inherit"
                    sx={styles.closeBtn}
                >
                    <CloseIcon sx={styles.closeIcon} />
                </IconButton>
                <List
                    sx={styles.menuList}
                    onClick={() => toggleShowMenu(false)}
                >
                    {items.map((item, idx) => (
                        <ListItem key={idx} sx={styles.menuItem}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? 'active' : undefined
                                }
                                to={item.path}
                            >
                                {item.title}
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
}

NavList.propTypes = {
    items: PropTypes.array,
    display: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default memo(NavList)
