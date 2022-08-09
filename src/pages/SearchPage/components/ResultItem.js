import React, { memo } from 'react'
import PropTypes from 'prop-types'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'
import { Box, CardMedia, Typography } from '@mui/material'

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
		}
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		border: (theme) => `1px solid ${theme.color.nav}`,
		padding: '3px',
		borderRadius: '6px'
	},
	thumbnailWrapper: {
		width: '150px',
		height: '225px'
	},
	content: {
		marginLeft: '20px',
		flex: 1
	},
	title: {
		color: '#fff',
		fontSize: '24px',
		mb: '5px',
		mt: {
			xs: 4,
			sm: 0
		},
		textAlign: {
			xs: 'center',
			sm: 'left'
		},
	},
	overview: {
		color: (theme) => theme.color.nav,
		fontSize: '18px',
		display: '-webkit-box',
		WebkitLineClamp: 3,
		WebkitBoxOrient: 'vertical',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		textAlign: {
			xs: 'center',
			sm: 'left'
		},
	}
}

const ResultItem = ({ title, overview, thumbnail, onClick }) => {
	const thumbnailBaseURL = 'https://image.tmdb.org/t/p/original'
	thumbnail &&= thumbnailBaseURL + thumbnail

	return (
		<Box sx={styles.container}>
			<Box sx={styles.thumbnailWrapper}>
				<CardMedia
					sx={styles.thumbnailImage}
					component="img"
					lazy-src={thumbnail || thumbnailPlaceholder}
				/>
			</Box>
			<Box sx={styles.content}>
				<Typography sx={styles.title} component="p">
					{title}
				</Typography>
				<Typography sx={styles.overview} component="p">
					{overview}
				</Typography>
			</Box>
		</Box>
	)
}

ResultItem.propTypes = {
	title: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	thumbnail: PropTypes.string,
	onClick: PropTypes.func
}

export default memo(ResultItem)
