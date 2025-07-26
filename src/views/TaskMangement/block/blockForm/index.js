import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import BlockInformationFields from "./components/BlockInformationFields";
import { setButtonType } from "../blockAdd/store/dataSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MapConfirmation from "../blockAdd/components/MapConfirmation";

injectReducer("blockForm", reducer);

const BlockForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { initialData, onFormSubmit, onDiscard, type, id } = props;
  const validationSchemaAdd = Yup.object().shape({
    client_name: Yup.object()
      .required("Client Name is required")
      .typeError("Client Name is required"),
    location_name: Yup.object()
      .required("Location Name is required")
      .typeError("Location Name is required"),
    name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
    lat: Yup.number().typeError("Input number"),
    lng: Yup.number().typeError("Input number"),
    min_floor: Yup.number().typeError("Input number"),
    max_floor: Yup.number().typeError("Input number"),
  });
  const validationSchemaEdit = Yup.object().shape({
    client_name: Yup.object()
      .required("Client Name is required")
      .typeError("Client Name is required"),
    location_name: Yup.object()
      .required("Location Name is required")
      .typeError("Location Name is required"),
    name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
      lat: Yup.number().typeError("Input number"),
      lng: Yup.number().typeError("Input number"),
    status: Yup.object()
      .required("Status is required")
      .typeError("Status is required"),
  });

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={
          type == "add" ? validationSchemaAdd : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting, resetForm);
        }}
      >
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col justify-between ">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-3">
                  <BlockInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div>
              <MapConfirmation
                setFieldValue={setFieldValue}
                type={type}
                values={values}
              />
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
                      ? { ...location?.state, block: { id: id, page: type } }
                      : { block: { id: id, page: type } };
                    navigate(
                      `/location-Edit/${initialData?.location_name?.value}`,
                      { state: data }
                    );
                  }}
                >
                  <span className="text-black">Previous</span>
                </Button>
                {type == "add" && (
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    className="w-28 text-white bg-black"
                    color="black"
                    type="submit"
                    shape="circle"
                    onClick={() => {
                      dispatch(setButtonType("add_more"));
                    }}
                  >
                    <span className="text-white">Add More</span>
                  </Button>
                )}
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

BlockForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    location_name: "",
    name: "",
    min_floor: "",
    max_floor: "",
    lat: "",
    lng: "",
    status: "",
  },
};

export default BlockForm;
