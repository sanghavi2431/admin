import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import UsersViewInformationFields from "./components/UsersInformationFields";
import UserImage from "./components/UsersImage";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object().shape({});

const UsersForm = forwardRef((props, ref) => {
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
                <div className="lg:col-span-2">
                  <UsersViewInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <UserImage
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

UsersForm.defaultProps = {
  type: "edit",
  initialData: {
    name: "",
    mobile: "",
    email: "",
    city: "",
    pincode: "",
    address: "",
    lat: "",
    lng: "",
    gender: "",
    dob: "",
    avatar: "",
  },
};

export default UsersForm;
