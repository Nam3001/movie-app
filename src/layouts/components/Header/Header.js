import { useState, memo, useEffect, useCallback } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton } from '@mui/material'
import { Toolbar, Typography, Container, Tabs, Tab } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import logo from '@/assets/img/logo.png'
import Search from '@/components/Search'
import config from '@/configs'
import Wrapper from '@/components/Wrapper'
import MobileNav from '../MobileNav'
import Account from '@/components/Account'
import HideOnScroll from './HideOnScroll'

// styles
import styles from './styles'

function Header() {
    const categories = [
        { title: 'Xu Hướng', path: config.routes.trending },
        { title: 'Đang Chiếu', path: config.routes.nowPlaying },
        { title: 'Đánh Giá Cao', path: config.routes.topRated },
        { title: 'Phổ Biến', path: config.routes.popular },
        { title: 'Sắp Chiếu', path: config.routes.upcoming }
    ]

    const location = useLocation()

    const checkActive = useCallback(
        (path) => {
            return location.pathname === path
        },
        [location.pathname]
    )

    return (
        <HideOnScroll>
            <AppBar position="fixed" sx={styles.appBar}>
                <Wrapper>
                    <Toolbar component="nav" sx={styles.toolbar}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Nav drawer on mobile */}
                            <MobileNav
                                displaySx={{ sx: 'block', md: 'none' }}
                                items={categories}
                            />
                            <Link to="/">
                                <Box
                                    component="img"
                                    sx={styles.logo}
                                    src={logo}
                                    alt="logo"
                                />
                            </Link>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%'
                            }}
                        >
                            {/* Nav */}
                            <Box component="nav" sx={styles.navList}>
                                {categories.map((item, index) => (
                                    <Box
                                        sx={styles.navItem}
                                        key={index}
                                        className={clsx({
                                            active: checkActive(item.path)
                                        })}
                                    >
                                        <Box
                                            component={NavLink}
                                            className={({ isActive }) =>
                                                isActive && 'active'
                                            }
                                            to={item.path}
                                            sx={styles.navLink}
                                        >
                                            {item.title}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Search
                                width="230px"
                                placeholder="Bạn muốn tìm phim gì?"
                            />
                            <Account />
                        </Box>
                    </Toolbar>
                </Wrapper>
            </AppBar>
        </HideOnScroll>
    )
}

export default memo(Header)
