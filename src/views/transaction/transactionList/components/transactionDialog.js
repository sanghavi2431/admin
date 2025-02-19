import React, { useEffect } from 'react'
import { Dialog } from '@/components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDialogConfirmation, getTransactionById } from '../store/dataSlice'
import TransactionDetail from './transactionDetail'

const TransactionDialog = () => {

	const dispatch = useDispatch()
	const dialogOpen = useSelector((state) => state.transactionList.data.dialogConfirmation)
	const selectedTransactionId = useSelector((state) => state.transactionList.data.selectedTransactionId)
	const TransactionDetails = useSelector((state) => state.transactionList.data.transactionDetail)
	
	useEffect(() => {
		let data = { Id: selectedTransactionId }
		dispatch(getTransactionById(data))
	}, [selectedTransactionId])

	const onDialogClose = () => {
		dispatch(toggleDialogConfirmation(false))
	}
	return (
		<Dialog
			isOpen={dialogOpen}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
		>
			{TransactionDetails ? <TransactionDetail data={TransactionDetails} /> : null}
		</Dialog>

	)
}

export default TransactionDialog