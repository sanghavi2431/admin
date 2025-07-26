import React from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Alert,
} from "@/components/ui";
import { ActionLink } from "@/components/shared";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { apiClientSendOTP } from "@/services/AuthService";

const validationSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Mobile number is required")
});

const SignInUsingMobileForm = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = "/forgot-password",
    signUpUrl = "/sign-up",
    emailSignIn,
    SetEmailSignIn
  } = props;

  const [message, setMessage] = useTimeOutMessage();
  const navigate = useNavigate();

  const onSignIn = async (values, setSubmitting) => {
    const { mobile } = values;
    try {
      setSubmitting(true);
      const result = await apiClientSendOTP({ mobileNumber: mobile });
      navigate("/verifyOTP", { state: { mobileNumber: mobile, req_id: result?.data?.results?.request_id, expireTime: result?.data?.results?.expiry_time } })
    } catch (err) {
      setMessage(err?.response?.data?.error?.message);
      setSubmitting(false);
    }

    // setSubmitting(false);
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        // Remove this initial value
        initialValues={{
          mobile: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer className="flex flex-col gap-4">
              <FormItem
                // label="Mobile Number"
                invalid={errors.mobile && touched.mobile}
                errorMessage={errors.mobile}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="mobile"
                  placeholder="Mobile Number"
                  component={Input}
                  className="w-full shadow-xl rounded-full border border-gray-300 px-6"
                />
              </FormItem>

              <Button
                className="text-gray-800 mt-2 bg-[#FFEB00] hover:bg-[#ffea008f]"
                block
                shape="round"
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? "Sending OTP..." : "Get an OTP"}
              </Button>
              {/* <Button
                className="text-gray-800 "
                block
                shape="round"
                // loading={isSubmitting}
                // variant="solid"
                type="button"
                onClick={() => SetEmailSignIn(!emailSignIn)}

              >
                Sign In using Email
              </Button>
              <div className="text-black text-center font-bold">
                <span>Don't have an account yet? </span>
                <ActionLink to={signUpUrl} themeColor={false}>Sign up</ActionLink>
              </div> */}
              <div className="text-black text-center font-bold">
                <span>Are you an admin? </span>
                <span
                  onClick={() => SetEmailSignIn(!emailSignIn)}
                  className="cursor-pointer underline hover:no-underline"
                >
                  Login as Admin
                </span>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInUsingMobileForm;
