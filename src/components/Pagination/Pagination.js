import React from 'react'
import PropTypes from 'prop-types'
import { Pagination as MuiPagination } from '@mui/material'

import { DEFAULT_FUNC } from '@/utils/constants/common'

const styles = {
	pagination: {
		marginTop: '50px',
		marginBottom: '10px',

		'.MuiPaginationItem-root': {
			color: '#fff',
			borderColor: (theme) => theme.color.nav
		},

		'.MuiPagination-ul': {
			justifyContent: 'center'
		},
		'& .Mui-selected': {
			backgroundColor: (theme) => `${theme.color.nav} !important`
		},
		'& .Mui-selected:hover': {
			backgroundColor: (theme) => `${theme.color.nav} !important`
		}
	}
}

const Pagination = ({ maxPage = 1, page = 1, onPageChange = DEFAULT_FUNC}) => {
	return (
		<MuiPagination
			shape="rounded"
			page={page}
			onChange={onPageChange}
			sx={styles.pagination}
			count={maxPage}
		/>
	)
}

Pagination.propTypes = {
	maxPage: PropTypes.number,
	page: PropTypes.number,
	onPageChange: PropTypes.func
}

export default Pagination
