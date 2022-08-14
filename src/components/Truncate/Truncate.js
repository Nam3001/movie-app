import { useState, useEffect, useCallback, memo } from 'react'
import { Typography, Button } from '@mui/material'
import PropTypes from 'prop-types'

const Truncate = ({ sx, children, length = 100 }) => {
	const [isMore, setIsMore] = useState(false)
	const [truncated, setTruncated] = useState(children)
	const willTruncate= children.length > length

	useEffect(() => {
		if (!willTruncate) return

		const truncatedText = `${children.slice(0, length)}...`
		setTruncated(() => isMore && willTruncate ? children : truncatedText)
	}, [isMore, children])

	const onToggleTruncate = useCallback(() => {
		setIsMore(!isMore)
	}, [isMore])

	return (
		<>
			<Typography sx={sx}>
				{truncated}
				{willTruncate && (
				<Button onClick={onToggleTruncate}>
					{isMore ? 'Show less' : 'Show more'}
				</Button>
			)}
			</Typography>
		</>
	)
}

Truncate.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.string,
	length: PropTypes.number
}

export default memo(Truncate)
