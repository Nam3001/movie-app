import { memo } from 'react'
import { Box, CardMedia, Typography, Skeleton } from '@mui/material'
import { alpha } from '@mui/material/styles'

import thumbnailPlaceholder from '@/assets/img/placeholder.png'

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
		marginLeft: {
			xs: 0,
			sm: '20px'
		},
		flex: 1,
		minWidth: '130px',
		'& span': {
			margin: {
				xs: 'auto',
				sm: 0
			}
		}
	}
}

const MovieListSkeleton = () => {
	return (
		<Box>
			{Array(2)
				.fill(null)
				.map((_, idx) => (
					<Box sx={styles.container} key={idx}>
						<Skeleton
							variant="rounded"
							width={150}
							height={225}
							sx={{ borderRadius: '6px' }}
						/>
						<Box sx={styles.content}>
							<Skeleton
								variant="text"
								sx={{
									fontSize: '1rem',
									height: '35px',
									width: '60%'
								}}
							/>
							<Skeleton
								variant="text"
								sx={{ fontSize: '1rem', height: '20px' }}
							/>
							<Skeleton
								variant="text"
								sx={{
									fontSize: '1rem',
									height: '20px',
									width: '90%'
								}}
							/>
						</Box>
					</Box>
				))}
		</Box>
	)
}

export default memo(MovieListSkeleton)
