import React, { useState } from 'react'
import { Button, FormItem, FormContainer, Alert, toast, Notification } from '@/components/ui'
import { PasswordInput, ActionLink } from '@/components/shared'
import { apiResetPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
	oldpassword: Yup.string().min(8, "Must be 8 digits").required('Please enter your Temporary password'),
    password: Yup.string().min(8, "Must be 8 digits")
        .matches(/[a-z]/, "At least one lowercase letter is required")
        .matches(/[A-Z]/, "At least one uppercase letter is required")
        .matches(/[0-9]/, "At least one number is required")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character is required")
        .required('Please enter your password'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Your passwords do not match').required('Please enter your password')
})

const ResetPasswordForm = props => {
	
	const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

	const [ resetComplete, setResetComplete ] = useState(false)

	const [ message, setMessage ] = useTimeOutMessage()

	const navigate = useNavigate()
	const location = useLocation()


	const onSubmit = async (values, setSubmitting) => {
		const { password,oldpassword } = values
		setSubmitting(true)
		try {
			const resp = await apiResetPassword({  newPassword: password, oldPassword: oldpassword,email:location?.state?.email })
			toast.push(
                <Notification
                    title={'Successfully Password Changed'}
                    type="success"
                    duration={2500}
                >
                    Password Changed
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
			navigate('/sign-in')
			if (resp.data) {
				setSubmitting(false)
				setResetComplete(true)
			}
		} catch (errors) {
			setMessage(errors?.response?.data?.message || errors.toString())
			setSubmitting(false)
		}
	}

	const onContinue = () => {
		navigate('/sign-in')
	}

	return (
		<div className={className}>
			<div className="mb-6">
				{
					resetComplete ? 
					<>
						<h3 className="mb-1">Reset done</h3>
						<p>Your password has been successfully reset</p>
					</>
					:
					<>
						<h3 className="mb-1">Set new password</h3>
						<p>Your new password must different to previos password</p>
					</>
				}
			</div>
			{message && <Alert className="mb-4" type="danger" showIcon>{message}</Alert>}
			<Formik
				initialValues={{
                    oldpassword: '',
					password: '', 
					confirmPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					if(!disableSubmit) {
						onSubmit(values, setSubmitting)
					} else {
						setSubmitting(false)
					}
				}}
			>
				{({touched, errors, isSubmitting,values}) => (
					<Form>
						<FormContainer>
							{
								!resetComplete ? (
									<>
									 <FormItem
                                        label="Temporary Password ( Sent on mail )"
                                        invalid={
                                            errors.oldpassword && touched.oldpassword
                                        }
                                        errorMessage={errors.oldpassword}
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="oldpassword"
											value={values.oldpassword}
                                            placeholder="Temporary Password"
                                            component={PasswordInput}
                                        />
                                    </FormItem>
										<FormItem
											label="Password"
											invalid={errors.password && touched.password}
											errorMessage={errors.password}
										>
											<Field
												autoComplete="off" 
												name="password" 
												value={values.password}
												placeholder="Password" 
												component={PasswordInput} 
											/>
										</FormItem>
										<FormItem
											label="Confirm Password"
											invalid={errors.confirmPassword && touched.confirmPassword}
											errorMessage={errors.confirmPassword}
										>
											<Field
												autoComplete="off" 
												name="confirmPassword" 
												value={values.confirmPassword}
												placeholder="Confirm Password" 
												component={PasswordInput} 
											/>
										</FormItem>
										<Button 
											block 
											loading={isSubmitting} 
											variant="solid" 
											type="submit"
										>
											{ isSubmitting ? 'Submiting...' : 'Submit' }
										</Button>
									</>
								)
								:
								(
									<Button 
										block 
										variant="solid" 
										type="button"
										onClick={onContinue}
									>
										Continue
									</Button>
								)
							}
							
							<div className="mt-4 text-center">
								<span>Back to </span>
								<ActionLink to={signInUrl}>
									Sign in
								</ActionLink>
							</div>
						</FormContainer>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default ResetPasswordForm