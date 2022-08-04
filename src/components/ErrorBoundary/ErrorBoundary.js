import React, { PureComponent } from 'react'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export default class ErrorBoundary extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(err, errInfo) {
		if (this.props.onError) {
			this.props.onError(err, errInfo)
		}
	}

	render() {
		const { FallbackComponent, children } = this.props

		if (!this.state.hasError)
			return <React.Fragment>{children}</React.Fragment>

		return (
			<React.Fragment>
				{FallbackComponent ? (
					<FallbackComponent />
				) : (
					<Typography
						variant="body2"
						component="p"
						sx={{ color: '#fff' }}
					>
						Something went wrong!
					</Typography>
				)}
			</React.Fragment>
		)
	}
}

ErrorBoundary.propTypes = {
	FallbackComponent: PropTypes.func,
	onError: PropTypes.func
}
