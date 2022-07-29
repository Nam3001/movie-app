import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, Drawer, List, ListItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const styles = {
	paper: {
		backgroundColor: (theme) => theme.color.primary.main,
		color: (theme) => theme.color.nav,
		width: '280px',
		padding: '0 40px',
		paddingTop: '50px'
	},
	menuItem: {
		borderBottom: (theme) => '2px solid #8d9eac1a',
		padding: '16px 0',
		justifyContent: 'center',
		cursor: 'pointer'
	},
	closeIcon: {
		color: (theme) => theme.color.nav,
		fontSize: '34px'
	},
	closeBtn: {
		width: '60px',
		position: 'absolute',
		top: 0,
		right: 0
	}
}

const NavMenu = ({ items, display }) => {
	const [isShowMenu, setIsShowMenu] = useState(false)
	const toggleShowMenu = (value) => {
		setIsShowMenu(value)
	}

	return (
		<>
			<IconButton
				onClick={() => toggleShowMenu(true)}
				edge="start"
				color="inherit"
				aria-label="menu"
				size="large"
				sx={{ marginTop: '4px', display: display }}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor="left"
				open={isShowMenu}
				onClose={() => toggleShowMenu(false)}
				PaperProps={{ sx: styles.paper }}
			>
				<IconButton
					onClick={() => toggleShowMenu(false)}
					color="inherit"
					sx={styles.closeBtn}
				>
					<CloseIcon sx={styles.closeIcon} />
				</IconButton>
				<List
					sx={styles.menuList}
					onClick={() => toggleShowMenu(false)}
				>
					{items.map((item, idx) => (
						<ListItem key={idx} sx={styles.menuItem}>
							{item.title}
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	)
}

NavMenu.propTypes = {
	items: PropTypes.array,
	display: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default NavMenu
