import { useState, memo } from 'react'
import logo from '@/assets/img/logo.png'
import MenuIcon from '@mui/icons-material/Menu'
import Search from '@/components/Search'
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Container
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import config from '@/configs'

import Wrapper from '@/components/Wrapper'
import NavMenu from '../NavMenu'
import Account from '../Account'
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

    return (
        <HideOnScroll>
            <AppBar position="fixed" sx={styles.appBar}>
                <Wrapper>
                    <Toolbar component="nav" sx={styles.toolbar}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavMenu
                                display={{ sx: 'block', md: 'none' }}
                                items={categories}
                            />
                            <Link to={config.routes.home}>
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
                                component="ul"
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    mr: 1,
                                    alignItems: 'center'
                                }}
                            >
                                {categories.map((item, index) => (
                                    <Box
                                        component={Link}
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
                    </Toolbar>
                </Wrapper>
            </AppBar>
        </HideOnScroll>
    )
}

export default memo(Header)
