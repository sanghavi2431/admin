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
        <Alert className="mb-2" type="danger" showIcon>
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
            <FormContainer className="flex flex-col gap-6">
              <FormItem
                // label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="email"
                  placeholder="Enter your Email ID"
                  component={Input}
                >
                </Field>
              </FormItem>
              <FormItem
                // label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Enter your password"
                  component={PasswordInput}
                />
              </FormItem>
              <div className="flex justify-between ">
                {/* <Field className="mb-0" name="rememberMe" component={Checkbox} children="Remember Me" /> */}
                <div></div>
                <ActionLink to={forgotPasswordUrl} themeColor={false} className="text-black font-semibold">
                  Forgot Password?
                </ActionLink>
              </div>
              <Button
                className="text-gray-800 bg-[#FFEB00] hover:bg-[#ffea008f]"
                shape="round"
                loading={isSubmitting}
                variant="solid"
                type="submit"
                color="black"
              >
                {isSubmitting ? "Logging in..." : "Login"}
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
              <div className="space-y-2">
                <div className="text-black text-center font-bold">
                  <span >Not an admin? </span>
                  <span onClick={() => SetEmailSignIn(!emailSignIn)} className="cursor-pointer underline hover:no-underline">Login as User</span>
                </div>
                {/* <div className="text-black text-center font-bold">
                  <span >Not a user? </span>
                  <ActionLink to={signUpUrl} themeColor={false}>Register Now</ActionLink>
                </div> */}
              </div>

            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
