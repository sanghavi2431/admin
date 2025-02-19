import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import FranchiseInformationFields from "./components/FranchiseInformationFields";
import FranchiseImages from "./components/FranchiseImage";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Woloo owner name is required")
    .typeError("Woloo owner name is required"),
  title: Yup.string()
    .trim()
    .required("Woloo host name is required")
    .typeError("Woloo host name is required"),
  address: Yup.string()
    .trim()
    .required("Address is required")
    .typeError("Input address"),
  city: Yup.string().required("City is required").typeError("Input city"),
  lat: Yup.number().required("Latitude is required").typeError("Input number"),
  lng: Yup.number().required("Longitude is required").typeError("Input number"),
  image: Yup.array().min(1, "Image is required").required("Image is required"),
  opening_hours: Yup.array(
    Yup.object()
      .shape({
        time: Yup.array()
          .of(
            Yup.string()
              .required("Please enter time")
              .typeError("Please enter time")
          )
          .required("Please enter time"),
      })
      .required()
      .typeError("Please enter time")
  ).typeError("Please enter time"),
  segregated: Yup.object().typeError("Required").required("Required"),
  is_covid_free: Yup.object().required("Required").typeError("Required"),
  is_safe_space: Yup.object().required("Required").typeError("Required"),
  is_clean_and_hygiene: Yup.object().required("Required").typeError("Required"),
  is_sanitary_pads_available: Yup.object()
    .required("Required")
    .typeError("Required"),
  is_makeup_room_available: Yup.object()
    .required("Required")
    .typeError("Required"),
  is_coffee_available: Yup.object().required("Required").typeError("Required"),
  is_sanitizer_available: Yup.object()
    .required("Required")
    .typeError("Required"),
  is_feeding_room: Yup.object().required("Required").typeError("Required"),
  is_wheelchair_accessible: Yup.object()
    .required("Required")
    .typeError("Required"),
  is_washroom: Yup.object().required("Required").typeError("Required"),
  is_premium: Yup.object().required("Required").typeError("Required"),
  restaurant: Yup.object().required("Required").typeError("Required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits")
    .typeError("Must be only digits"),
  recommended_mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be 10 digits only")
    .max(10, "Must be 10 digits only")
    .typeError("Must be only digits"),
});

const FranchiseForm = forwardRef((props, ref) => {
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
                  <FranchiseInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <FranchiseImages
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

FranchiseForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    title: "",
    description: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    opening_hours: [{ time: "" }],
    segregated: "",
    is_covid_free: "",
    is_safe_space: "",
    is_clean_and_hygiene: "",
    is_sanitary_pads_available: "",
    is_makeup_room_available: "",
    is_coffee_available: "",
    is_sanitizer_available: "",
    is_feeding_room: "",
    is_wheelchair_accessible: "",
    is_washroom: "",
    is_premium: "",
    recommended_by: "",
    recommended_mobile: "",
    restaurant: "",
    pincode: "",
    image: "",
    rating: "",
  },
};

export default FranchiseForm;
