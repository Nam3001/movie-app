const styles = {
	container: {
		position: 'relative',
	},
	selectIndicatorContainer: {
		display: 'flex',
		alignItems: 'center',
		'& svg:hover, & svg.muted': {
			color: '#8b8b8b'
		}
	},
	selectIndicator: {},
	clearIndicator: {
		fontSize: '18px'
	},
	selectValueContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	selectInput: {},
	selectValue: {},
	selectMultiLabel: {
		borderRadius: 1,
		height: 'auto',
		maxWidth: '70px',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		padding: '5px 0',
		bgcolor: (theme) => theme.color.primary.light,
		'& *': {
			color: '#fff !important'
		},
		'& svg': {
			fontSize: '16px !important'
		},
		'& span': {
			padding: '0 6px',
			marginRight: '3px'
		}
	},
	seperetor: {
		width: '1px',
		borderLeft: '1px solid #ccc',
		height: '24px',
		margin: '0 5px'
	}
}

export default styles