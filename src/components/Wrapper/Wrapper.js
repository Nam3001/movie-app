import { memo } from 'react'
import { Container } from '@mui/material'

const styles = {
    maxWidth: {
        md: 968,
        lg: 1111
    },
    p: '0px !important'
}

function Wrapper({ children, ...props }) {
    return <Container {...props} sx={styles}>{children}</Container>
}

export default memo(Wrapper)
