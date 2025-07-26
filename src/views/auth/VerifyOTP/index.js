import { ActionLink, Loading } from '@/components/shared'
import { Alert, Button, Dialog, FormContainer, FormItem } from '@/components/ui'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiClientSendOTP, apiClientVerifyOTP, clientSignUp } from '@/services/AuthService'
import { onSignInSuccess } from '@/store/auth/sessionSlice'
import { getClient_id, setDefaultPageMapping, setemail, setLooDiscovery, setRoleAccess, setRoleId, setSelectedModule, setShowOnChangeModule, setUser, setUserId, setUserName, setTotalCoins } from '@/store/auth/userSlice'
import useAuth from '@/utils/hooks/useAuth'
import useQuery from '@/utils/hooks/useQuery'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import * as Yup from 'yup'

const validationSchemaForEmail = Yup.object().shape({
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/,
            'Corporate email only'
        )
        .email()
        .required('Please enter your email'),
})

//validation for Sign in only
const validationSchemaForSignIn = Yup.object().shape({
    otp: Yup.number()
        .typeError('A number is required')
        .min(1000, 'Enter vaild OTP')
        .max(9999, 'maximum 6 digit required')
        .required('OTP is required'),
})

//validation for Sign up only
// const validationSchemaForSignup = Yup.object().shape({
//     email: Yup.string().email().required('Please enter your email'),
//     fullName: Yup.string()
//         .min(5, 'minium 5 character required')
//         .max(50, 'Full name is too long')
//         .required('Full name is required'),
//     otp: Yup.number()
//         .typeError('A number is required')
//         .min(100000, 'Enter vaild OTP')
//         .max(999999, 'maximum 6 digit required')
//         .required('OTP is required'),
// })

const OtpInputFiled = (props) => {
    return <div className="w-10 h-10 md:w-12 md:h-12">
        <input className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full h-full flex flex-col items-center justify-center text-center px-1 outline-none rounded-sm border border-gray-200 text-xl font-semibold bg-white focus:bg-gray-50 focus:ring-1 ring-darkBlue-500  otp-input-filed"
            type="number"
            inputMode='numeric'
            min={0}
            pattern="[0-9]*"
            name={props.name}
            value={props.value}
            autoFocus={props.autoFocus}
            onPaste={(e) => props.handelPaste ? props.handelPaste(e) : ""}
            onChange={(e) => props.handelChange(e)} />
    </div>
}

const VerifyOtp = (props) => {
    const location = useLocation()
    const navigate = useNavigate();
    const query = useQuery();

    const { mobileNumber, req_id: reqId, expireTime } = location?.state

    const {
        // mobileNumber,
        // reqId,
        // expireTime,
        handleDrawerOpen,
        handleDialogOpen
    } = props


    const [message, setMessage] = useTimeOutMessage();
    const [dialogIsOpen, setIsOpen] = useState(false);
    const [emailClick, setEmailClick] = useState({
        emailSend: false,
        userExist: false,
        requestId: '',
    })
    const [resendOtp, setResendOtp] = useState({
        loading: false,
        status: false,
    })
    const [emailRef, setEmailRef] = useState({ email: '' });
    const [time, setTime] = useState(expireTime);
    const [reuqestId, setRequestId] = useState(reqId);
    const [timeUp, setTimeUp] = useState(false)

    const initialOtp = {
        firstInput: "",
        secondInput: "",
        thirdInput: "",
        fourthInput: "",
        fifthInput: "",
        sixthInput: ""
    };

    const [otpValue, setOtp] = useState(initialOtp);

    const inputMapping = {
        1: 'firstInput',
        2: 'secondInput',
        3: 'thirdInput',
        4: 'fourthInput',
        5: 'fifthInput',
        6: 'sixthInput',
    }

    const [initialValues, setInitValues] = useState({
        email: '',
        otp: '',
        fullName: '',
    });

    const [isPrefilledEmail, setPredilledEmail] = useState(false);

    //HANDEL OTP PASTE
    const otpInputs = document.querySelectorAll('.otp-input-filed');

    const handelPaste = (ev) => {
        // if (ev.target.localname !== 'input') return;
        ev.preventDefault();
        const pastedOtp = (ev.clipboardData || window.Clipboard).getData('text')
        if (pastedOtp.length !== otpInputs.length) {

            return;
        } else {
            setInitValues((prev) => ({ ...prev, email: emailRef.email, otp: pastedOtp }))
            setOtp({
                firstInput: pastedOtp[0],
                secondInput: pastedOtp[1],
                thirdInput: pastedOtp[2],
                fourthInput: pastedOtp[3],
                fifthInput: pastedOtp[4],
                sixthInput: pastedOtp[5],
            })
            otpInputs[5]?.focus()
        }
    }

    // handel keypress 
    const numbers = ["1", "2", '3', '4', '5', '6', '7', '8', '9', '0'];
    otpInputs.forEach((input, index, array) => {
        const element = input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === undefined) {

                return;
            }
            else if (e.key === "ArrowRight") {
                array[index + 1]?.focus()
                const inputElement = array[index + 1];
                inputElement.setAttribute('type', 'text'); // Change input type to text

                // Set cursor at the end of the text
                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);

                inputElement.setAttribute('type', 'number');

                // input.setSelectionRange(1, 1)
                return
            }
            else if (e.key === "ArrowLeft") {
                array[index - 1]?.focus()
                const inputElement = array[index + 1];
                inputElement.setAttribute('type', 'text'); // Change input type to text

                // Set cursor at the end of the text
                inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);

                inputElement.setAttribute('type', 'number');

                // input.setSelectionRange(1, 1)
                return
            }
            else if (e.key === 'Backspace' || e.key === 'Delete') {
                array[index - 1]?.focus();
                // console.log(array[index].target.value )

                // input.setSelectionRange(1, 1)
                return
            }
            else if (numbers.includes(e.key)) {
                if (input.value != '') {
                    array[index].value = input.value.split('')[input.value.length - 1];
                    array[index + 1]?.focus()
                    return
                }
                return
            }

        })
    })

    // handel otp input change
    // const handelChange = (e) => {
    //     const isTextInput = /[a-zA-Z]/;
    //     const result = isTextInput.test(e.target.value);
    //     // const result = isTextInput.test('jdjncjndjncdncjdncSSSrrjrnjrng334DNJNDJSNDJN');
    //     console.log(e.target.value);

    //     if (!result) {
    //         //if (e.target.value >= 0 && e.target.value <= 9) {
    //             setOtp((prev) => ({
    //                 ...prev,
    //                 [e.target.name]: e.target.value.split('')[0] ? e.target.value.split('')[0] : ""
    //             }));
    //             return;
    //        // }
    //     }
    //     return
    // }

    const handelChange = (e) => {
        const isTextInput = /[a-zA-Z]/;
        const result = isTextInput.test(e.target.value);

        if (!result) {
            let index = e.target.value.length - 1;
            setOtp((prev) => ({
                ...prev,
                [e.target.name]: e.target.value.split('')[index] ? e.target.value.split('')[index] : ""
            }));
            return;
        }
        return
    }

    // set otp after chnage otp input value
    useEffect(() => {
        setInitValues((prev) => ({ ...prev, email: emailRef.email, otp: `${otpValue.firstInput}${otpValue.secondInput}${otpValue.thirdInput}${otpValue.fourthInput}${otpValue.fifthInput}${otpValue.sixthInput}` }))
    }, [otpValue])


    // OTP Timmer Use Effect
    useEffect(() => {
        let interval;
        if (time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            setTimeUp(true)
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [time, timeUp]);


    //Set Timmer Function
    const startCountdown = () => {
        setTimeUp(false)
        setTime(15); // Reset the countdown to 180 seconds
    };

    const { signIn } = useAuth()
    const dispatch = useDispatch()

    function b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    // useEffect(() => {

    //     if (location?.href?.includes('accept')) {
    //         const encoded = location?.href?.split('/').pop();
    //         const data = JSON.parse(b64DecodeUnicode(encoded));

    //         setInitValues((s) => {
    //             const init = cloneDeep(s);
    //             init.email = data.Email_id;
    //             setPredilledEmail(true);

    //             return init;
    //         })
    //     }
    // }, [])






    //resend otp
    const onResendOtp = async (e) => {
        try {
            e.preventDefault();
            // const payload = { mobile: parseInt(mobileNumber) }
            const result = await apiClientSendOTP({ mobileNumber: mobileNumber });
            // let resp=1

            const { request_id } = result.data.results;
            // const givenDate = new Date(expire_time);
            // const currentTime = Date.now();
            // const difference = givenDate.getTime() - currentTime;
            // const differenceInSeconds = difference / 1000;

            setRequestId(request_id);
            setTime(15);
            startCountdown()
            // openNotification(
            //     'success',
            //     'OTP sent successfully!'
            // )


        } catch (err) {
            // openNotification(
            //     'Danger',
            //     'Error sending OTP. Apologies for the inconvenience.'
            // )


        }
    }

    const onDialogClose = (e) => {

        setIsOpen(false)
    }

    return (

        <div className="h-full flex flex-col justify-center">
            {/* <Logo mode="main" className='w-96 flex justify-center items-center'  />  */}
            <div className="text-start ml-0 mb-10">
                {/* <img src="/img/logo/logo-main-full.png" className="w-32 h-32" /> */}
                <div className="flex flex-col gap-2">
                    <h6 className="text-theme-green lg:text-[35px] text-[24px]">Verification code</h6>
                    <p className="text-theme-black lg:text-[12px] text-[16px]">Please enter 6 digit verification code sent to <b>+91 {mobileNumber}</b></p>
                </div>

                {/* <p className="font-body"> Welcome to {APP_NAME}</p> */}
            </div>
            {message.message && (
                <Alert showIcon className="mb-4" type={message.type}>
                    {message.message}
                </Alert>
            )}
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchemaForSignIn}
                onSubmit={async (values, { setSubmitting, resetForm }) => {

                    try {
                        const payload = { request_id: reuqestId, otp: values?.otp?.toString(), mobileNumber: mobileNumber };

                        const resp = await apiClientVerifyOTP(payload);
                        const success = await clientSignUp({
                            client_user_id: resp?.data?.results?.user_id,
                            // client_name: userName,
                            client_type_id: 10,
                            // email: email,
                            mobile: mobileNumber,
                            // address: address,
                            // city: city,
                            // pincode: pincode,
                        });
                        if (success && resp?.data?.results) {
                            const { token, role_id, name, email, id, rolesAccess, permissions, totalCoins } =
                                resp.data.results;
                            const {
                                showOnChangeModule,
                                defaultPageMapping,
                                isLoodiscovery,
                                selectedModule,
                            } = JSON.parse(permissions);
                            // let data = { user_id: id };
                            // dispatch(getClient_id({ user_id: id }))
                            dispatch(onSignInSuccess(token));
                            dispatch(setRoleId(role_id));
                            dispatch(setUserId(id));
                            dispatch(setUserName(name));
                            // dispatch(setemail(email));
                            dispatch(setRoleAccess(JSON.parse(rolesAccess)));
                            dispatch(setDefaultPageMapping(defaultPageMapping));
                            dispatch(setLooDiscovery(isLoodiscovery));
                            dispatch(setSelectedModule({ label: "Task Management", value: 1 }));
                            dispatch(setShowOnChangeModule(showOnChangeModule));
                            dispatch(setTotalCoins(totalCoins));

                            if (resp.data.results.user) {
                                dispatch(
                                    setUser(
                                        resp.data.results.user || {
                                            avatar: "",
                                            userName: "Anonymous",
                                            authority: ["USER"],
                                            email: "",
                                        }
                                    )
                                );
                            }
                            const redirectUrl = query.get(REDIRECT_URL_KEY);
                            navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath);
                            return {
                                status: "success",
                                message: "",
                            };
                        }
                    }
                    catch (err) {
                        console.error(err);
                        setOtp(initialOtp);
                        setMessage({ message: 'Incorrect OTP. Please check and try again' })
                        // openNotification(
                        //     'danger',
                        //     'Incorrect OTP. Please check and try again'
                        // )
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>


                            {/* add by tushar */}
                            {
                                <>
                                    {/* if user is found */}
                                    <FormItem
                                        label=""
                                        invalid={
                                            errors.otp && touched.otp
                                        }
                                        errorMessage={errors.otp}
                                    >
                                        <div className="flex flex-row items-center gap-2 md:gap-0 w-full justify-around mt-1"  >
                                            <OtpInputFiled name='firstInput' value={otpValue.firstInput} handelPaste={handelPaste} autoFocus={true} handelChange={handelChange} />
                                            <OtpInputFiled name='secondInput' value={otpValue.secondInput} handelChange={handelChange} />
                                            <OtpInputFiled name='thirdInput' value={otpValue.thirdInput} handelChange={handelChange} />
                                            <OtpInputFiled name='fourthInput' value={otpValue.fourthInput} handelChange={handelChange} />
                                            {/* <OtpInputFiled name='fifthInput' value={otpValue.fifthInput} handelChange={handelChange} />
                                            <OtpInputFiled name='sixthInput' value={otpValue.sixthInput} handelChange={handelChange} /> */}
                                        </div>
                                        {
                                            <div className={`flex justify-end  items-center mt-3`}>
                                                {!timeUp ? <p className='text-[14px]'>{Math.floor(time / 60)}:{time % 60 < 10 ? 0 : ''}{time % 60}</p> :
                                                    <button className='bg-none outline-none font-bold text-[0.8rem] disabled:text-gray-300 disabled:cursor-not-allowed' disabled={!timeUp} type='button' onClick={onResendOtp}>Resend OTP</button>}
                                            </div>
                                        }

                                        {/* <Field
                                                    autoComplete="off"
                                                    type="number"
                                                    name="otp"
                                                    placeholder="Enter your otp first"
                                                    component={PasswordInput}
                                                /> */}

                                    </FormItem>
                                    {resendOtp.status && (
                                        <Loading
                                            loading={resendOtp.loading}
                                            customLoader={
                                                <div className="w-[60%] relative top-[-30px] left-[43%] flex items-center justify-end p-5">
                                                    <div className="flex space-x-2 animate-pulse">
                                                        <div
                                                            className={`w-2 h-2 bg-[#123f5c] rounded-full`}
                                                        ></div>
                                                        <div
                                                            className={`w-2 h-2 bg-[#123f5c] rounded-full`}
                                                        ></div>
                                                        <div
                                                            className={`w-2 h-2 bg-[#123f5c] rounded-full`}
                                                        ></div>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            {/* <a
                                                        className="relative top-[-30px] left-[43%] cursor-pointer"
                                                        onClick={onResendOtp}
                                                    >
                                                        resend otp
                                                    </a> */}
                                        </Loading>
                                    )}
                                </>

                            }

                            {/* captcha */}
                            {/* {emailClick.emailSend && <>
              <FormItem>
              <ReCAPTCHA
                // size="compact"
                sitekey="6LeAdtkmAAAAAHvC6ET9NelJXA1q0ZQzuxahwwct"
                onChange={onVerifyCaptcha}
                ref={captchaRef}
              />
              </FormItem>
            
            </>} */}

                            <Button
                                className="text-gray-800 mt-2 bg-[#FFEB00] hover:bg-[#ffea008f]"
                                block
                                shape="round"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                Verify
                            </Button>


                            {/* <div className='flex gap-0.5 mt-2 justify-center text-sm'>Didn’t receive code? <p className='text-theme-yellow cursor-pointer' onClick={onResendOtp}>Resend code</p></div> */}
                            <div className="mt-4 text-center text-black font-bold">
                                <span>Back to </span>
                                <ActionLink to={'/sign-in'} themeColor={false}>
                                    Sign in
                                </ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>


            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            ></Dialog>
        </div>

    )
}


export default VerifyOtp
