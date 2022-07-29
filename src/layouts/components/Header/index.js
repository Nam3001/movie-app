import { useState } from 'react'
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

import Wrapper from '@/components/Wrapper'
import NavMenu from '../NavMenu'
import Account from '../Account'

// styles
import styles from './styles'

function Header() {
    const category = [
        { title: 'Mới Nhất', path: 'latest' },
        { title: 'Đang Chiếu', path: 'now_playing' },
        { title: 'Đánh Giá Cao', path: 'top_rated' },
        { title: 'Phổ Biến', path: 'popular' },
        { title: 'Sắp Chiếu', path: 'upcoming' }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={styles.appBar}>
                <Wrapper>
                    <Toolbar sx={styles.toolbar}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <NavMenu
                                display={{ sx: 'block', md: 'none' }}
                                items={category}
                            />
                            <Box
                                component="img"
                                sx={styles.logo}
                                src={logo}
                                alt="logo"
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="ul"
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'flex'
                                    },
                                    mr: 2,
                                    alignItems: 'center'
                                }}
                            >
                                {category.map((item, index) => (
                                    <Box sx={styles.navItem} key={index}>
                                        {item.title}
                                    </Box>
                                ))}
                            </Box>
                            <Search
                                width="200px"
                                placeholder="Bạn muốn tìm phim gì?"
                            />
                            <Account />
                        </Box>
                    </Toolbar>
                </Wrapper>
            </AppBar>
        </Box>
    )
}

export default Header
