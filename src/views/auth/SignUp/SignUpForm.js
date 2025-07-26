import React from "react";
import {
  Input,
  Button,
  FormContainer,
  Alert,
} from "@/components/ui";
import { PasswordInput, ActionLink } from "@/components/shared";
import { onSignInSuccess } from "@/store/auth/sessionSlice";
import {
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
} from "@/store/auth/userSlice";
import {
  apiSignIn,
  clientSignUp,
  getUser_id,
} from "@/services/AuthService";
import appConfig from "@/configs/app.config";
import useTimeOutMessage from "@/utils/hooks/useTimeOutMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { setShowOnChangeModule } from "@/store/auth/userSlice";
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
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Must be 8 digits"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Your passwords do not match").
    required("Please enter your confirm password"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .typeError("Input address"),
  city: Yup.string().required("City is required").typeError("Input city"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .typeError("Must be only digits"),
});

const SignUpForm = (props) => {
  const { disableSubmit = false, className, signInUrl = "/sign-in" } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useTimeOutMessage();
  //   const query = useQuery();
  const onSignUp = async (values, setSubmitting) => {
    setSubmitting(true);

    try {
      const { userName, password, email, mobile, address, city, pincode } = values;
      // console.log("values", values);
      // const resp = await apiSignUp({ userName, password, email })
      const clientData = {
        name: userName,
        email: email,
        password: password,
        mobile: mobile,
      };
      const results = await getUser_id(clientData);
      const success = await clientSignUp({
        client_user_id: results?.data?.results?.user_id,
        client_name: userName,
        client_type_id: 10,
        email: email,
        mobile: mobile,
        address: address,
        city: city,
        pincode: pincode,
      });
      if (success) {
        setSubmitting(true);
        const resp = await apiSignIn({ email, password });
        if (resp.data.results) {
          const {
            token,
            role_id,
            name,
            email,
            id,
            rolesAccess,
            permissions,
          } = resp.data.results;
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
          dispatch(
            setSelectedModule(
              selectedModule
                ? { label: "Task Management", value: 1 }
                : { label: "Loo Discovery", value: 0 }
            )
          );
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
          navigate(appConfig.authenticatedEntryPath);
        }
      }
    } catch (errors) {
      setMessage(errors?.response?.data?.error?.message || "Facing server issue. Please try after some time!!");
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
        initialValues={{
          userName: "",
          password: "",
          confirmPassword: "",
          email: "",
          mobile: "",
          address: "",
          city: "",
          pincode: "",
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
        {({ isSubmitting, isValid, submitCount }) => {
          return (
            <Form>
              <FormContainer className="grid grid-cols-2 gap-6">
                {!isValid && submitCount > 0 && (
                  <Alert className="col-span-2 mb-4" type="danger" showIcon>
                    Please fill in all required fields correctly.
                  </Alert>
                )}
                <Field
                  type="text"
                  autoComplete="off"
                  name="userName"
                  placeholder="User Name*"
                  component={Input}
                />
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email*"
                  component={Input}
                />
                <Field
                  type="text"
                  autoComplete="off"
                  name="mobile"
                  placeholder="Mobile Number*"
                  component={Input}
                  onKeyPress={(e) => {
                    if (new RegExp(/[0-9]/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                  maxlength="10"
                />
                <Field
                  type="text"
                  autoComplete="off"
                  name="address"
                  component={Input}
                  placeHolder="Address*"
                />
                <Field
                  type="text"
                  autoComplete="off"
                  name="city"
                  component={Input}
                  placeHolder="City*"
                />
                <Field
                  type="text"
                  autoComplete="off"
                  name="pincode"
                  component={Input}
                  placeHolder="Pincode*"
                  onKeyPress={(e) => {
                    if (new RegExp(/[0-9]/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                  maxlength="6"
                />
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password*"
                  component={PasswordInput}
                />
                <Field
                  autoComplete="off"
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  component={PasswordInput}
                />
                <Button
                  className="col-span-2 mt-2 bg-[#FFEB00] hover:bg-[#ffea008f] text-black"
                  block
                  shape="round"
                  loading={isSubmitting}
                  variant="solid"
                  type="submit"
                >
                  {isSubmitting ? "Creating Account..." : "Register"}
                </Button>
                <div className="col-span-2 text-center font-bold text-black">
                  <span>Already a user?</span>{" "}
                  <ActionLink to={signInUrl} themeColor={false}>Login Now</ActionLink>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </div >

  );
};

export default SignUpForm;
