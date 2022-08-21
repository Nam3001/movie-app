import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

const Input = styled('input')(({ theme, ...props }) => ({
	fontSize: '16px',
	outline: 'none',
	padding: '12px',
	minWidth: '250px',
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

const InputField = ({ placeholder, pill, sx, invalid }) => {
	return (
		<Input
			placeholder={placeholder}
			sx={sx}
			pill={pill ? 'true' : undefined}
			invalid={invalid ? 'true' : undefined}
		/>
	)
}

InputField.propTypes = {}

export default InputField
