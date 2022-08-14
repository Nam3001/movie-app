import React, { useState, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Dialog, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search'
import SearchInput from '../SearchInput'
import SearchModal from './SearchModal'

const styles = {
    searchIcon: {
        pl: {
            xs: 2.5,
            md: 1
        },
        py: 2,
        mr: -0.8,
        marginTop: '4px',
        display: { xs: 'block', lg: 'none' }
    }
}

const Search = ({ width, placeholder, onSearchChange }) => {
    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)
    const handleShowModal = useCallback(() => setOpenModal(true), [])
    const handleHideModal = useCallback(() => setOpenModal(false), [])

    // search term
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = useCallback((e) => {
        const searchQuery = encodeURIComponent(e.target.value)
        navigate({
            pathname: '/search',
            search: `query=${searchQuery}`
        })

        setSearchTerm('')
        handleHideModal()
    }, [])

    const handleSearchChange = useCallback(e => {
        setSearchTerm(e.target.value)
    }, [])

    return (
        <>
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
                <SearchModal open={openModal} onClose={handleHideModal}>
                    <SearchInput
                        searchTerm={searchTerm}
                        onSearch={handleSearch}
                        onSearchChange={handleSearchChange}
                        autoFocus
                        height="40px"
                        width="100%"
                        placeholder={placeholder}
                        xs="block"
                        md="none"
                    />
                </SearchModal>
            </Box>
            <SearchInput
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onSearchChange={handleSearchChange}
                placeholder={placeholder}
                margin="0 10px 0 0"
                width="230px"
                xs="none"
                lg="block"
            />
        </>
    )
}

Search.propTypes = {}

export default memo(Search)
