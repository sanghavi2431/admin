import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem } from "@/components/ui";
import { Field } from "formik";

const VoucherInformationFields = (props) => {
  const { values, touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 ">
        <div className="col-span-1">
          <FormItem
            label="No. Of Users*"
            invalid={errors.number_of_uses && touched.number_of_uses}
            errorMessage={errors.number_of_uses}
          >
            <Field
              type="text"
              autoComplete="off"
              name="number_of_uses"
              value={values.number_of_uses || ""}
              component={Input}
              placeholder="No. Of number_of_uses"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default VoucherInformationFields;
