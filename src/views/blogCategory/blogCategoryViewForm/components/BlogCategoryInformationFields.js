import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const BlogCategoryInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="Category Name*"
            invalid={errors.category_name && touched.category_name}
            errorMessage={errors.category_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="category_name"
              value={values.category_name || ""}
              component={Input}
              placeholder="Category Name"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Status*"
            invalid={errors.status && touched.status}
            errorMessage={errors.status}
          >
            <Field name="status">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.status}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        })
                      : form.setFieldValue(field.name, {})
                  }
                  isDisabled={true}
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default BlogCategoryInformationFields;
