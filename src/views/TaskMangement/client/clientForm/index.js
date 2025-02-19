import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import ClientInformationFields from "./components/ClientInformationFields";
import { setButtonType } from "../clientAdd/store/dataSlice";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";

injectReducer("clientForm", reducer);

const ClientForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { initialData, onFormSubmit, onDiscard, type } = props;
  const validationSchemaAdd = Yup.object().shape({
    client_name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
    client_type: Yup.object()
      .required("Type is required")
      .typeError("Type is required"),
  });
  const validationSchemaEdit = Yup.object().shape({
    client_name: Yup.string()
      .trim()
      .required("Name is required")
      .typeError("Name is required"),
    client_type: Yup.object()
      .required("Type is required")
      .typeError("Type is required"),
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
                    <ClientInformationFields
                      touched={touched}
                      errors={errors}
                      values={values}
                      type={type}
                    />
                  </div>
                </div>
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
          </div>
        )}
      </Formik>
    </>
  );
});

ClientForm.defaultProps = {
  type: "edit",
  initialData: {
    client_name: "",
    client_type: "",
    status: "",
  },
};

export default ClientForm;
