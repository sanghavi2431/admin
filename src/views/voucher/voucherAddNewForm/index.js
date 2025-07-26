import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import VoucherInformationFields from "./components/voucherInformationFields";
import VoucherExcelFile from "./components/UploadExcelFile";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useSelector } from "react-redux";

injectReducer("voucherAddForm", reducer);
const VoucherForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard } = props;
  const type_of_voucher = useSelector((state) => state.voucherAddForm.data.type_of_voucher);
  const life_time_free = useSelector((state) => state.voucherAddForm.data.life_time_free);

  const validationSchema = Yup.object().shape({
    corporate: Yup.object()
      .required("Please select corporate")
      .typeError("Please select corporate"),
    expiry: Yup.date()
      .required("Date of expiry is required")
      .typeError("Please select date"),
    subscription: Yup.object()
      .required("Please select subscription")
      .typeError("Please select subscription"),
    discount_percentage: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(2, "Discount should less than 100")
      .required("Discount percentage is required"),
    lifetime_free: Yup.object().shape({
      label: Yup.string().required("Please select"),
    }),
    number_of_uses: Yup.string()
      .required("No of uses is required")
      .matches(/^[0-9]+$/, "Must be only digits"),
    payment_mode: life_time_free?.value === "0" && type_of_voucher?.value === "1"?Yup.object().required("Please select payment mode") .typeError("Please select payment mode"):Yup.string().typeError("Please select payment mode"),
    type_of_voucher: life_time_free?.value === "0" ? Yup.object().required("Please select voucher type") .typeError("Please select voucher type"):Yup.object().typeError("Please select voucher type"),
  });

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
                  <VoucherInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <VoucherExcelFile
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

VoucherForm.defaultProps = {
  type: "add",
  initialData: {
    corporate: "",
    expiry: "",
    lifetime_free: "",
    type_of_voucher: "",
    number_of_uses: "",
    subscription: "",
    discount_percentage: 0,
    value: 0,
    payment_mode: "",
    is_email: 0,
    file: "",
  },
};

export default VoucherForm;
