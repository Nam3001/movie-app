import { memo } from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

const styles = {
    heading: {
        color: (theme) => theme.color.heading,
        fontSize: '34px',
        textTransform: 'uppercase',
        fontWeight: 500,
        pt: '50px',
        px: '16px',
        textAlign: {
            xs: 'center',
            lg: 'left'
        }
    }
}

function Heading({ children, sx }) {
    return (
        <Typography sx={{...styles.heading, ...sx}} variant="h1" component="p">
            { children }
        </Typography>
    )
}

Heading.propTypes = {
    sx: PropTypes.object
}

export default memo(Heading)