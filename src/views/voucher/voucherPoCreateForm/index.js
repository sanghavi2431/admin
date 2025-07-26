import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import VoucherPOUploadFiles from "./components/VoucherPOUpload";
import { StickyFooter } from "@/components/shared";
import VoucherPOInformationFields from "./components/VoucherPoInformationFields";
const validationSchema = Yup.object().shape({
  file: Yup.mixed().required("Please Select Image"),
  amount: Yup.string()
    .required("Amount Required")
    .min(0, "value must be Positive")
    .typeError("must be number"),
  utrNo: Yup.string()
    .required("UTR No. Required")
    .min(0, "value must be Positive")
    .typeError("must be number"),
});

const WoloosUploadFileForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard } = props;

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-3 mb-0">
                  <VoucherPOUploadFiles
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-3">
                  <VoucherPOInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex items-center">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    className="text-gray-800"
                    type="submit"
                  >
                    Upload
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

WoloosUploadFileForm.defaultProps = {
  type: "add",
  initialData: {
    file: "",
    utrNo: "",
    amount: "",
  },
};

export default WoloosUploadFileForm;
