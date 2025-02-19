import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import WoloosViewInformationFields from "./components/WoloosInformationFields";
import WoloosImages from "./components/WoloosImage";

const validationSchema = Yup.object().shape({});

const WoloosViewForm = forwardRef((props, ref) => {
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
                <div className="lg:col-span-2">
                  <WoloosViewInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <WoloosImages
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

WoloosViewForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    title: "",
    description: "",
    status: "",
    host_owner: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    opening_hours: [{ time: "" }],
    segregated: "",
    is_covid_free: "",
    is_safe_space: "",
    is_clean_and_hygiene: "",
    is_sanitary_pads_available: "",
    is_makeup_room_available: "",
    is_coffee_available: "",
    is_sanitizer_available: "",
    is_feeding_room: "",
    is_wheelchair_accessible: "",
    is_washroom: "",
    is_premium: "",
    recommended_by: "",
    recommended_mobile: "",
    image: "",
    rating: "",
  },
};

export default WoloosViewForm;
