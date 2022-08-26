import React, { forwardRef } from 'react'
import { Typography, Box, InputBase } from '@mui/material'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { DEFAULT_FUNC } from '@/utils/constants/common'
import clsx from 'clsx'

const Input = styled('input')(({ theme, ...props }) => ({
	fontSize: '16px',
	outline: 'none',
	padding: '12px 22px',
	minWidth: '250px',
	width: '100%',
	height: '100%',
	borderRadius: props.pill ? '40px' : '8px',
	backgroundColor: 'transparent',
	border: props.invalid ? '1px solid #e92040' : '1px solid #fff',
	caretColor: `${theme.color.heading}`,
	backgroundColor: 'transparent',
	color: '#fff',
	'&:focus': {
		boxShadow: `0 0 0 1px ${props.invalid ? '#e92040' : '#fff'}`,
		borderColor: props.invalid ? '#e92040' : '#fff'
	},
	'&::placeholder': {
		color: props.invalid ? '#fff' : '#fff'
	}
}))

const styles = {
	feedback: {
		fontSize: '14px',
		paddingLeft: '14px',
		mt: 0.5,
		fontWeight: '400',
		'&.invalid': {
			color: '#e92040'
		}
	}
}

const InputField = forwardRef(
	(
		{
			placeholder,
			pill,
			sx,
			type = 'text',
			inputMode = 'text',
			value = '',
			onChange = DEFAULT_FUNC,
			onBlur = DEFAULT_FUNC,
			name,
			invalid,
			errorMessage
		},
		ref
	) => {
		return (
			<Box className="form-group">
				<Input
					placeholder={placeholder}
					sx={sx}
					pill={pill ? 'true' : undefined}
					invalid={invalid ? 'true' : undefined}
					name={name}
					type={type}
					value={value}
					inputMode={inputMode}
					onChange={onChange}
					onBlur={onBlur}
					ref={ref}
				/>
				<Typography
					sx={styles.feedback}
					className={clsx('feedback', { invalid })}
				>
					{errorMessage}
				</Typography>
			</Box>
		)
	}
)

InputField.propTypes = {
	placeholder: PropTypes.string,
	pill: PropTypes.bool,
	sx: PropTypes.object,
	invalid: PropTypes.bool,
	type: PropTypes.string,
	inputMode: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onChange: PropTypes.func,
	onChange: PropTypes.func,
	errorMessage: PropTypes.string
}

export default InputField
