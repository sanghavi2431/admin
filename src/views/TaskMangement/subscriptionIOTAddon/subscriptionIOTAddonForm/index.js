import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import IOTaddOnFields from "./components/IOTaddOnFields";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store";

injectReducer("subscribeIOTdevices", reducer);

const IOTaddOnForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { initialData, onFormSubmit, onDiscard, type } = props;
  const validationSchemaAdd = Yup.object().shape({
    plan_id: Yup.object()
    .required("Plan is required")
    .typeError("Plan is required"),
    name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
      amount: Yup.string()
      .trim()
      .required("Amount is required")
      .typeError("Amount is required")

  });
  const validationSchemaEdit = Yup.object().shape({
    name: Yup.string()
    .trim()
    .required("Name is required")
    .typeError("Name is required"),
    amount: Yup.string()
    .trim()
    .required("Amount is required")
    .typeError("Amount is required")
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
          <div className="">
            <Form className=" flex flex-col justify-between ">
              <FormContainer className="h-screen overflow-auto ">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                  <div className="lg:col-span-3">
                    <IOTaddOnFields
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
                    >
                      <span className="text-white">Save & Exit</span>
                    </Button>
                  </div>
                </div>
              </StickyFooter>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
});

IOTaddOnForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    amount: "",
    plan_id:""
  },
};

export default IOTaddOnForm;
