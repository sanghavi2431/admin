import React from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import { useForm } from '../context'
import { useConfig } from '../../ConfigProvider'
import { CONTROL_SIZES, SIZES, LAYOUT } from '../../utils/constant'

const FormItem = React.forwardRef((props, ref) => {

    const {
        children,
        label,
        labelClass,
        errorMessage,
        invalid,
        className,
        layout,
        labelWidth,
        asterisk,
        style,
        size,
        extra,
        htmlFor,
        inline=false
    } = props

    const formContext = useForm()
    const { controlSize } = useConfig()
    
    const formItemLabelHeight = size || formContext.size || controlSize
    const formItemLabelWidth = labelWidth || formContext.labelWidth
    const formItemLayout = layout || formContext.layout

    const getFormLabelLayoutClass = () => {
        switch (formItemLayout) {
            case LAYOUT.HORIZONTAL:
                return label ? `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}` : 'ltr:pr-2 rtl:pl-2'
            case LAYOUT.VERTICAL:
                return `mb-2`
            case LAYOUT.INLINE:
                return `h-${CONTROL_SIZES[formItemLabelHeight]} ${label && 'ltr:pr-2 rtl:pl-2'}`
            default:
                break
        }
    }

    const formItemClass = classNames(
        'form-item', 
        formItemLayout, 
        className, 
        invalid ? 'invalid' : ''
    )

    const formLabelClass = classNames(
        'form-label',
        (label && getFormLabelLayoutClass()),
        labelClass
    )

    const formLabelStyle = () => {
        if (formItemLayout === LAYOUT.HORIZONTAL) {
            return {...style, ...{minWidth: formItemLabelWidth} }
        }

        return {...style}
    }

    const enterStyle = { opacity: 1, marginTop: 3}
	const exitStyle = { opacity: 0, marginTop: -10}
	const initialStyle =  exitStyle

    const divClass=formItemLayout === LAYOUT.HORIZONTAL ? 'w-full flex flex-col justify-center relative' :''

    const classes=inline?`${divClass} flex items-center`:divClass

    return (
        <div ref={ref} className={formItemClass}>
            <label 
                htmlFor={htmlFor} 
                className={formLabelClass}
                style={formLabelStyle()}
            >
                {asterisk && <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>}
                {label}
                {extra && <span>{extra}</span>}
                {(label && formItemLayout !== 'vertical') && ':'}
            </label>
            <div className={classes}>
                {children}
                <AnimatePresence exitBeforeEnter>
					{invalid && (
						<motion.div
                            className="form-explain"
							initial={initialStyle}
							animate={enterStyle}
							exit={exitStyle}
							transition={{ duration: 0.15, type: 'tween' }}
						>
							{errorMessage}
						</motion.div>
					)}
				</AnimatePresence>
            </div>
        </div>
    )
})


FormItem.propTypes = {
	layout: PropTypes.oneOf([LAYOUT.HORIZONTAL, LAYOUT.VERTICAL, LAYOUT.INLINE]),
    size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
    labelWidth: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
    errorMessage: PropTypes.string,
    invalid: PropTypes.bool,
    asterisk: PropTypes.bool,
    extra:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
    htmlFor: PropTypes.string,
    labelClass: PropTypes.string,
    inline:PropTypes.bool,
}


export default FormItem