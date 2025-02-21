import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import * as Yup from "yup";
import LocationInformationFields from "./components/LocationInformationFields";
import LocationImages from "./components/LocationImage";
import { setButtonType } from "./store/dataSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MapConfirmation from "../locationAdd/components/MapConfirmation";

injectReducer("locationForm", reducer);
const LocationForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { initialData, onFormSubmit, onDiscard, type, id } = props;
  const validationSchemaAdd = Yup.object().shape({
    client_name: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
    location_name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
    address: Yup.string()
      .trim()
      .required("Address is required")
      .typeError("Input address"),
    city: Yup.string().required("City is required").typeError("Input city"),
    lat: Yup.number()
      .required("Latitude is required")
      .typeError("Input number"),
    lng: Yup.number()
      .required("Longitude is required")
      .typeError("Input number"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .typeError("Must be only digits"),
  });
  const validationSchemaEdit = Yup.object().shape({
    client_name: Yup.object()
      .required("Client Name is required")
      .typeError("Client Name is required"),
    location_name: Yup.string()
      .trim()
      .required("Location Name is required")
      .typeError("Location Name is required"),
    address: Yup.string()
      .trim()
      .required("Address is required")
      .typeError("Input address"),
    city: Yup.string().required("City is required").typeError("Input city"),
    lat: Yup.number()
      .required("Latitude is required")
      .typeError("Input number"),
    lng: Yup.number()
      .required("Longitude is required")
      .typeError("Input number"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .typeError("Must be only digits"),
  });

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={
          type == "add" ? validationSchemaAdd : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting, setFieldValue }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting, setFieldValue);
        }}
      >
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form className=" flex flex-col justify-between ">
            <FormContainer className="h-screen overflow-auto  ">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-2">
                  <LocationInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
                <div className="lg:col-span-1">
                  <LocationImages
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                  <MapConfirmation
                    setFieldValue={setFieldValue}
                    type={type}
                    values={values}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  loading={isSubmitting}
                  className="w-28 "
                  type="button"
                  shape="circle"
                  disabled={location?.state ? false : true}
                  onClick={() => {
                    let data = location?.state
                      ? { ...location?.state, location: { id: id, page: type } }
                      : { location: { id: id, page: type } };
                    navigate(
                      `/client-Edit/${initialData?.client_name?.value}`,
                      { state: data }
                    );
                  }}
                >
                  <span className="text-black">Previous</span>
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-28 text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                  color="black"
                  type="submit"
                  shape="circle"
                  onClick={() => {
                    dispatch(setButtonType("next"));
                  }}
                >
                  <span className="text-black">Next</span>
                </Button>
              </div>
            </FormContainer>

            <StickyFooter
              className="-mx-8 px-8 flex items-end justify-end py-4"
              stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div>
                <div className="md:flex items-end justify-end">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3 w-28 "
                    onClick={() => onDiscard?.()}
                    type="button"
                    shape="circle"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    // icon={<AiOutlineSave />}
                    className="w-28 text-white bg-black"
                    color="black"
                    type="submit"
                    shape="circle"
                    onClick={() => {
                      dispatch(setButtonType("save"));
                    }}
                  >
                    <span className="text-white">Save & Exit</span>
                  </Button>
                </div>
              </div>
            </StickyFooter>
          </Form>
        )}
      </Formik>
    </>
  );
});

LocationForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    location_name: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    pincode: "",
    status: "",
  },
};

export default LocationForm;
