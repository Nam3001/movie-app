import {memo} from 'react'
import PropTypes from 'prop-types'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Box, Typography } from '@mui/material'

const styles = {
	genre: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        textDecoration: 'underline',
        color: (theme) => theme.color.nav,
        '& .MuiTypography-root, & svg': {
            fontSize: '13px'
        },
    },
}

const Genre = ({ children, sx }) => {
	return (
		<Box sx={{...styles.genre, ...sx}}>
			<LocalOfferIcon />
			<Typography
				sx={{ marginLeft: '4px' }}
				component="p"
				variant="body2"
			>
				{children}
			</Typography>
		</Box>
	)
}

Genre.propTypes = {
	children: PropTypes.string,
	sx: PropTypes.object
}

export default memo(Genre)
