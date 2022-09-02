import React, { useState, useEffect, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Box, ClickAwayListener, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import clsx from 'clsx'

import './Select.scss'
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
    className,
    isMultiple = false,
    selected = {},
    handleChange = DEFAULT_FUNC,
    children,
    handleClear = DEFAULT_FUNC,
    handleRemove = DEFAULT_FUNC,
    sx = {}
}) => {
    const [isFocus, setIsFocus] = useState(false)
    const [openOptionList, setOpenOptionList] = useState(false)

    const anchorRef = React.useRef(null)
    const menuRef = React.useRef(null)

    const handleCloseOptionList = useCallback(() => {
        setIsFocus(false)
        setOpenOptionList(false)
    }, [])

    const handleMultipleChange = useCallback(
        (newOption) => {
            const changedSelects = [...selected, newOption]
            handleChange(changedSelects)
        },
        [selected]
    )

    const handleMultipleRemove = useCallback(
        (optionValue) => {
            const newSelects = selected.filter(
                (select) => select?.value !== optionValue
            )
            handleRemove(newSelects)
        },
        [selected]
    )

    const handleClickSelectControl = useCallback((e) => {
        if (e.target.closest('.clear-indicator')) return

        setIsFocus((prev) => !prev)
        setOpenOptionList((prev) => !prev)
    }, [])

    const handleClickOption = useCallback(
        (e) => {
            const optionValue = e.target.getAttribute('value')
            const optionLabel = e.target.textContent

            if (isMultiple) {
                // toggle selecte value
                const valueExisted = selected.some(
                    (item) => item.value === optionValue
                )
                if (valueExisted) {
                   handleMultipleRemove(optionValue)
                } else {
                    handleMultipleChange({
                        value: optionValue,
                        label: optionLabel
                    })
                }
            } else {
                handleChange({
                    value: optionValue,
                    label: optionLabel
                })
                handleCloseOptionList()
            }
            // eslint-disable-next-line
        },
        [isMultiple, selected]
    )

    // mark selected option
    // render selected ui when option change
    useEffect(() => {
        const optionsElement = Array.from(menuRef.current.children)
        for (let optionEl of optionsElement) {
            const optionValue = optionEl.getAttribute('value')
            if (!optionValue) break

            if (isMultiple) {
                const itemActived = selected.some(
                    (item) => item?.value === optionValue
                )
                if (itemActived) {
                    optionEl.classList.add('active')
                } else optionEl.classList.remove('active')
            }

            if (!isMultiple) {
                if (selected?.value?.toString() === optionValue) {
                    optionEl.classList.add('active')
                } else optionEl.classList.remove('active')
            }
        }
    }, [selected])

    return (
        <ClickAwayListener onClickAway={handleCloseOptionList}>
            <Box className={className} sx={{ ...styles.container, ...sx }}>
                <SelectControl
                    ref={anchorRef}
                    className={clsx({ focus: isFocus })}
                    onClick={handleClickSelectControl}
                >
                    <Box
                        className="select-value-container"
                        sx={styles.selectValueContainer}
                    >
                        {isMultiple && Array.isArray(selected) ? (
                            <>
                                {selected?.length > 0 && (
                                    <Chip
                                        sx={styles.selectMultiLabel}
                                        label={selected?.[0].label}
                                        deleteIcon={<CloseIcon />}
                                        onDelete={() => handleMultipleRemove(
                                                selected?.[0].value
                                            )
                                        }
                                    />
                                )}
                                {selected?.length > 1 && (
                                    <ShowMore>{`+${
                                        selected?.length - 1
                                    }`}</ShowMore>
                                )}
                            </>
                        ) : (
                            <Box
                                className="selectValue"
                                sx={styles.selectValue}
                            >
                                {selected?.label}
                            </Box>
                        )}
                    </Box>

                    <Box
                        className="select-indicator-container"
                        sx={styles.selectIndicatorContainer}
                    >
                        {selected && (
                            <CloseIcon
                                onClick={handleClear}
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

                <MenuList show={openOptionList}>
                    <Box
                        ref={menuRef}
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

const selectType = PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string
})
Select.propTypes = {
    isMultiple: PropTypes.bool,
    selected: PropTypes.oneOfType([selectType, PropTypes.arrayOf(selectType)])
        .isRequired,
    handleChange: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    handleClear: PropTypes.func,
    handleRemove: PropTypes.func,
    sx: PropTypes.object,
    className: PropTypes.string
}

export default memo(Select)
