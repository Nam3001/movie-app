import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Fade } from '@mui/material'
import { DEFAULT_FUNC } from '@/utils/constants/common'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const innerStyles = {
    marginTop: '60px',
    overflow: 'visible',
    width: '70vw',
    backgroundColor: 'transparent'
}

const SearchModal = ({ open = false, onClose = DEFAULT_FUNC, children }) => {
    return (
        <Dialog
            PaperProps={{ sx: innerStyles }}
            TransitionComponent={Transition}
            open={open}
            onClose={onClose}
        >
            {children}
        </Dialog>
    )
}

SearchModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
}

export default memo(SearchModal)
