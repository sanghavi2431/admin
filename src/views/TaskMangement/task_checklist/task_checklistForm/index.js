import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import TaskChecklistInformationFields from "./components/TaskChecklistInformationFields";
import TaskChecklistImages from "./components/TaskChecklistImages";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setButtonType } from "../task_checklistAdd/store/dataSlice";

injectReducer("task_checklistForm", reducer);

const ChecklistForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard, type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const validationSchemaAdd = Yup.object().shape({
    task_name: Yup.string().required("Task name is required").typeError("Task name is required"),
    task_category: Yup.object().required("Task category is required").typeError("Task category is required"),
    estimated_time: Yup.string().required("Estimated time is required").typeError("Estimated time is required"),
  });
  const validationSchemaEdit = Yup.object().shape({
    task_name: Yup.string().required("Task name is required").typeError("Task name is required"),
    task_category: Yup.object().required("Task category is required").typeError("Task category is required"),
    estimated_time: Yup.string().required("Estimated time is required").typeError("Estimated time is required"),
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
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting, id }) => (
          <Form className="flex flex-col justify-between ">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-2">
                  <TaskChecklistInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
                <div className="lg:col-span-1">
                  <TaskChecklistImages
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
                  disabled={
                    location?.state?.hasOwnProperty("task_template") ? false : true
                  }
                  onClick={() => {
                    if (location?.state?.task_template?.page == "edit") {
                      navigate(`/task_template-Edit/${location?.state?.task_template?.id}`, { state: location?.state })
                    }
                    else {
                      navigate("/task_template-AddNew", { state: location?.state })
                    }
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
                  disabled={
                    location?.state?.hasOwnProperty("task_template") ? false : true
                  }
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
                  <span className="text-white">Save</span>
                </Button>
              </div>
            </StickyFooter>
          </Form>
        )}
      </Formik>
    </>
  );
});

ChecklistForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    task_name: "",
    status: ""
  },
};

export default ChecklistForm;
