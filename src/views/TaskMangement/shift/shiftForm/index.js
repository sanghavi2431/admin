import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import * as Yup from "yup";
import ShiftInformationFields from "./components/ShiftInformationFields";
import { setButtonType } from "../shiftAdd/store/dataSlice";
import { useDispatch } from "react-redux";

injectReducer("shiftForm", reducer);

const ShiftForm = forwardRef((props, ref) => {
    const dispatch = useDispatch();
  const { initialData, onFormSubmit, onDiscard, type } = props;
  const validationSchemaAdd = Yup.object().shape({
    client_name: Yup.object()
      .required("Client Name is required")
      .typeError("Client Name is required"),
    location_name: Yup.object()
      .required("Location Name is required")
      .typeError("Location Name is required"),
      shift_name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
      start_time: Yup.string()
      .required("Start time is required")
      .typeError("Start time is required"),
      end_time: Yup.string()
      .required("End time is required")
      .typeError("End time is required"),
    
  
  });
  const validationSchemaEdit = Yup.object().shape({
    client_name: Yup.object()
    .required("Client Name is required")
    .typeError("Client Name is required"),
  location_name: Yup.object()
    .required("Location Name is required")
    .typeError("Location Name is required"),
    shift_name: Yup.string()
    .trim()
    .required("Name is required")
    .typeError("Name is required"),
    start_time: Yup.string()
    .required("Start time is required")
    .typeError("Start time is required"),
    end_time: Yup.string()
    .required("End time is required")
    .typeError("End time is required"),
    status: Yup.object().required("Status is required").typeError("Status is required"),
  });

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={
          type == "add" ? validationSchemaAdd : validationSchemaEdit
        }
        onSubmit={(values, { setSubmitting,resetForm }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting,resetForm);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form className="flex flex-col justify-between">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-3">
                  <ShiftInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div>
              <div className="flex gap-2">
              {type=="add" && <Button
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
                </Button>}
              <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    className="w-28 text-black bg-[#FFEB00] hover:bg-[#ffea008f]"
                    color="black"
                    type="submit" 
                    shape="circle"
                    onClick={()=>{dispatch(setButtonType("next"))}}
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
                    onClick={()=>{dispatch(setButtonType("save"))}}
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

ShiftForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name:"",
    location_name:"",
    shift_name:"",
   start_time:"",
   end_time:"",
    status:""
  },
};

export default ShiftForm;
