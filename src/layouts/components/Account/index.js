import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Popper,
	Grow,
	Box,
	MenuList,
	Paper,
	ClickAwayListener,
	Typography
} from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

const styles = {
	menu: {
		mt: 1,
		backgroundColor: '#333',
		color: '#fff',
		px: 1.5,
		pt: 1.5
	},
	menuItem: {
		justifyContent: 'center',
		mb: 0.5,
		'&:hover': {
			borderRadius: 1,
			backgroundColor: '#999'
		}
	}
}

const Account = ({ className }) => {
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef(null)

	const handleToggle = () => {
		setOpen((prev) => !prev)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<IconButton
				ref={anchorRef}
				edge="start"
				color="inherit"
				aria-label="account"
				size="large"
				sx={{ ml: 1.5, p: 0 }}
				onClick={handleToggle}
			>
				<Avatar
					sx={{
						backgroundColor: (theme) => theme.color.primary.main
					}}
				>
					<PermIdentityIcon />
				</Avatar>
			</IconButton>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				placement="bottom-end"
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom-end'
									? 'right top'
									: 'right bottom'
						}}
					>
						<Paper sx={styles.menu}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList>
									<Box sx={{ mb: 1.2 }}>Nguyen Van Nam</Box>
									<MenuItem
										sx={styles.menuItem}
										onClick={handleClose}
									>
										<BookmarkBorderOutlinedIcon />
										<Typography variant="body2">
											Theo dõi
										</Typography>
									</MenuItem>
									<MenuItem
										sx={styles.menuItem}
										onClick={handleClose}
									>
										<LogoutOutlinedIcon />
										<Typography variant="body2">
											Đăng xuất
										</Typography>
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	)
}

Account.propTypes = {}

export default Account
