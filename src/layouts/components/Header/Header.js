import { useState, memo, useRef, useEffect, useCallback } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Container,
    Tabs,
    Tab
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

import logo from '@/assets/img/logo.png'
import Search from '@/components/Search'
import config from '@/configs'
import Wrapper from '@/components/Wrapper'
import NavList from '../NavList'
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

    // reference to footer of nav item
    const navItemFooterRef = useRef()
    const navListRef = useRef()
    const activeRef = useRef()

    const location = useLocation()
    const navigate = useNavigate()

    const renderNavItemFooter = useCallback(() => {
        const itemActived = navListRef.current.querySelector('.active')
        const navItemFooter = navItemFooterRef.current

        if (!itemActived) {
            navItemFooter.style.display = 'none'
            return
        }

        const leftPos = `${itemActived.offsetLeft}px`
        const width = `${itemActived.clientWidth}px`

        navItemFooter.style.display = 'block'
        navItemFooter.style.left = leftPos
        navItemFooter.style.width = width
    }, [location.pathname])

    useEffect(() => {
        renderNavItemFooter()
    }, [location.pathname])

    useEffect(() => {
        window.addEventListener('resize', renderNavItemFooter)
        return () => window.removeEventListener('resize', renderNavItemFooter)
    }, [])


    return (
        <HideOnScroll>
            <AppBar position="fixed" sx={styles.appBar}>
                <Wrapper>
                    <Toolbar component="nav" sx={styles.toolbar}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavList
                                display={{ sx: 'block', md: 'none' }}
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                ref={navListRef}
                                component="ul"
                                sx={styles.navList}
                            >
                                {categories.map((item, index) => (
                                    <Box
                                        component={NavLink}
                                        ref={activeRef}
                                        className={({ isActive }) =>
                                            isActive && 'active'
                                        }
                                        key={index}
                                        to={item.path}
                                        sx={styles.navItem}
                                    >
                                        {item.title}
                                    </Box>
                                ))}
                            </Box>
                            <Search
                                width="230px"
                                placeholder="Bạn muốn tìm phim gì?"
                            />
                            <Account />
                        </Box>
                        <Box
                            ref={navItemFooterRef}
                            sx={styles.navItemFooter}
                        ></Box>
                    </Toolbar>
                </Wrapper>
            </AppBar>
        </HideOnScroll>
    )
}

export default memo(Header)
