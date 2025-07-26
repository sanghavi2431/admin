import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem } from "@/components/ui";
import { Field } from "formik";

const VoucherPOInformationFields = (props) => {
  const { values, touched, errors } = props;

  return (
    <AdaptableCard className="" divider>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-1 ">
        <div className="col-span-3">
          <FormItem
            label="UTR No*"
            invalid={errors.utrNo && touched.utrNo}
            errorMessage={errors.utrNo}
          >
            <Field
              type="text"
              autoComplete="off"
              name="utrNo"
              value={values.utrNo || ""}
              component={Input}
              placeholder="UTR No."
            />
          </FormItem>
        </div>
        <div className="col-span-3">
          <FormItem
            label="Amount*"
            invalid={errors.amount && touched.amount}
            errorMessage={errors.amount}
          >
            <Field
              type="text"
              autoComplete="off"
              name="amount"
              value={values.amount || ""}
              component={Input}
              placeholder="Amount"
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default VoucherPOInformationFields;
