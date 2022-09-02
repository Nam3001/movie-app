import { memo, useCallback, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, CardMedia, Typography } from '@mui/material'

import thumbnailPlaceholder from '@/assets/img/placeholder.png'
import  { DEFAULT_FUNC, BASE_URL_IMAGE } from '@/utils/constants/common'

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

const MovieItem = ({ id, title, overview, thumbnail, onClick = DEFAULT_FUNC }, ref) => {
	const thumbnailBaseURL = 'https://image.tmdb.org/t/p/original'
	thumbnail &&= thumbnailBaseURL + thumbnail

	const handleClick = useCallback(() => {
		if (id) onClick(id)
		// eslint-disable-next-line
	}, [id])

	return (
		<Box sx={styles.container} onClick={handleClick} ref={ref}>
			<Box sx={styles.thumbnailWrapper}>
				<CardMedia
					sx={styles.thumbnailImage}
					component="img"
					image={thumbnail || thumbnailPlaceholder}
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

const Component = forwardRef(MovieItem)

Component.propTypes = {
	title: PropTypes.string.isRequired,
	overview: PropTypes.string.isRequired,
	thumbnail: PropTypes.string,
	onClick: PropTypes.func,
	id: PropTypes.number
}

export default memo(Component)
