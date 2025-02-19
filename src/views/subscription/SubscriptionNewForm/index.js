import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik, yupToFormErrors } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import SubscriptionInformationFields from "./components/SubscriptionInformationFields";
import SubscriptionImages from "./components/SubscriptionImage";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  days: Yup.object()
    .required("Subscription Time Required")
    .typeError("Subscription Time Required"),
  price: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Price is required")
    .typeError("Price is required"),
  discount: Yup.number()
    .max(99, "Discount must be less than 100")
    .min(0, "Discount must be more than 0")
    .required("Discount is required"),
  backgroud_color: Yup.string().required("Background color is required"),
  shield_color: Yup.string().required("Shield color is required"),
  is_recommended: Yup.object()
    .required("Recommended is required")
    .typeError("Recommended is required"),
  description: Yup.string().trim().required("Description is required"),
  is_voucher: Yup.object()
    .required("Voucher is required")
    .typeError("Voucher is required"),
  is_insurance_available: Yup.object()
    .required("Insurance is required")
    .typeError("Insurance is required"),
  image: Yup.array().min(1, "Image is required").required("Image is required"),
});
const SubscriptionForm = forwardRef((props, ref) => {
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-5/6">
                <div className="lg:col-span-2">
                  <SubscriptionInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <SubscriptionImages
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
                    icon={<AiOutlineSave />}
                    className="text-gray-800"
                    type="submit"
                  >
                    Save
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

SubscriptionForm.defaultProps = {
  type: "add",
  initialData: {
    name: "",
    days: "",
    price: "",
    discount: "0",
    backgroud_color: "",
    shield_color: "",
    is_recommended: { label: "No", value: 0 },
    description: "",
    is_insurance_available: "",
    is_voucher: { label: "No", value: 0 },
    image: "",
    insurance_desc: "",
    strike_out_price: "",
  },
};

export default SubscriptionForm;
