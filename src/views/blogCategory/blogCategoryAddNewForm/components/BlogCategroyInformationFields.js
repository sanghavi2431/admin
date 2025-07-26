import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";

const BlogCategroyInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-1 gap-3">
        <div className="">
          <FormItem
            label="Category Name*"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values.name || ""}
              component={Input}
              placeholder="Category Name"
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default BlogCategroyInformationFields;
