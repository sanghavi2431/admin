import React from 'react'
import UploadDialog from '@/components/shared/uploadDialog'
import { useSelector, useDispatch } from 'react-redux'
import { toggleBulkUploadConfirmation } from '../store/stateSlice'
import WolooBulkUpload from '@/views/woloos/woloobulkUpload'

const BulkUploadConfirmation = () => {

	const dispatch = useDispatch()
	const dialogOpen = useSelector((state) => state.woloosList.state.bulkUploadConfirmation)
	const onDialogClose = () => {
		dispatch(toggleBulkUploadConfirmation(false))
	}

	return (
		<UploadDialog
			isOpen={dialogOpen}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			type="none"
			title="Bulk Upload"
			confirmText='Upload'
		>
			<WolooBulkUpload />
		</UploadDialog>
	)
}

export default BulkUploadConfirmation