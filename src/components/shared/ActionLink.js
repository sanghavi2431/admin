import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useThemeClass from '@/utils/hooks/useThemeClass'

const ActionLink = props => {
	
	const { children, className, themeColor = false, to, href = '', ...rest } = props

	const { textTheme } = useThemeClass()

	const classNameProps = {
		className: classNames(themeColor && textTheme, 'underline hover:no-underline', className)
	}

	return (
		to 
		? 
			<Link
				to={to}
				{...classNameProps}
				{...rest} 
			>
				{children}
			</Link>
		:
		<a href={href} {...classNameProps} {...rest}>
			{children}
		</a>
	
	)
}

ActionLink.propTypes = {
	themeColor: PropTypes.bool,
	to: PropTypes.string
}

ActionLink.defaultProps = {
	themeColor: true
}

export default ActionLink