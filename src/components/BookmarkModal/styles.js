const styles = {
	modal: {
		backdropFilter: 'blur(4px)',
		'& .MuiDialog-container': {
			alignItems: 'center !important'
		},
		'& .MuiPaper-root': {
			borderRadius: {
				xs: 0,
				sm: '10px !important'
			},
			p: 1,
			backgroundColor: (theme) => theme.color.primary.light,
			width: {
				xs: '100vw',
				md: '866px'
			},
			height: {
				xs: '100vh',
				md: '560px'
			},
			maxWidth: {
				xs: '100vw',
				sm: '95vw'
			},
			maxHeight: {
				xs: '100vh',
				sm: '95vh'
			}
		}
	},
	btn: {
		backgroundColor: (theme) => theme.color.heading,
		borderColor: (theme) => theme.color.heading
	},
	title: {
		fontSize: '30px',
		color: '#fff'
	},
	content: {
		display: 'flex',
		flexDirection: {
			xs: 'column',
			sm: 'row'
		},
		alignItems: {
			xs: 'center',
			sm: 'flex-start'
		},
		mt: 1,
		overflow: 'auto'
	},
	thumbnail: {
		borderRadius: '10px',
		backgroundColor: '#212529',
		width: {
			xs: '200px',
			lg: '230px',
			xl: '246px'
		},
		height: {
			xs: '320px',
			lg: '340px',
			xl: '368px'
		},
		overflow: 'hidden',
		'& img': {
			width: '100%',
			height: '100%',
			objectFit: 'cover'
		}
	},
	mainContent: {
		ml: {
			xs: 0,
			sm: 4.5
		},
		mt: 2
	},
	movieName: {
		color: '#fff',
		fontSize: '24px',
		textAlign: {
			xs: 'center',
			sm: 'left'
		}
	},
	label: {
		color: '#fff',
		fontSize: '14px',
		my: 3,
		textAlign: {
			xs: 'center',
			sm: 'left'
		}
	},
	option: {
		justifyContent: 'center'
	},
	loading: {
		color: (theme) => theme.color.heading,
		width: '20px !important',
		height: '20px !important'
	}
}

export default styles