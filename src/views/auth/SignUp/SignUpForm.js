import React from "react";
import { Input, Button, FormItem, FormContainer, Alert } from "components/ui";
import { PasswordInput, ActionLink } from "components/shared";
import { onSignInSuccess } from "store/auth/sessionSlice";
import {
  getClient_id,
  setDefaultPageMapping,
  setemail,
  setFirstTime,
  setLooDiscovery,
  setRoleAccess,
  setRoleId,
  setSelectedModule,
  setUser,
  setUserId,
  setUserName,
} from "store/auth/userSlice";
import {
  apiSignIn,
  apiSignUp,
  clientSignUp,
  getUser_id,
} from "services/AuthService";
import appConfig from "configs/app.config";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { setShowOnChangeModule } from "store/auth/userSlice";
// import useQuery from "./useQuery";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Please enter your user name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Mobile number is required"),
  password: Yup.string().required("Please enter your password").min(8, "Must be 8 digits"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Your passwords do not match"
  ),
});

const SignUpForm = (props) => {
  const { disableSubmit = false, className, signInUrl = "/sign-in" } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [message, setMessage] = useTimeOutMessage();
//   const query = useQuery();
  const onSignUp = async (values, setSubmitting) => {
    const { userName, password, email, mobile } = values;
    setSubmitting(true);
    try {
      // const resp = await apiSignUp({ userName, password, email })
      const clientData = {
        name: userName,
        email: email,
        password: password,
        mobile: mobile,
      };
      const results = await getUser_id(clientData);
      const success = await clientSignUp({"client_user_id": results?.data?.results?.user_id,"client_name":userName,"client_type_id":6});
      if (success) {
        setSubmitting(true);
        try {
          const resp = await apiSignIn({ email, password });
          if (resp.data.results) {
            const { token, role_id, name, email, id, rolesAccess, permissions } = resp.data.results;
            const {
              showOnChangeModule,
              defaultPageMapping,
              isLoodiscovery,
              selectedModule,
            } = JSON.parse(permissions);
          
            dispatch(onSignInSuccess(token));
            dispatch(setRoleId(role_id));
            dispatch(setUserId(id));
            dispatch(setUserName(name));
            dispatch(setemail(email));
            dispatch(setFirstTime(true));
            dispatch(setRoleAccess(JSON.parse(rolesAccess)));
            dispatch(setDefaultPageMapping(defaultPageMapping));
            dispatch(setLooDiscovery(isLoodiscovery));
            dispatch(setSelectedModule(selectedModule? { label: "Task Management", value: 1 }:{ label: "Loo Discovery", value: 0 }));
            dispatch(setShowOnChangeModule(showOnChangeModule));
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
			navigate(appConfig.authenticatedEntryPath)
            return {
              status: "success",
              message: "",
            };
          }
        } catch (errors) {
          throw errors.response.data;
          return {
          };
        }
      }
    } catch (errors) {
      setMessage(errors?.response?.data?.message || errors.toString());
      setSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          userName: "",
          password: "",
          confirmPassword: "",
          email: "",
          mobile: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignUp(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer className="flex flex-col gap-4">
              <FormItem
                label="User Name"
                invalid={errors.userName && touched.userName}
                errorMessage={errors.userName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="userName"
                  placeholder="User Name"
                  component={Input}
                  className="w-full shadow-xl rounded-full border border-gray-300 px-6"
                />
              </FormItem>
              <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                  className="w-full shadow-xl rounded-full border border-gray-300 px-6"
                />
              </FormItem>
              <FormItem
                label="Mobile Number"
                invalid={errors.mobile && touched.mobile}
                errorMessage={errors.mobile}
              >
                <Field
                  type="mobile"
                  autoComplete="off"
                  name="mobile"
                  placeholder="Mobile Number"
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
              <FormItem
                label="Confirm Password"
                invalid={errors.confirmPassword && touched.confirmPassword}
                errorMessage={errors.confirmPassword}
              >
                <Field
                  autoComplete="off"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={PasswordInput}
                  className="w-full"
                />
              </FormItem>
              <Button
              className="bg-[#FFEB00] hover:bg-[#ffea008f]"
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
              <div className="mt-2 text-center">
                <span>Already have an account? </span>
                <ActionLink to={signInUrl}>Sign in</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
