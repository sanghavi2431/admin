import React, { forwardRef } from 'react'
import { FormContainer, Button } from '@/components/ui'
import { Form, Formik, yupToFormErrors } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import AdminInformationFields from './components/AdminInformationFields'

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	key: Yup.string().required("Key is required"),
	type: Yup.object().required("Please select type"),
	group: Yup.object().required("Please select group")
})
const AddAdminForm = forwardRef((props, ref) => {
	const { initialData, onFormSubmit } = props
	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={
					initialData
				}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting,resetForm }) => {

					const formData = cloneDeep(values)
					onFormSubmit?.(formData, setSubmitting,resetForm)

					
				}}
				enableReinitialize
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer className="border-0">
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-lg shadow mb-4 ">
								<div className="lg:col-span-3 grid-cols-3 m-4" >
									<AdminInformationFields touched={touched} errors={errors} values={values} />
								</div>
							</div>
							<div className="md:flex items-center">
								<Button
									size="sm"
									className="ltr:mr-3 rtl:ml-3"
									type="reset"
								>
									Discard
								</Button>
								<Button
									size="sm"
									variant="solid"
									loading={isSubmitting}
									icon={<AiOutlineSave />}
									className="text-gray-800"
									type="submit"
								>
									Add New
								</Button>

							</div>

						</FormContainer>
					</Form>
				)}
			</Formik>
		</>
	)
})

AddAdminForm.defaultProps = {
	type: 'add',
	initialData: {
		name: "",
		type: "",
		key: '',
		group: ''

	}
}

export default AddAdminForm