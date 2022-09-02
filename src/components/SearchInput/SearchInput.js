import React, { useEffect, memo, useCallback } from 'react'
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
        display: xs // block/none/...
    },
    [theme.breakpoints.up('lg')]: {
        display: lg // block/none/...
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
    sx,
    xs,
    lg,
    autoFocus,
    onSearch,
    searchTerm,
    onSearchChange,
    onFocus,
    onBlur
}) => {
    const inputRef = React.createRef()

    useEffect(() => {
        if (!autoFocus) return
        inputRef.current.focus()
    }, [inputRef, autoFocus])

    // Handle when user type enter to search movie
    const handleSearchMovie = useCallback((e) => {
        if (e.key !== 'Enter') return

        onSearch(e)
        inputRef.current.blur()
    }, [inputRef, onSearch])

    return (
        <Wrapper margin={margin} xs={xs} lg={lg} height={height} sx={sx}>
            <InputStyled

                value={searchTerm}
                type="search"
                inputMode="search"
                value={searchTerm}
                onKeyPress={handleSearchMovie}
                onChange={onSearchChange}
                inputRef={inputRef}
                width={width}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
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
    sx: PropTypes.object,
    xs: PropTypes.oneOf(['block', 'none', 'flex', 'inline-block']),
    lg: PropTypes.oneOf(['block', 'none', 'flex', 'inline-block']),
    autoFocus: PropTypes.bool,
    onSearch: PropTypes.func,
    searchTerm: PropTypes.string,
    onSearchChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
}

export default memo(SearchInput)
