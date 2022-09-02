import { useState, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Fade, Box, Button } from '@mui/material'

const styles = {
	btn: {
		position: 'fixed',
		bottom: '30px',
		right: '30px'
	}
}

const ScrollTop = ({ children }) => {
	const [trigger, setTrigger] = useState(false)

	const setSmoothScrollBehavior = useCallback(() => {
		const scrollBehavior = document.documentElement.style.scrollBehavior
		const isSmooth = scrollBehavior === 'smooth'
		document.documentElement.style.scrollBehavior = 'smooth'
	}, [])


	const disableSmoothScrollBehavior = useCallback(() => {
		document.documentElement.style.scrollBehavior = 'auto'
	}, [])


	useEffect(() => {
		setSmoothScrollBehavior()
		return () => disableSmoothScrollBehavior()
	}, [])

	const handleClick = useCallback(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		const handleToggleTrigger = () => {
			const scrollTop =
				window.scrollY || document.documentElement.scrollTop
			if (scrollTop >= 300) {
				setTrigger(true)
			} else {
				setTrigger(false)
			}
		}
		window.addEventListener('scroll', handleToggleTrigger)
		return () => window.removeEventListener('scroll', handleToggleTrigger)
	}, [])

	return (
		<Fade in={trigger}>
			<Box onClick={handleClick} sx={styles.btn}>
				{children || <Button>To top</Button>}
			</Box>
		</Fade>
	)
}

ScrollTop.propTypes = {
	children: PropTypes.element
}

export default memo(ScrollTop)
