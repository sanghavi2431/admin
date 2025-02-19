import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { Form, Formik, yupToFormErrors } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import FacilityBulkUploadFiles from "./components/facilityUpload";
import { StickyFooter } from "@/components/shared";
import { AiOutlineSave } from "react-icons/ai";

const validationSchema = Yup.object().shape({
  file: Yup.array().min(1, "Please select file").required("Please select file"),
});

const FacilityUploadFileForm = forwardRef((props, ref) => {
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-3">
                  <FacilityBulkUploadFiles
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="flex items-center justify-between py-4"
                stickyClass="bg-white dark:bg-gray-800"
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

FacilityUploadFileForm.defaultProps = {
  type: "add",
  initialData: {
    file: "",
  },
};

export default FacilityUploadFileForm;
