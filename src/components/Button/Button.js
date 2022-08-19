import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

import { DEFAULT_FUNC } from '@/utils/constants/common'

const colors = {
	primary: '#0D6EFD',
	secondary: '#DCE0E3',
	info: '#3898EC',
	warning: '#FFC107',
	danger: '#E46466',
	dark: '#212529',
	success: '#198754',
	light: '#F8F9FA'
}
const sizes = {
	sm: {
		padding: '8px',
		fontSize: '14px',
		borderRadius: '4px',
		borderRadiusPill: '20px'
	},
	md: {
		padding: '12px',
		fontSize: '16px',
		borderRadius: '6px',
		borderRadiusPill: '30px'
	},
	lg: {
		padding: '16px',
		fontSize: '18px',
		borderRadius: '10px',
		borderRadiusPill: '50px'
	}
}

const FillButton = styled('button')(({ theme, ...props }) => ({
	cursor: 'pointer',
	border: 'none',
	fontSize: '16px',
	backgroundColor: props.color ? colors[props.color] : colors.primary,
	color: '#fff',
	display: props.display === 'block' ? 'block' : null,
	padding: props.size ? sizes[props.size].padding : sizes.md.padding,
	fontSize: props.size ? sizes[props.size].fontSize : sizes.md.fontSize,
	borderRadius:
		(props.pill
			? sizes?.[props?.size]?.borderRadiusPill
			: sizes?.[props?.size]?.borderRadius) ||
		(props.pill ? sizes?.md?.borderRadiusPill : sizes?.md?.borderRadius),
	'& + button': {
		marginLeft: props.display === 'inline-block' ? '10px' : '0'
	},
	'&:hover': {
		opacity: 0.9
	}
}))

const OutlineButton = styled('button')(({ theme, ...props }) => ({
	cursor: 'pointer',
	border: `1px solid ${colors[props.color]}`,
	fontSize: '16px',
	display: props.display === 'block' ? 'block' : null,
	backgroundColor: 'transparent',
	color: colors[props.color],
	padding: props.size ? sizes[props.size].padding : sizes.md.padding,
	fontSize: props.size ? sizes[props.size].fontSize : sizes.md.fontSize,
	borderRadius:
		(props.pill
			? sizes?.[props?.size]?.borderRadiusPill
			: sizes?.[props?.size]?.borderRadius) ||
		(props.pill ? sizes?.md?.borderRadiusPill : sizes?.md?.borderRadius),
	'& + button': {
		marginLeft: props.display === 'inline-block' ? '10px' : '0'
	},
	'&:hover': {
		backgroundColor: colors[props.color],
		color: '#fff'
	}
}))

const Button = ({
	className,
	sx,
	children,
	onClick = DEFAULT_FUNC,
	display = 'inline-block',
	variant,
	color,
	pill,
	size
}) => {
	return (
		<>
			{variant !== 'outline' ? (
				<FillButton
					className={className}
					sx={sx}
					onClick={onClick}
					variant={variant}
					color={color}
					size={size}
					display={display}
					pill={pill && 'true'}
				>
					{children}
				</FillButton>
			) : (
				<OutlineButton
					className={className}
					sx={sx}
					onClick={onClick}
					variant={variant}
					color={color}
					size={size}
					display={display}
					pill={pill && 'true'}
				>
					{children}
				</OutlineButton>
			)}
		</>
	)
}

Button.propTypes = {
	children: PropTypes.any,
	onClick: PropTypes.func,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	variant: PropTypes.oneOf(['outline', 'fill', 'link']),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'info',
		'danger',
		'warning',
		'dark',
		'success',
		'light'
	]),
	pill: PropTypes.bool
}

export default Button
