import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import Button from '@/components/Button'
import { DEFAULT_FUNC } from '@/utils/constants/common'

const Input = styled('input')(({ theme, ...props }) => ({
	fontSize: '16px',
	outline: 'none',
	padding: '12px',
	paddingRight: '110px',
	width: '100%',
	borderRadius: props.pill ? '40px' : '8px',
	backgroundColor: 'transparent',
	border: props.invalid ? '1px solid #d93025' : '1px solid #fff',
	caretColor: `${theme.color.heading}`,
	color: '#fff',
	'&:focus': {
		boxShadow: '0 0 0 1px #fff',
		border: '1px solid #fff'
	}
}))

const styles = {
	container: {
		mt: 1,
		position: 'relative',
		minWidth: '250px'
	},
	sendOTP: {
		position: 'absolute',
		top: '50%',
		right: 0,
		mr: '1px',
		transform: 'translateY(-50%)',
		fontSize: '15px',
		backgroundColor: (theme) => theme.color.heading,
		py: '12.5px',
		width: '100px'
	}
}

const VerifyField = ({
	placeholder,
	pill,
	sx,
	inputSx,
	invalid,
	name,
	value = '',
	onChange = DEFAULT_FUNC,
	onRequestOTP = DEFAULT_FUNC,
	disable = false,
	disableBtn = false,
}) => {
	return (
		<Box sx={{ ...styles.container, ...sx }}>
			<Input
				placeholder={placeholder}
				sx={inputSx}
				pill={pill ? 'true' : undefined}
				invalid={invalid ? 'true' : undefined}
				name={name}
				type="number"
				inputMode="number"
				onChange={onChange}
				value={value}
				disabled={disable}
			/>
			<Button
				onClick={onRequestOTP}
				sx={styles.sendOTP}
				pill
				color="warning"
				disable={disableBtn}
			>
				Gửi mã
			</Button>
		</Box>
	)
}

VerifyField.propTypes = {
	placeholder: PropTypes.string,
	pill: PropTypes.bool,
	sx: PropTypes.object,
	invalid: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onRequestOTP: PropTypes.func,
	disableBtn: PropTypes.bool
}

export default VerifyField
