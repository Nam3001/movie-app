import React, { PropTypes, memo } from 'react'
import { Typography, Box } from '@mui/material'

const NotFound = () => {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography
                variant="h4"
                component="p"
                sx={{ color: '#fff', textAlign: 'center' }}
            >
                Page Not Found!
            </Typography>
        </Box>
    )
}

NotFound.propTypes = {}

export default NotFound
