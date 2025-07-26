import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import TaskInformationFields from "./components/TaskInformationFields";
import { setButtonType } from "../task_templateAdd/store/dataSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

injectReducer("taskAddForm", reducer);
const TaskForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    template_name: Yup.string()
      .trim()
      .required("Template Name is required")
      .typeError("Template Name is required"),
    template_category: Yup.object().required("Template category is required").typeError("Template category is required"),
    task_ids: Yup.array()
      .min(1)
      .required("Task Check List is required")
      .typeError("Task Check List is required"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .typeError("Description is required"),
    estimated_time: Yup.number()
      .required("Estimated Time is required")
      .typeError("Input number"),
    days: Yup.array()
      .min(1)
      .required("Day is required")
      .typeError("Day is required"),
    shift_ids: Yup.array()
      .min(1)
      .required("Shift is required")
      .typeError("Shift is required"),
  });
  const validationSchemaEdit = Yup.object().shape({
    client_name: Yup.object()
      .required("Client Name is required")
      .typeError("Client Name is required"),
    location_name: Yup.object()
      .required("Location Name is required")
      .typeError("Location Name is required"),
    block_name: Yup.object()
      .required("Block Name is required")
      .typeError("Block Name is required"),
    template_name: Yup.string()
      .trim()
      .required("Template Name is required")
      .typeError("Template Name is required"),
    template_category: Yup.object().required("Template category is required").typeError("Template category is required"),
    task_ids: Yup.array()
      .min(1)
      .required("Task Check List is required")
      .typeError("Task Check List is required"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .typeError("Description is required"),
    estimated_time: Yup.number()
      .required("Estimated Time is required")
      .typeError("Input number"),
    days: Yup.array()
      .min(1)
      .required("Day is required")
      .typeError("Day is required"),
    shift_ids: Yup.array()
      .min(1)
      .required("Shift is required")
      .typeError("Shift is required"),
    status: Yup.object()
      .required("Status is required")
      .typeError("Status is required"),
  });

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={location?.state?.task_temp_data || initialData}
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-3">
                  <TaskInformationFields
                    id={id}
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                    setFieldValue={setFieldValue}
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
                  disabled={
                    location?.state?.hasOwnProperty("shift") ? false : true
                  }
                  onClick={() => {
                    let data = location?.state
                      ? {
                        ...location?.state,
                        task_temp: { id: id, page: type },
                      }
                      : { task_temp: { id: id, page: type } };
                    let shiftId = initialData.hasOwnProperty("status")
                      ? initialData?.shift_ids[0]?.value
                      : initialData?.shift?.value;

                    navigate(`/shift-Edit/${shiftId}`, { state: data });
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

TaskForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    location_name: "",
    template_name: "",
    task_ids: "",
    description: "",
    estimated_time: "",
    days: "",
    shift_ids: "",
    status: "",
  },
};

export default TaskForm;
