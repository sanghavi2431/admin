import React from 'react'
import SignUpForm from './SignUpForm'

const SignUp = () => {
	return (
		<div className="w-full px-10">
			{/* <div className="mb-4">
				<h3 className="mb-1">Sign Up</h3>
			</div> */}
			<SignUpForm disableSubmit={false} />
		</div>
		
	)
}

export default SignUp