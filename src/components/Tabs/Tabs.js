import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

import { DEFAULT_FUNC } from '@/utils/constants/common'

const styles = {
    root: {
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center'
    },
    tab: {
        padding: '18px 10px',
        fontSize: '17px',
        cursor: 'pointer',
        '& + li': {
            marginLeft: '24px'
        },
        padding: '10px 4px',
        color: '#9ca3af',
        textDecoration: 'none',
        '&.active': {
            borderBottom: (theme) => `2px solid ${theme.color.heading}`,
            color: '#fff'
        }
    }
}


const Tabs = ({ tabs = [], onClick = DEFAULT_FUNC, rootSx, tabSx }) => {
    return (
        <Box component="ul" sx={{ ...styles.root, ...rootSx }}>
            {tabs?.map?.((tab) => (
                <Box
                    component="li"
                    key={tab.name}
                    sx={{ ...styles.tab, tabSx }}
                    className={clsx({ active: tab?.active })}
                    onClick={() => onClick(tab.name)}
                >
                    <Box>{tab?.name}</Box>
                </Box>
            ))}
        </Box>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.array,
    onClick: PropTypes.func,
    rootSx: PropTypes.object,
    tabSx: PropTypes.object,
}

export default Tabs
