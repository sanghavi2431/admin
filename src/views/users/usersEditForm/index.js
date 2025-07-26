import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import UsersInformationFields from "./components/UsersInformationFields";
import UsersImage from "./components/UserImage";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .typeError("Name is required"),
  email: Yup.string()
    .trim()
    .email()
    .required("Email is required")
    .typeError("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only"),
  city: Yup.string().required("City is required").typeError("City is required"),
  pincode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Pincode is required")
    .min(6, "Must be 6 digits only")
    .max(6, "Must be 6 digits only")
    .typeError("Pincode is required"),
  gender: Yup.object().required("Choose gender").typeError("Choose gender"),
  status: Yup.object()
    .required("Status is required")
    .typeError("Status is required"),
  dob: Yup.date().typeError("Not a valid date!").required("Date is required"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .typeError("Address is required"),
    role: Yup.object().required("Choose Role").typeError("Choose Role"),

});

const UserForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard } = props;

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <UsersInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <UsersImage
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
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
                    className="text-gray-800"
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
  );
});

UserForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    mobile: "",
    email: "",
    city: "",
    pincode: "",
    address: "",
    lat: "",
    lng: "",
    gender: "",
    dob: "",
    avatar: "",
    status: "",
    role:""
  },
};

export default UserForm;
