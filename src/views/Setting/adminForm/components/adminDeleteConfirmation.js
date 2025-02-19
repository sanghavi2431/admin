import React from 'react'
import { toast, Notification } from '@/components/ui'
import { ConfirmDialog } from '@/components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation,deleteSettings } from '../store/dataSlice'
import { getSettings } from "@/views/Setting/admin/store/dataSlice";

const AdminsDeleteConfirmation = () => {

	const dispatch = useDispatch()
	const dialogOpen = useSelector((state) => state.adminForm.data.deleteConfirmation)
	const selectedSetting = useSelector((state) => state.adminForm.data.selectedSetting)
	const onDialogClose = () => {
		dispatch(toggleDeleteConfirmation(false))
	}
	const onDelete = async () => {
		dispatch(toggleDeleteConfirmation(false))
		let data = {}
		data.id = selectedSetting
		try {
		  const success = await deleteSettings(data);
	
		  if (success) {
			toast.push(
			  <Notification title={"Successfully Deleted"} type="success" duration={2500}>
				Setting deleted successfully
			  </Notification>
			  , {
				placement: 'top-center'
			  }
			)
		  }
			dispatch(getSettings())

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
			title="Are you sure you want to delete this setting? "
			onCancel={onDialogClose}
			onConfirm={onDelete}
			confirmButtonColor="red-600"
			confirmText='Yes,Delete it!'
		>
		</ConfirmDialog>
	)
}

export default AdminsDeleteConfirmation