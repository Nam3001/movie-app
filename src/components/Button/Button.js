import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const colors = {
	primary: '#0D6EFD',
	secondary: '#6C757D',
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
	cursor: props.disabled ? 'not-allowed' : 'pointer',
	color: '#fff',
	minWidth: '70px',
	border: `1px solid ${props.color ? colors[props.color] : colors.primary}`,
	backgroundColor: props.color ? colors[props.color] : colors.primary,
	display: props.display === 'block' ? 'block' : null,
	padding: props.size ? sizes[props.size].padding : sizes.md.padding,
	fontSize: props.size ? sizes[props.size].fontSize : sizes.md.fontSize,
	opacity: props.disabled ? 0.6 : 1,
	borderRadius:
		(props.pill
			? sizes?.[props?.size]?.borderRadiusPill
			: sizes?.[props?.size]?.borderRadius) ||
		(props.pill ? sizes?.md?.borderRadiusPill : sizes?.md?.borderRadius),
	'& + .button-container': {
		marginLeft: props.inline ? '10px' : '0'
	},
	'&:hover': {
		opacity: props.disabled ? 0.5 : 0.85
	}
}))

const OutlineButton = styled('button')(({ theme, ...props }) => ({
	cursor: props.disabled ? 'not-allowed' : 'pointer',
	backgroundColor: 'transparent',
	minWidth: '70px',
	border: `1px solid ${colors[props.color]}`,
	display: props.display === 'block' ? 'block' : null,
	color: colors[props.color],
	padding: props.size ? sizes[props.size].padding : sizes.md.padding,
	fontSize: props.size ? sizes[props.size].fontSize : sizes.md.fontSize,
	borderRadius:
		(props.pill
			? sizes?.[props?.size]?.borderRadiusPill
			: sizes?.[props?.size]?.borderRadius) ||
		(props.pill ? sizes?.md?.borderRadiusPill : sizes?.md?.borderRadius),
	'& + .button-container': {
		marginLeft: props.inline ? '10px' : '0'
	},
	'&:hover': {
		backgroundColor: props.disabled ? 'transparent' : colors[props.color],
		color: '#fff'
	}
}))

const Button = ({
	className,
	id,
	sx,
	children,
	onClick,
	type,
	inline,
	variant,
	color,
	pill,
	size,
	disabled,
	href
}) => {
	let component = 'div'
	const props = {}
	if (href) {
		component = 'a'
		props.href = href
	}
	if (onClick) props.onClick = onClick

	return (
		<>
			<Box
				component={component}
				href={href}
				className="button-container"
				sx={{
					display: 'inline-block',
					'& + .button-container': {
						marginLeft: inline ? '10px' : '0'
					}
				}}
			>
				{variant !== 'outline' ? (
					<FillButton
						id={id}
						type={type}
						className={className}
						sx={sx}
						variant={variant}
						color={color}
						size={size}
						disabled={disabled}
						inline={inline}
						pill={pill ? 'true' : undefined}
					>
						{children}
					</FillButton>
				) : (
					<OutlineButton
						id={id}
						type={type}
						className={className}
						sx={sx}
						variant={variant}
						color={color}
						size={size}
						inline={inline}
						disabled={disabled}
						pill={pill ? 'true' : undefined}
					>
						{children}
					</OutlineButton>
				)}
			</Box>
		</>
	)
}

Button.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	children: PropTypes.any,
	sx: PropTypes.object,
	type: PropTypes.string,
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
	pill: PropTypes.bool,
	disabled: PropTypes.bool,
	href: PropTypes.string
}

export default memo(Button)
