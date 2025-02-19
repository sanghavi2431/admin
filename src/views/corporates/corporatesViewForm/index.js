import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import CorporatesInformationFields from "./components/CorporatesInformationFields";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({});

const CorporatesForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
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
                  <CorporatesInformationFields
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
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

CorporatesForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    contact_name: "",
    mobile: "",
    mobile2: "",
    email: "",
    city: "",
    address: "",
    type: "",
  },
};

export default CorporatesForm;
