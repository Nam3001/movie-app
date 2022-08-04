import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'

const Wrapper = styled('div')(({ theme, margin, bgColor, height, xs, lg }) => ({
    position: 'relative',
    backgroundColor: bgColor || '#fff',
    height: height || '30px',
    borderRadius: '6px',
    margin: margin,
    [theme.breakpoints.up('xs')]: {
        display: xs
    },
    [theme.breakpoints.up('lg')]: {
        display: lg
    }
}))

const InputStyled = styled(InputBase)(({ theme, ...props }) => ({
    height: '100%',
    width: props.width || '200px',
    '& .MuiInputBase-input': {
        borderRadius: '6px',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        width: '100%',
        height: '100%',
        padding: '10px 12px',
        paddingRight: '28px',
        fontSize: 14,

        '&::placeholder': {
            fontSize: 13
        },
        '&:focus': {
            boxShadow: `${theme.palette.primary.main} 0 0 0 1px`
        }
    }
}))

const SearchIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginRight: '3px',
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvent: 'none',
    cursor: 'pointer'
})

const SearchInput = ({
    width,
    height,
    margin,
    placeholder,
    xs,
    lg,
    autoFocus
}) => {
    const inputRef = React.createRef()

    useEffect(() => {
        if (!autoFocus) return
        inputRef.current.focus()
    }, [inputRef, autoFocus])

    return (
        <Wrapper margin={margin} xs={xs} lg={lg} height={height}>
            <InputStyled
                type="search"
                inputMode="search"
                inputRef={inputRef}
                width={width}
                placeholder={placeholder}
            />
            <SearchIconWrapper>
                <SearchIcon sx={{ color: '#333' }} />
            </SearchIconWrapper>
        </Wrapper>
    )
}

SearchInput.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    placeholder: PropTypes.string,
    xs: PropTypes.string,
    lg: PropTypes.string,
    autoFocus: PropTypes.bool,
    searchTerm: PropTypes.string,
    onSearchChange: PropTypes.func
}

export default memo(SearchInput)