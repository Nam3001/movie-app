import { useState, useCallback, memo } from 'react'
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

/* panes: [
    { header: '', render: () => {} }
    ] 
*/

const Tabs = ({
    tabs = [],
    onClick = DEFAULT_FUNC,
    rootSx,
    tabSx,
    panes = []
}) => {
    const [active, setActive] = useState(panes?.[0].header)
    const handleClickHeader = useCallback((name) => {
        setActive(name)
    }, [])

    return (
        <>
            <Box component="ul" sx={{ ...styles.root, ...rootSx }}>
                {panes?.map?.((panel, idx) => (
                    <Box
                        component="li"
                        key={idx}
                        sx={{ ...styles.tab, tabSx }}
                        onClick={() => handleClickHeader(panel.header)}
                        className={clsx({ active: active === panel.header })}
                    >
                        <Box>{panel?.header}</Box>
                    </Box>
                ))}
            </Box>
            {panes?.map?.((panel, idx) => {
                const Panel = panel?.render
                if (panel.header === active) {
                    return <Panel key={idx} />
                } else return null
            })}
        </>
    )
}

Tabs.propTypes = {
    tabs: PropTypes.array,
    onClick: PropTypes.func,
    rootSx: PropTypes.object,
    tabSx: PropTypes.object
}

export default memo(Tabs)
