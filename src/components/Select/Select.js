import React, { useState, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    InputBase,
    MenuItem,
    ClickAwayListener,
    Chip
} from '@mui/material'
import './Select.scss'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styles from './styles'
import { DEFAULT_FUNC } from '@/utils/constants/common'

const SelectControl = styled('div')(({ theme, width }) => ({
    width: '100%',
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 5px 8px 8px',
    lineHeight: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#ccc',
    '&.focus': {
        borderColor: theme.color.heading,
        boxShadow: `0 0 0 1px ${theme.color.heading}`
    },
    '& input': {
        color: '#ccc',
        paddingLeft: '6px',
        width: '20px'
    },
    '& svg': {
        color: '#ccc',
        cursor: 'pointer'
    }
}))

const MenuList = styled(Box)((props) => ({
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '4px',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
    overflow: 'hidden',
    boxShadow: '1px 0 5px 1px #444',
    display: props.show ? 'block' : 'none',

    '& li.active': {
        backgroundColor: '#ccc !important'
    }
}))

const ShowMore = styled(Box)(({ theme }) => ({
    fontSize: '9px',
    backgroundColor: theme.color.primary.light,
    borderRadius: '2px',
    color: '#fff',
    marginLeft: '4px',
    padding: '1px 3px'
}))

const Select = ({
    isMultiple = false,
    selectValue,
    onChange = DEFAULT_FUNC,
    children,
    onClear = DEFAULT_FUNC,
    onRemove = DEFAULT_FUNC,
    sx = {}
}) => {
    const [isFocus, setIsFocus] = useState(false)

    const [openOptionList, setOpenOptionList] = useState(false)
    const anchorRef = React.useRef(null)
    const menuRef = React.useRef(null)
    const inputRef = React.useRef(null)

    // apply for input
    const handleFocus = useCallback(() => {
        setIsFocus(true)
        inputRef.current.focus()
    }, [inputRef.current])

    const handleBlur = useCallback(() => {
        setIsFocus(false)
        inputRef.current.blur()
    }, [inputRef.current])

    const handleOpenOptionList = useCallback(() => setOpenOptionList(true), [])
    const handleCloseOptionList = useCallback(() => {
        setOpenOptionList(false)
    }, [])

    const handleClickSelectControl = useCallback((e) => {
        if (e.target.closest('.clear-indicator')) return

        handleFocus()
        setOpenOptionList((prev) => !prev)
    }, [])

    const handleClose = useCallback(() => {
        handleBlur()
        handleCloseOptionList()
    }, [])

    const handleClickOption = useCallback((e) => {
        const optionValue = e.target.getAttribute('value')
        inputRef.current.focus()

        if (isMultiple) {
            if (selectValue.includes(optionValue)) onRemove(optionValue)
            else onChange(optionValue)
        } else {
            onChange(optionValue)
            handleCloseOptionList()
        }
    }, [inputRef.current, isMultiple, selectValue, onChange])

    useEffect(() => {
        // mark selected option
        const menuItems = Array.from(menuRef.current.children)
        for (let item of menuItems) {
            const itemValue = item.getAttribute('value')

            if (Array.isArray(selectValue)) {
                if (selectValue?.includes(itemValue)) {
                    item.classList.add('active')
                } else item.classList.remove('active')
            } else {
                if (selectValue?.toString().includes(itemValue)) {
                    item.classList.add('active')
                } else item.classList.remove('active')
            }
        }
    }, [selectValue])

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ ...styles.container, ...sx }}>
                <SelectControl
                    ref={anchorRef}
                    className={clsx({ focus: isFocus })}
                    onClick={handleClickSelectControl}
                >
                    <Box
                        className="select-value-container"
                        sx={styles.selectValueContainer}
                    >
                        {isMultiple && Array.isArray(selectValue) ? (
                            <>
                                {selectValue?.length > 0 && (
                                    <Chip
                                        sx={styles.selectMultiLabel}
                                        label={
                                            isMultiple
                                                ? selectValue?.[0]
                                                : selectValue
                                        }
                                        deleteIcon={<CloseIcon />}
                                        onDelete={() =>
                                            onRemove(selectValue?.[0])
                                        }
                                    />
                                )}
                                {selectValue?.length > 1 && (
                                    <ShowMore>{`+${
                                        selectValue?.length - 1
                                    }`}</ShowMore>
                                )}
                            </>
                        ) : (
                            <Box
                                className="selectValue"
                                sx={styles.selectValue}
                            >
                                {selectValue}
                            </Box>
                        )}
                        <InputBase
                            inputRef={inputRef}
                            className="select-input"
                            sx={styles.selectInput}
                        />
                    </Box>

                    <Box
                        className="select-indicator-container"
                        sx={styles.selectIndicatorContainer}
                    >
                        {selectValue && (
                            <CloseIcon
                                onClick={onClear}
                                className={clsx('clear-indicator', {
                                    muted: openOptionList
                                })}
                                sx={styles.clearIndicator}
                            />
                        )}
                        <Box className="seperator" sx={styles.seperetor}></Box>
                        <KeyboardArrowDownIcon
                            className={clsx('select-indicator', {
                                muted: openOptionList
                            })}
                            sx={styles.selectIndicator}
                        />
                    </Box>
                </SelectControl>

                <MenuList ref={menuRef} show={openOptionList}>
                    <Box
                        onClick={handleClickOption}
                        className="option-list"
                        sx={{ overflow: 'auto', maxHeight: '300px' }}
                    >
                        {children}
                    </Box>
                </MenuList>
            </Box>
        </ClickAwayListener>
    )
}

Select.propTypes = {
    isMultiple: PropTypes.bool,
    selectValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onClear: PropTypes.func,
    onRemove: PropTypes.func,
    sx: PropTypes.object
}

export default Select
