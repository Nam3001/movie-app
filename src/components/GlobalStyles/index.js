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
    }
})

function GlobalStyles({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default GlobalStyles
