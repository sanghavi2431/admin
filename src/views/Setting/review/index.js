import { AdaptableCard } from "@/components/shared";
import ReviewForm from "../reviewForm";
import React, { useEffect } from 'react'
import { toast, Notification } from '@/components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from '@/store/index'
import { updateSettings, getSettings, addSettings } from './store/dataSlice'
import AddAdminForm from "../addSettingForm";
import { DoubleSidedImage } from "@/components/shared";
import { isEmpty } from "lodash";
import ReviewDeleteConfirmation from "../reviewForm/components/reviewDeleteConfirmation";

injectReducer('reviewList', reducer)

const Form = () => {
	const dispatch = useDispatch()
	const data = useSelector((state) => state.reviewList.data.settingData)
	const initialFormData = useSelector((state) => state.reviewList.data.initialFormData)
	const loading = useSelector((state) => state.reviewList.data.loading)

	const fetchData = () => {
		if (loading) return;
		dispatch(getSettings())
	}
	const handleFormSubmit = async (values, setSubmitting) => {
		setSubmitting(false)
		var formData = new FormData()
		for (let value in values) {
			if (typeof values[value] == "object" && values[value] !== null) {
				formData.append(`${value}`, values[value][0])
			} else {
				formData.append(`${value}`, values[value])
			}

		}
		try {
			const { success, results } = await updateSettings(formData)
			setSubmitting(true)

			if (success) {
				setSubmitting(false)
				fetchData()
				toast.push(
					<Notification title={'Setting Updated'} type="success" duration={2500}>
						Setting Updated successfully
					</Notification>
					, {
						placement: 'top-center'
					}
				)
			}

		}
		catch (error) {
			toast.push(
				<Notification type="warning" duration={2500}>
					{error.response.data.error.message}
				</Notification>
				, {
					placement: 'top-center'
				}
			)
			setSubmitting(false)
		}

	}
	const handleAddFormSubmit = async (values, setSubmitting, resetForm) => {
		setSubmitting(false)
		let Data = {}

		Data["display_name"] = values.name
		Data["key"] = values.key
		Data["type"] = values.type.label
		Data["group"] = values.group.label


		try {
			const { success, results } = await addSettings(Data)
			setSubmitting(true)

			if (success) {
				setSubmitting(false)
				fetchData()

				toast.push(
					<Notification title={'Setting Added'} type="success" duration={2500}>
						New Setting Added successfully
					</Notification>
					, {
						placement: 'top-center'
					}
				)
				resetForm()
			}

		}
		catch (error) {
			toast.push(
				<Notification type="warning" duration={2500}>
					{error.response.data.error.message}
				</Notification>
				, {
					placement: 'top-center'
				}
			)
			setSubmitting(false)
		}

	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<AdaptableCard className="h-full" bodyClass="h-full">
				<div className="flex items-center mb-5">
					<h3 className="">Review</h3>

				</div>
				{(!loading && !isEmpty(data)) ? (
					<>
						<ReviewForm
							type="edit"
							initialData={initialFormData}
							Data={data}
							onFormSubmit={handleFormSubmit}
						/>
						<ReviewDeleteConfirmation />
					</>
				) : <div></div>}

				{(!loading && isEmpty(data)) ? (
					<div className=" flex flex-col items-center justify-center">
						<DoubleSidedImage
							src="/img/others/img-2.png"
							darkModeSrc="/img/others/img-2-dark.png"
							alt="No setting found!"
						/>
						<h3 className="mt-8">No setting found!</h3>
					</div>
				) : <div></div>}


				<div className="">
					<h3 className="mt-8 mb-8"> Add Setting</h3>
					<AddAdminForm
						type="add"
						onFormSubmit={handleAddFormSubmit}
					/>
				</div>
			</AdaptableCard>

		</>
	)
}

export default Form