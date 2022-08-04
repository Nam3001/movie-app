import { memo } from 'react'
import Header from '../components/Header'
import { Toolbar } from '@mui/material'

function MainLayout({ children }) {
    return (
        <>
            <Header />
            <Toolbar sx={{ height: theme => theme.navBar.height}}></Toolbar>
            {children}
        </>
    )
}

export default memo(MainLayout)

