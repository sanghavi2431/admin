import React, { forwardRef } from 'react'
import { FormContainer, Button } from '@/components/ui'
import { StickyFooter } from '@/components/shared'
import { Form, Formik, yupToFormErrors } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import RoleInformationFields from './components/RoleInformationFields'
import reducer from './store'
import { injectReducer } from '@/store'
import GridItem from './components/GridItem'
injectReducer('createNewrole', reducer)

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Role name is required ').typeError("Role name is required "),
	display_name : Yup.string().required('Display name is required ').typeError("Display name is required "),
	defaultPageMapping: Yup.string().required('Default Page Name is required ').typeError("Default Page Name is required "),
	isLoodiscovery: Yup.object()
      .required("Required")
      .typeError("Required"),
	showOnChangeModule: Yup.object()
      .required("Required")
      .typeError("Required"),
	selectedModule: Yup.object().when('showOnChangeModule', {
		is: (showOnChangeModule) => showOnChangeModule && showOnChangeModule.value,
		then: Yup.object().required("Required").typeError("Required"),
		otherwise: Yup.object().nullable(), // or .notRequired()
	  }),
})

const RoleForm = forwardRef((props, ref) => {
	const { initialData, onFormSubmit, onDiscard,roleAccessObj,type } = props

	return (
		<>
			<Formik
			    enableReinitialize
				innerRef={ref}
				initialValues={initialData}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const formData = cloneDeep(values)

					onFormSubmit?.(formData, setSubmitting)
				}}
			>
				{({ values, touched, errors, isSubmitting }) => (
					<Form>
						<FormContainer>
							<div className=" bg-white  grid grid-cols-1 lg:grid-cols-3 gap-4">
								<div className="lg:col-span-3">
									<RoleInformationFields touched={touched} errors={errors} values={values}  />
									<GridItem roleAccessObj={roleAccessObj} type={type}/>
								</div>
							</div>
							<StickyFooter
								className="-mx-8 px-8 flex items-center justify-between py-4"
								stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
							>

								<div className="md:flex items-center">
									<Button
										size="sm"
										className="ltr:mr-3 rtl:ml-3"
										onClick={() => onDiscard?.()}
										type="button"
									>
										Discard
									</Button>
									<Button 
										size="sm" 
										variant="solid" 
										loading={isSubmitting} 
										icon={<AiOutlineSave />}
										type="submit"
									>
										Save
									</Button>
								</div>
							</StickyFooter>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</>
	)
})

RoleForm.defaultProps = {
	type: 'edit',
	initialData: {
		name:"",
		display_name:"",
		defaultPageMapping:"",
		isLoodiscovery:"",
		showOnChangeModule:"",
		selectedModule:""
	}
}

export default RoleForm