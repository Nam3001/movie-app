import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress } from '@mui/material'

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		padding: '6px'
	},
	progress: {
		width: '24px !important',
		height: '24px !important'
	}
}

const SpinnerLoading = ({ color, sx }) => {
	return (
		<Box sx={styles.container}>
			<CircularProgress
				sx={{ ...styles.progress, ...sx }}
				color={color || 'inherit'}
			/>
		</Box>
	)
}

SpinnerLoading.propTypes = {
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'error',
		'success',
		'info'
	]),
	sx: PropTypes.object
}

export default memo(SpinnerLoading)
