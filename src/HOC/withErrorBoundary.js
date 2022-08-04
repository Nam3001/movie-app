import React, { PureComponent } from 'react'
import { Typography } from '@mui/material'

const withErrorBoundary = (Component, FallbackComponent, onError) => {
	return class extends PureComponent {
		constructor(props) {
			super(props)
			this.state = {
				hasError: false
			}
		}

		componentDidCatch(err, errInfo) {
			if (!onError) return
			onError(err, errInfo)
		}

		static getDerivedStateFromError() {
			return { hasError: true }
		}

		render() {
			if (this.state.hasError) {
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

			return <Component {...this.props} />
		}
	}
}

export default withErrorBoundary
