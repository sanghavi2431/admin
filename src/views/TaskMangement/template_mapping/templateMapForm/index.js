import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import TempMappingInformationFields from "./components/templateMapInformationFields";
import { injectReducer } from "@/store";
import reducer from "./store"

injectReducer("tempMapForm", reducer)
const TempMapForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard, type } = props;
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
    templates: Yup.object()
      .required("Templates is required")
      .typeError("Templates is required"),
    // cluster: Yup.object()
    // .required("Cluster is required")
    // .typeError("Cluster is required"),
    // start_time: Yup.string()
    //   .required("Start Time is required")
    //   .typeError("Start Time is required"),
    // end_time: Yup.string()
    //   .required("End Time is required")
    //   .typeError("End Time is required"),
    janitor: Yup.object()
      .required("Janitor is required")
      .typeError("Janitor is required"),
    facility: Yup.object()
      .required("Facility is required")
      .typeError("Facility is required"),
    slots: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required("Start time is required"),
          end_time: Yup.date().required("End time is required"),
        })
      )
      .min(1, "At least one slot is required")
      .required("At least one slot is required"),
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
    templates: Yup.object()
      .required("Templates is required")
      .typeError("Templates is required"),
    // cluster: Yup.object()
    // .required("Cluster is required")
    // .typeError("Cluster is required"),
    // start_time: Yup.string()
    //   .required("Start Time is required")
    //   .typeError("Start Time is required"),
    // end_time: Yup.string()
    //   .required("End Time is required")
    //   .typeError("End Time is required"),
    janitor: Yup.object()
      .required("Janitor is required")
      .typeError("Janitor is required"),
    facility: Yup.object()
      .required("Facility is required")
      .typeError("Facility is required"),
    slots: Yup.array()
      .of(
        Yup.object().shape({
          start_time: Yup.date().required("Start time is required"),
          end_time: Yup.date().required("End time is required"),
        })
      )
      .min(1, "At least one slot is required")
      .required("At least one slot is required"),
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
        {({ values, touched, errors, isSubmitting }) => (
          <Form className="h-full">
            <FormContainer className="h-screen overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-full">
                <div className="lg:col-span-3">
                  <TempMappingInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>

              </div>
            </FormContainer>
              <StickyFooter
                className="-mx-8 px-8 flex items-end justify-end py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex items-start justify-start">
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

TempMapForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    location_name: "",
    block_name: "",
    facility: "",
    janitor: "",
    // end_time: "",
    // start_time: "",
    templates: "",
    slots: [],
    // cluster: ""
  },
};

export default TempMapForm;
