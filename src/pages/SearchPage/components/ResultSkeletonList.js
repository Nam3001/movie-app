import React, { memo } from 'react'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'
import { Box, CardMedia, Typography, Skeleton } from '@mui/material'
import { alpha } from '@mui/material/styles'

const styles = {
	container: {
		display: 'flex',
		flexFlow: {
			xs: 'column nowrap',
			sm: 'row nowrap'
		},
		alignItems: 'center',
		cursor: 'pointer',
		'& + .MuiBox-root': {
			mt: 6
		},
		'& .MuiSkeleton-root': {
			bgcolor: alpha('#fff', 0.2)
		}
	},
	content: {
		marginLeft: '20px',
		flex: 1
	}
}

const ResultSkeletonList = () => {
	return (
		<Box>
			{Array(2).fill(null).map((_, idx) => (
				<Box sx={styles.container} key={idx}>
					<Skeleton variant="rounded" width={150} height={225} />
					<Box sx={styles.content}>
						<Skeleton
							variant="text"
							sx={{ fontSize: '1rem', height: '35px', width: '60%' }}
						/>
						<Skeleton
							variant="text"
							sx={{ fontSize: '1rem', height: '20px' }}
						/>
						<Skeleton
							variant="text"
							sx={{ fontSize: '1rem', height: '20px', width: '90%' }}
						/>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default memo(ResultSkeletonList)
