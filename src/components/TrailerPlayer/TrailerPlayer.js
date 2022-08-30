import { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

import { movieApi } from '@/utils/api'
import { YOUTUBE_BASE_LINK } from '@/utils/constants/common'

const styles = {
	container: {
		display: 'flex',
		flexFlow: 'column wrap',
		p: {
			xs: '16px',
			md: 0
		},
		width: {
			xs: '100%',
			md: '75%'
		},
		mx: 'auto',
		my: 5
	},
	title: {
		color: (theme) => theme.color.heading,
		fontSize: '32px',
		my: 2
	},
	playerContainer: {
		width: '100%',
		aspectRatio: '18/9',
		backgroundColor: '#212529'
	},
	player: {
		mx: 'auto',
		width: '100%',
		height: '100%'
	},
	maxWidth: '100%'
}

const TrailerPlayer = ({ movieId, id }) => {
	const [trailerUrl, setTrailerUrl] = useState('')

	useEffect(() => {
		;(async () => {
			const res = await movieApi.getTrailer(movieId)
			const trailerKey = res.data.results?.[0]?.key
			setTrailerUrl(`${YOUTUBE_BASE_LINK}/${trailerKey}`)
		})()
	}, [])

	return (
		<Box id={id} sx={styles.container}>
			<Typography sx={styles.title}>Trailer</Typography>
			<Box sx={styles.playerContainer}>
				<Box
					sx={styles.player}
					component="iframe"
					allow="fullscreen"
					frameBorder="0"
					src={trailerUrl}
				/>
			</Box>
		</Box>
	)
}

TrailerPlayer.propTypes = {
	id: PropTypes.string,
	movieId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default memo(TrailerPlayer)
