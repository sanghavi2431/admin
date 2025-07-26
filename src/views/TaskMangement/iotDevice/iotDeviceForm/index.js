import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import reducer from "./store";
import { injectReducer } from "@/store";
import IOTDeviceInformationFields from "./components/IOTDeviceInformationFields";


injectReducer("IotDeviceForm", reducer);
const IOTDeviceForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard, type } = props;
  const validationSchemaAdd = Yup.object().shape({
    client: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
    location: Yup.object()
      .required("Location is required")
      .typeError("Location is required"),
    block: Yup.object()
      .required("Block is required")
      .typeError("Block is required"),
    facility: Yup.object()
      .required("Facility is required")
      .typeError("Facility is required"),
      booth: Yup.object()
      .required("Booth is required")
      .typeError("Booth is required"),
    deviceType: Yup.object()
      .required("Device Type is required")
      .typeError("Device Type is required"),
    device_id: Yup.string()
      .trim()
      .required("Device Id is required")
      .typeError("Input Device Id"),
    templates: Yup.object()
      .required("Templates is required")
      .typeError("Templates is required"),
    trigger_value: Yup.string()
      .trim()
      .required("Trigger value is required")
      .typeError("Input valid Value"),
    healthy_min: Yup.number().min(0, "Healthy min value must be at least 0"),
    healthy_max: Yup.number()
      .test('is-equal', 'Healthy max value must be equal to moderate min value', function (value) {
        const moderateMin = this.parent.moderate_min;
        return value === moderateMin;
      })
      .positive("Healthy max value must be a positive number")
      .typeError("Healthy max value must be a number"),
    moderate_min: Yup.number()
      .positive("Moderate min value must be a positive number")
      .typeError("Moderate min value must be a number"),
    moderate_max: Yup.number()
      .test('is-equal', 'Moderate max value must be equal to unhealthy min value', function (value) {
        const unhealthyMin = this.parent.unhealthy_min;
        return value === unhealthyMin;
      })
      .positive("Moderate max value must be a positive number")
      .typeError("Moderate max value must be a number"),
    unhealthy_min: Yup.number()
      .positive("Unhealthy min value must be a positive number")
      .typeError("Unhealthy min value must be a number"),
    unhealthy_max: Yup.number()
      .positive("Unhealthy max value must be a positive number")
      .typeError("Unhealthy max value must be a number"),

  });
  const validationSchemaEdit = Yup.object().shape({

    healthy_min: Yup.number().min(0, "Healthy min value must be at least 0"),
    healthy_max: Yup.number()
      .test('is-equal', 'Healthy max value must be equal to moderate min value', function (value) {
        const moderateMin = this.parent.moderate_min;
        return value === moderateMin;
      })
      .positive("Healthy max value must be a positive number")
      .typeError("Healthy max value must be a number")
,
    moderate_min: Yup.number()
      .positive("Moderate min value must be a positive number")
      .typeError("Moderate min value must be a number")
   ,
    moderate_max: Yup.number()
      .test('is-equal', 'Moderate max value must be equal to unhealthy min value', function (value) {
        const unhealthyMin = this.parent.unhealthy_min;
        return value === unhealthyMin;
      })
      .positive("Moderate max value must be a positive number")
      .typeError("Moderate max value must be a number")
    ,
    unhealthy_min: Yup.number()
      .positive("Unhealthy min value must be a positive number")
      .typeError("Unhealthy min value must be a number")
  ,
    unhealthy_max: Yup.number()
      .positive("Unhealthy max value must be a positive number")
      .typeError("Unhealthy max value must be a number")
     ,
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
            <FormContainer className="h-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-3">
                  <IOTDeviceInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                    type={type}
                  />
                </div>
              </div>
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
                  >
                    <span className="text-white">Save</span>
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

IOTDeviceForm.defaultProps = {
  type: "edit",
  initialData: {
    client: "",
    location: "",
    block: "",
    facility: "",
    booth: "",
    deviceType: "",
    device_id: "",
    templates: "",
    trigger_value: "",
    status: "",
    healthy_min: 0,
    healthy_max: 225,
    moderate_min:225,
    moderate_max: 750,
    unhealthy_min: 750,
    unhealthy_max: 6000
  },
};

export default IOTDeviceForm;
