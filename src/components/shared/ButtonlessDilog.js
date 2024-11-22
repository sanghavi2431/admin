import React from 'react'
import { 
	HiCheckCircle, 
	HiOutlineInformationCircle, 
	HiOutlineExclamation, 
	HiOutlineExclamationCircle 
} from 'react-icons/hi'
import { Avatar, Button, Dialog, } from 'components/ui'
import PropTypes from 'prop-types'

const ButtonlessDialog = props => {

	const { 
		type, 
		title, 
		children,
		onCancel,
		onConfirm,
		cancelText,
		confirmText,
		confirmButtonColor,
		width,
		...rest
	} = props

	const handleCancel = () => {
		onCancel?.()
	} 

	const handleConfirm = () => {
		onConfirm?.()
	}
 
	return (
		<Dialog
			style={{
				marginTop: 250			}}
			contentClassName="pb-0 px-0"
			width={width&& width}
			// height={650}
			{...rest}
		>
			<div className="px-6 pb-6 pt-2 ">
				<div className="ml-4 rtl:mr-4">
					<h5 className="mb-2">{title}</h5>
					{children}
				</div>
			</div>
		</Dialog>
	)
}

ButtonlessDialog.propTypes = {
	type: PropTypes.oneOf(['info', 'success', 'warning', 'danger','none']),
}

ButtonlessDialog.defaultProps = {
	type: 'info',
	cancelText: 'Cancel',
	confirmText: 'Confirm',
}


export default ButtonlessDialog
