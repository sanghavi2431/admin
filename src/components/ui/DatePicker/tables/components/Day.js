
import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../../../ConfigProvider'

function getDayTabIndex({ focusable, hasValue, selected, firstInMonth }) {
	if (!focusable) {
		return -1
	}

	if (hasValue) {
		return selected ? 0 : -1
	}

	return firstInMonth ? 0 : -1
}

const Day = forwardRef((props, ref) => {

	const {
		className,
		value,
		selected,
		weekend,
		outOfMonth,
		onMouseEnter,
		styles,
		hasValue,
		firstInRange,
		lastInRange,
		inRange,
		isToday,
		fullWidth,
		firstInMonth,
		focusable,
		hideOutOfMonthDates,
		renderDay,
		disabled,
		...others
	} = props

	const { themeColor, primaryColorLevel } = useConfig()

	return (
		<button
			{...others}
			type="button"
			ref={ref}
			disabled={disabled}
			onMouseEnter={(event) => onMouseEnter(value, event)}
			tabIndex={getDayTabIndex({ focusable, hasValue, selected, firstInMonth })}
			className={
				classNames(
					'date-picker-cell-content',
					disabled && 'date-picker-cell-disabled',
					isToday && `border border-${"gray"}-${"500"}`,
					(weekend && !disabled) && 'date-picker-cell-weekend',
					(outOfMonth && !disabled) && 'date-picker-other-month',
					(outOfMonth && hideOutOfMonthDates) && 'd-none',
					(!outOfMonth && !disabled && !selected) && 'date-picker-cell-current-month',
					(!disabled && !selected && !inRange) && 'date-picker-cell-hoverable',
					(selected && !disabled) && `bg-${"gray"}-${"500"} text-gray-100`,
					(inRange && !disabled && !firstInRange && !lastInRange && !selected) && `bg-${"gray"}-${"500"} bg-opacity-10`,
					(!inRange && !firstInRange && !lastInRange) && 'rounded-lg',
					(firstInRange && !disabled) && 'rounded-tl-lg rounded-bl-lg',
					(lastInRange && !disabled) && 'rounded-tr-lg rounded-br-lg',
					className
				)
			}
		>
			{typeof renderDay === 'function' ? renderDay(value) : value?.getDate()}
		</button>
	)
})

export default Day