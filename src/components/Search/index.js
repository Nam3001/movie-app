import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, IconButton, Dialog, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SearchInput from '../SearchInput'
import SearchModal from './SearchModal'


const Search = ({
	width,
	placeholder,
	searchTerm,
	onSearchChange
}) => {
	const [openModal, setOpenModal] = useState(false)
	const handleShowModal = () => setOpenModal(true)
	const handleHideModal = () => setOpenModal(false)

	return (
		<>
			<Box className="search-mobile">
				<IconButton
					onClick={handleShowModal}
					color="inherit"
					sx={{
						mr: -0.8,
						ml: 0.8,
						marginTop: '4px',
						display: { xs: 'block', md: 'none' }
					}}
				>
					<SearchIcon
						sx={{
							color: '#fff',
							fontSize: '26px',
							height: '30px'
						}}
					/>
				</IconButton>
				<SearchModal open={openModal} onClose={handleHideModal}>
					<SearchInput autoFocus height="40px" width="100%" placeholder={placeholder} xs="block" md="none" />
				</SearchModal>
			</Box>
			<SearchInput placeholder={placeholder} xs="none" md="block" />
		</>
	)
}

Search.propTypes = {

}

export default Search
