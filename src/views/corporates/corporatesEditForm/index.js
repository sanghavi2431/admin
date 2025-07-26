import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik, yupToFormErrors } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import CorporatesInformationFields from "./components/corporatesInformationFields";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  contact_name: Yup.string().trim().required("Contact name is required"),
  email: Yup.string()
    .email()
    .trim()
    .required("Email is required")
    .typeError("Invalid Mail"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Mobile number is required"),
  mobile2: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Mobile number is required"),
  address: Yup.string().trim().required("Address is required"),
  city: Yup.string().required("City is required").typeError("Input city"),
  type: Yup.object().required("Please select type").typeError("Choose Type"),
  status: Yup.object().required("Choose Status").typeError("Choose status"),
});

const CorporateForm = forwardRef((props, ref) => {
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
                <div className="lg:col-span-3">
                  <CorporatesInformationFields
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

CorporateForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    contact_name: "",
    mobile: "",
    mobile2: "",
    email: "",
    city: "",
    address: "",
    type: "",
    status: "",
  },
};

export default CorporateForm;
