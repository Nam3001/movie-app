import { Container } from '@mui/material'

const styles = {
    maxWidth: {
        md: 968,
        lg: 1200,
        xl: 1270
    },
    p: '0px !important'
}

function Wrapper({ children }) {
    return <Container sx={styles}>{children}</Container>
}

export default Wrapper
