import { memo } from 'react'
import { Toolbar } from '@mui/material'
import Header from '../components/Header'

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

