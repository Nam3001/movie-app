import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, Fade } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />
})

const innerStyles = {
	marginTop: '60px',
	overflow: 'visible',
	width: '70vw',
	backgroundColor: 'transparent',
}

const SearchModal = ({ open, onClose, children }) => {
	return (
		<Dialog PaperProps={{ sx: innerStyles }} TransitionComponent={Transition} open={open} onClose={onClose}>
			{children}
		</Dialog>
	)
}

SearchModal.propTypes = {}

export default SearchModal
