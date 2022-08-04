import { memo } from 'react'
import './GlobalStyles.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    color: {
        primary: {
            main: '#081b27',
            light: '#0c2738'
        },
        nav: '#899ead',
        heading: '#f1b722'
    },
    navBar: {
        height: '80px'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        }
    }
})

function GlobalStyles({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default memo(GlobalStyles)
