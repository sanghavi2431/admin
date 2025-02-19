import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import {
  Input,
  Button,
  FormItem,
  FormContainer,
  Alert,
} from "@/components/ui";
import { PasswordInput, ActionLink } from "@/components/shared";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import useAuth from "@/utils/hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Must be 8 digits"),
  rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
  const {
    disableSubmit = false,
    className,
    forgotPasswordUrl = "/forgot-password",
    signUpUrl = "/sign-up",
    emailSignIn,
    SetEmailSignIn
  } = props;

  const [message, setMessage] = useTimeOutMessage();

  const { signIn } = useAuth();

  const onSignIn = async (values, setSubmitting) => {
    const { email, password } = values;
    try {
      setSubmitting(true);
      const result = await signIn({ email, password });
    } catch (err) {
      console.log("err", err);

      setMessage(err);
      setSubmitting(false);
    }

    setSubmitting(false);
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
          email: "",
          password: "",
          rememberMe: true,
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
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                  className="w-full shadow-xl rounded-full border border-gray-300 px-6"
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
                  placeholder="Password"
                  component={PasswordInput}
                  className="w-full"
                />
              </FormItem>
              <div className="flex justify-between ">
                {/* <Field className="mb-0" name="rememberMe" component={Checkbox} children="Remember Me" /> */}
                <div></div>
                <ActionLink to={forgotPasswordUrl}>
                  Forgot Password?
                </ActionLink>
              </div>
              <Button
                className="text-gray-800 bg-[#FFEB00] hover:bg-[#ffea008f]"
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
                color="black"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
              {/* <Button
                className="text-gray-800 "
                block
                // loading={isSubmitting}
                // variant="solid"
                type="button"
                onClick={() => SetEmailSignIn(!emailSignIn)}
              >
                Sign In using Mobile Number
              </Button> */}
              <div className=" text-center font-semibold">
                <span >Are you a Woloo Host ? </span>
                <span onClick={() => SetEmailSignIn(!emailSignIn)} className="cursor-pointer text-[#FFEB00]">Click here</span>
              </div>
              <div className=" text-center">
                <span >Don't have an account yet? </span>
                <ActionLink to={signUpUrl}>Sign up</ActionLink>
              </div>
             
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
