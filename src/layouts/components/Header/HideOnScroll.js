import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Slide, useScrollTrigger } from '@mui/material'

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger()
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired
}

export default memo(HideOnScroll)
