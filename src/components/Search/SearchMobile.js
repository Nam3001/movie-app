import { useState, useCallback, memo, useEffect } from 'react'
import { useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Dialog } from '@mui/material'
import { Fade, MenuItem } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate, useLocation } from 'react-router-dom'

import useSearchMovies from '@/hooks/useSearchMovies'
import SpinnerLoading from '@/components/SpinnerLoading'
import SearchInput from '../SearchInput'
import useDebounce from '@/hooks/useDebounce'
import config from '@/configs'
import { createPathname } from '@/utils/common'

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
})

const styles = {
    innerStyles: {
        marginTop: '60px',
        overflow: 'visible',
        width: '70vw',
        backgroundColor: 'transparent'
    },
    searchIcon: {
        p: {
            xs: 2,
            md: 1.5
        },
        marginTop: '4px',
        display: { xs: 'block', lg: 'none' }
    }
}

const SearchMobile = ({ placeholder, SuggestComponent }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [openSuggest, setOpenSuggest] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 200)

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

        handleHideModal()
        // eslint-disable-next-line
    }, [])

    const handleClickSuggestItem = useCallback(
        (id) => {
            if (!id) return
            setOpenSuggest(false)
            setOpenModal(false)
            setSearchTerm('')

            setTimeout(() => {
                // movie detail pathname
                const pathname = createPathname(config.routes.movieDetail, id)
                navigate(pathname)
            }, 0)
        },
        // eslint-disable-next-line
        []
    )

    const handleChange = useCallback((e) => {
        if (!openSuggest) setOpenSuggest(true)
        setSearchTerm(e.target.value)
        // eslint-disable-next-line
    }, [])

    const [openModal, setOpenModal] = useState(false)
    const handleShowModal = useCallback(() => setOpenModal(true), [])
    const handleHideModal = useCallback(() => setOpenModal(false), [])

    return (
        <Box className="search-mobile">
            <IconButton
                onClick={handleShowModal}
                color="inherit"
                sx={styles.searchIcon}
            >
                <SearchIcon
                    sx={{
                        color: '#fff',
                        fontSize: '28px',
                        height: '30px'
                    }}
                />
            </IconButton>
            {openModal && (
                <Dialog
                    PaperProps={{ sx: styles.innerStyles }}
                    TransitionComponent={Transition}
                    open={openModal}
                    onClose={handleHideModal}
                >
                    <Box sx={{ position: 'relative' }}>
                        <SearchInput
                            searchTerm={searchTerm}
                            onSearch={handleSearch}
                            onSearchChange={handleChange}
                            autoFocus
                            height="40px"
                            width="100%"
                            placeholder={placeholder}
                            xs="block"
                            md="none"
                        />
                        {openSuggest && (
                            <SuggestComponent
                                max_height="300px"
                                ref={rootRef}
                                className="suggest-results"
                                bgcolor="#fff"
                                mobile="true"
                            >
                                {suggests.map((result, idx) => {
                                    if (idx === suggests.length - 1) {
                                        return (
                                            <MenuItem
                                                ref={lastElementRef}
                                                key={result.id}
                                                onClick={() =>
                                                    handleClickSuggestItem(
                                                        result.id
                                                    )
                                                }
                                            >
                                                <span>{result.title}</span>
                                            </MenuItem>
                                        )
                                    } else {
                                        return (
                                            <MenuItem
                                                key={result.id}
                                                onClick={() =>
                                                    handleClickSuggestItem(
                                                        result.id
                                                    )
                                                }
                                            >
                                                <span>{result.title}</span>
                                            </MenuItem>
                                        )
                                    }
                                })}
                                {hasMore && suggests.length > 0 && (
                                    <SpinnerLoading />
                                )}
                            </SuggestComponent>
                        )}
                    </Box>
                </Dialog>
            )}
        </Box>
    )
}

SearchMobile.propTypes = {
    openSuggest: PropTypes.bool,
    suggests: PropTypes.array,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    onClickSuggestItem: PropTypes.func,
    placeholder: PropTypes.string,
    searchTerm: PropTypes.string,
    SuggestComponent: PropTypes.elementType
}

export default memo(SearchMobile)
