import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box, CircularProgress } from '@mui/material'

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		padding: '6px',
	},
	progress: {
		width: '24px !important',
		height: '24px !important'
	}
}

const SpinnerLoading = ({ color }) => {
	return (
		<Box sx={styles.container}>
			<CircularProgress sx={styles.progress} color={color || 'inherit'} />
		</Box>
	)
}

SpinnerLoading.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary', 'error', 'success', 'info'])
}

export default memo(SpinnerLoading)
