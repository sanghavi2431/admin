import React, { forwardRef, useEffect } from 'react'
import { FormContainer, Button } from '@/components/ui'
import { StickyFooter } from '@/components/shared'
import { Form, Formik, yupToFormErrors } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import GeneralInformationFields from './components/GeneralInformationFields';
import { useState } from 'react'
import { injectReducer } from '@/store'
import reducer from "./store"

injectReducer("generalForm", reducer)
const GeneralForm = forwardRef((props, ref) => {
	const { initialData, onFormSubmit, Data } = props
	const [validationSchema, setValidationSchema] = useState({});

	const dynamicValidationGenerator = formField => {
		const validateObj = {};

		let validateMapping = {};
		validateMapping['text'] = Yup.string().required(`This field is required`).typeError("This field is required");
		validateMapping['number'] = Yup.number().required(`This field is required`).typeError("This field is required");
		validateMapping['date'] = Yup.date().required(`This field is required`).typeError("This field is required");
		validateMapping['radio'] = Yup.string().required('Please select one!').typeError("This field is required");
		validateMapping['checkbox'] = Yup.array().min(1, 'Select at least one option!').typeError("This field is required");
		validateMapping['image'] = Yup.mixed().required("This field is required").typeError("This field is required");
		validateMapping['select'] = Yup.string().required('Please select one!').typeError("This field is required");
		

		formField.map((field, i) => {
			Object.assign(validateObj, {
				[field.id]: validateMapping[`${field.type}`]
			}
			);
			return validateObj;
		});
		return validateObj;
	};

	useEffect(() => {
		setValidationSchema(Yup.object().shape({
			...dynamicValidationGenerator(Data)
		}))
	}, [Data])

	return (
		<>
			<Formik
				innerRef={ref}
				initialValues={
					initialData
				}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)

					onFormSubmit?.(formData, setSubmitting)
				}}
				enableReinitialize
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-lg shadow p-3">
								<div className="lg:col-span-3 grid-cols-3">
									<GeneralInformationFields touched={touched} errors={errors} values={values} data={Data} />
								</div>
							</div>
							<div className="md:flex items-center my-4">
								<Button
									size="sm"
									variant="solid"
									loading={isSubmitting}
									icon={<AiOutlineSave />}
									className="text-gray-800"
									type="submit"
								>
									Save
								</Button>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</>
	)
})

export default GeneralForm