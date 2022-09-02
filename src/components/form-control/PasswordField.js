import { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { DEFAULT_FUNC } from '@/utils/constants/common'

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

const PasswordField = forwardRef((props, ref) => {
	const { placeholder, pill, sx, invalid, name, value = '' } = props
	const { onChange = DEFAULT_FUNC, onBlur = DEFAULT_FUNC } = props

	return (
		<Input
			placeholder={placeholder}
			sx={sx}
			pill={pill ? 'true' : undefined}
			invalid={invalid ? 'true' : undefined}
			name={name}
			type="password"
			inputMode="password"
			onChange={onChange}
			value={value}
			onBlur={onBlur}
			ref={ref}
		/>
	)
})

PasswordField.propTypes = {
	placeholder: PropTypes.string,
	pill: PropTypes.bool,
	sx: PropTypes.object,
	invalid: PropTypes.bool,
	value: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	ref: PropTypes.any,
	name: PropTypes.string
}

export default memo(PasswordField)
