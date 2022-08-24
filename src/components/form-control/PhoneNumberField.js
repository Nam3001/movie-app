import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DEFAULT_FUNC } from '@/utils/constants/common'

const Input = styled('input')(({ theme, ...props }) => ({
	fontSize: '16px',
	outline: 'none',
	padding: '12px',
	paddingLeft: '80px',
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
		minWidth: '250px',
	},
	countryCode: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		color: '#ddd',
		ml: 1.8,
	}
}

const PhoneNumberField = ({
	placeholder,
	pill,
	sx,
	inputSx,
	invalid,
	name,
	value = '',
	onChange = DEFAULT_FUNC
}) => {
	return (
		<Box sx={{ ...styles.container, ...sx }}>
			<Box sx={styles.countryCode}>
				VN +84
			</Box>
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
			/>
		</Box>
	)
}

PhoneNumberField.propTypes = {
	placeholder: PropTypes.string,
	pill: PropTypes.bool,
	sx: PropTypes.object,
	invalid: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func
}

export default PhoneNumberField
