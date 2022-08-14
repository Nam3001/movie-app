import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const styles = {
    root: {
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center'
    },
    tab: {
        padding: '18px 10px',
        fontSize: '17px',
        '& + li': {
            marginLeft: '24px'
        }
    },
    link: {
        padding: '10px 4px',
        color: '#9ca3af',
        textDecoration: 'none',
        '&.active': {
            borderBottom: (theme) => `2px solid ${theme.color.heading}`,
            color: '#fff'
        }
    }
}

// tabs prop is array: [{ name, to }, ...]

const Tabs = ({ tabs, rootSx, tabSx }) => {
    return (
        <Box component="ul" sx={{ ...styles.root, ...rootSx }}>
            {tabs?.map?.((tab, i) => (
                <Box component="li" key={i} sx={{ ...styles.tab, tabSx }}>
                    <Box
                        sx={styles.link}
                        component={NavLink}
                        className={({ isActive }) => clsx({ active: isActive })}
                        to={tab?.to}
                    >
                        {tab?.name}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.array,
    rootSx: PropTypes.object,
    tabSx: PropTypes.object
}

export default Tabs
