import { memo, useCallback, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, MenuItem, ClickAwayListener } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'

import useSearchMovies from '@/hooks/useSearchMovies'
import SpinnerLoading from '@/components/SpinnerLoading'
import SearchInput from '../SearchInput'
import useDebounce from '@/hooks/useDebounce'
import config from '@/configs'
import { createPathname } from '@/utils/common'

const SearchPC = ({ placeholder, SuggestComponent }) => {
    const navigate = useNavigate()
    const location = useLocation()

    // states
    const [openSuggest, setOpenSuggest] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 200)

    // refs
    const lastElementRef = useRef()
    const rootRef = useRef()

    // pass lastElementRef and rootRef to useSearchMovie
    const { hasMore, suggests } = useSearchMovies({
        searchTerm: debouncedSearch,
        lastElementRef,
        rootRef
    })

    useEffect(() => {
        const pathname = location.pathname
        if (pathname === config.routes.home) {
            setSearchTerm('')
        }
    }, [location.pathname])

    const handleSearch = useCallback((e) => {
        const searchQuery = encodeURIComponent(e.target.value)
        navigate({
            pathname: config.routes.search,
            search: `query=${searchQuery}`
        })

        setOpenSuggest(false)
        // eslint-disable-next-line
    }, [])

    const handleClickSuggestItem = useCallback((id) => {
        if (!id) return
        // movie detail pathname
        const pathname = createPathname(config.routes.movieDetail, id)
        navigate(pathname)

        setOpenSuggest(false)
        setSearchTerm('')
        // eslint-disable-next-line
    }, [])

    const handleChange = useCallback(
        (e) => {
            if (!openSuggest) setOpenSuggest(true)
            setSearchTerm(e.target.value)
        },
        [openSuggest]
    )

    const handleClickAway = useCallback(() => {
        setOpenSuggest(false)
    }, [])

    const handleFocus = useCallback(() => {
        if (suggests.length > 0) setOpenSuggest(true)
    }, [suggests])

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
                <SearchInput
                    sx={{ marginRight: '10px' }}
                    onFocus={handleFocus}
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    onSearchChange={handleChange}
                    placeholder={placeholder}
                    width="230px"
                    xs="none"
                    lg="block"
                />
                {openSuggest && (
                    <SuggestComponent
                        ref={rootRef}
                        className="suggest-results"
                        bgcolor="#fff"
                        open={openSuggest}
                        pc="true"
                    >
                        {suggests.map((suggest, idx) => {
                            {/* add lastElementRef at last suggest item to implement infinite scroll */}
                            if (idx === suggests.length - 1) {
                                return (
                                    <MenuItem
                                        ref={lastElementRef}
                                        key={suggest.id}
                                        onClick={() =>
                                            handleClickSuggestItem(suggest.id)
                                        }
                                    >
                                        <span>{suggest.title}</span>
                                    </MenuItem>
                                )
                            } else {
                                return (
                                    <MenuItem
                                        key={suggest.id}
                                        onClick={() =>
                                            handleClickSuggestItem(suggest.id)
                                        }
                                    >
                                        <span>{suggest.title}</span>
                                    </MenuItem>
                                )
                            }
                        })}
                        {hasMore && suggests.length > 0 && <SpinnerLoading />}
                    </SuggestComponent>
                )}
            </Box>
        </ClickAwayListener>
    )
}

SearchPC.propTypes = {
    openSuggest: PropTypes.bool,
    suggests: PropTypes.array,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    searchTerm: PropTypes.string,
    SuggestComponent: PropTypes.elementType,
    setOpenSuggest: PropTypes.func,
    onClickSuggestItem: PropTypes.func
}

export default memo(SearchPC)
