import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import FacilityInformationFields from "./components/FacilityInformationFields";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { setButtonType } from "../facilityAdd/store/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setblock, setclient, setlocation } from "./store/dataSlice";

injectReducer("facilityaddForm", reducer);
const FacilityForm = forwardRef((props, ref) => {
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
    block_name: Yup.object()
      .required("Block Name is required")
      .typeError("Block Name is required"),
    floor_no: Yup.string()
      .required("Floor Number is required")
      .typeError("Floor Number is required"),
    facility_name: Yup.string()
      .trim()
      .required("Facility Name is required")
      .typeError("Facility Name is required"),
    booth: Yup.array()
      .of(
        Yup.object().shape({
          booth_name: Yup.string()
            .required('Booth name is required')
            .min(1, 'Booth name cannot be empty'),
        })
      )
      .min(1, 'At least one booth is required')
      .required('Booth is required')
      .typeError('Booth is required'),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .typeError("Description is required"),
    facility_type: Yup.object()
      .required("Facility Type is required")
      .typeError("Facility Type is required"),
    custom_facility_type: Yup.string().when("facility_type", {
      is: (val) => val && val.value === "other",
      then: Yup.string().required("Custom Facility Type is required"),
      otherwise: Yup.string().notRequired(),
    }),
  });
  const validationSchemaEdit = Yup.object().shape({
    booth: Yup.array()
      .of(
        Yup.object().shape({
          booth_name: Yup.string()
            .required('Booth name is required')
            .min(1, 'Booth name cannot be empty'),
        })
      )
      .min(1, 'At least one booth is required')
      .required('Booth is required')
      .typeError('Booth is required'),
    location_name: Yup.object()
      .required("Location Name is required")
      .typeError("Location Name is required"),
    block_name: Yup.object()
      .required("Block Name is required")
      .typeError("Block Name is required"),
    floor_no: Yup.string()
      .required("Floor Number is required")
      .typeError("Floor Number is required"),
    facility_name: Yup.string()
      .trim()
      .required("Facility Name is required")
      .typeError("Facility Name is required"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .typeError("Description is required"),
    status: Yup.object().required("Status is required").typeError("Status is required"),
  });

  return (
    <>
      <Formik
        enableReinitialize
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
        {({ values, touched, errors, isSubmitting }) => (
          <Form className="flex flex-col justify-between">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-3">
                  <FacilityInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
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
                    dispatch(setclient(""));
                    dispatch(setlocation(""));
                    dispatch(setblock(""));
                    let data = location?.state ? { ...location?.state, "facility": { "id": id, "page": type } } : { "facility": { "id": id, "page": type } }
                    navigate(`/block-Edit/${initialData?.block_name?.value}`, { state: data });
                  }}
                >
                  <span className="text-black">Previous</span>
                </Button>
                {type == "add" && <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-28 text-white bg-black"
                  color="black"
                  type="submit"
                  shape="circle"
                  onClick={() => {
                    dispatch(setclient(""));
                    dispatch(setlocation(""));
                    dispatch(setblock(""));
                    dispatch(setButtonType("add_more"));
                  }}
                >
                  <span className="text-white">Add More</span>
                </Button>}
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-28 text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                  color="black"
                  type="submit"
                  shape="circle"
                  onClick={() => {
                    dispatch(setclient(""));
                    dispatch(setlocation(""));
                    dispatch(setblock(""));
                    dispatch(setButtonType("next"))
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
                    onClick={() => { dispatch(setButtonType("save")) }}
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

FacilityForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    location_name: "",
    block_name: "",
    floor_no: "",
    facility_name: "",
    description: "",
    status: "",
    booth: [{ booth_name: "" }],
    facility_type: "",
    custom_facility_type: "",
  },
};

export default FacilityForm;
