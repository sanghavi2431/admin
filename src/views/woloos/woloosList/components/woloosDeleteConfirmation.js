import React from 'react'
import { toast, Notification } from '@/components/ui'
import { ConfirmDialog } from '@/components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteWoloos } from '../store/dataSlice'
import { getWoloos } from '../store/dataSlice'

const WoloosDeleteConfirmation = () => {

	const dispatch = useDispatch()
	const dialogOpen = useSelector((state) => state.woloosList.state.deleteConfirmation)
	const selectedWoloo = useSelector((state) => state.woloosList.state.selectedWoloo)
	const tableData = useSelector((state) => state.woloosList.data.tableData)

	const onDialogClose = () => {
		dispatch(toggleDeleteConfirmation(false))
	}
	const onDelete = async () => {
		dispatch(toggleDeleteConfirmation(false))
		var data = {};
		data.id = selectedWoloo
		try {
			const success = await deleteWoloos(data);
			if (success) {
				dispatch(getWoloos(tableData))
				toast.push(
					<Notification title={"Successfully Deleted"} type="success" duration={2500}>
						Woloo Host deleted successfully
					</Notification>
					, {
						placement: 'top-center'
					}
				)
			}
		}
		catch (err) {
			let errorMessage = err.response.data.error.message
			toast.push(
				<Notification title={"Failed"} type="warning" duration={2500}>
					{errorMessage}
				</Notification>
				, {
					placement: 'top-center'
				}
			)
		}
	}

	return (
		<ConfirmDialog
			isOpen={dialogOpen}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
			type="danger"
			title="Are you sure you want to delete this Woloo Host? "
			onCancel={onDialogClose}
			onConfirm={onDelete}
			confirmButtonColor="red-600"
			confirmText='Yes,Delete it!'
		>
		</ConfirmDialog>
	)
}

export default WoloosDeleteConfirmation