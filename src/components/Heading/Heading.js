import { Typography } from '@mui/material'

const styles = {
    heading: {
        color: (theme) => theme.color.heading,
        fontSize: '34px',
        textTransform: 'uppercase',
        fontWeight: 500,
        pt: '50px',
        textAlign: {
            xs: 'center',
            lg: 'left'
        }
    }
}

function Heading({ children }) {
    return (
        <Typography sx={styles.heading} variant="h1" component="p">
            { children }
        </Typography>
    )
}

export default Heading