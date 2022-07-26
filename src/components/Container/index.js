import { Container as MUIContainer } from '@mui/material'

const styles = {
    md: {
        width: 900
    },
    lg: {
        width: 1200
    }
}

function Container({ children }) {
    return <MUIContainer sx={styles}>{children}</MUIContainer>
}

export default Container
