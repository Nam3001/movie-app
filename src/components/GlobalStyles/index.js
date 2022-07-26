import './GlobalStyles.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
    color: {
        primary: '#081b27',
        subPrimary: '#0c2738',
        nav: '#899ead',
        heading: '#f1b722'
    }
})

function GlobalStyles({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default GlobalStyles
