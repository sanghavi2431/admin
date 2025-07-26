import React from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
export const type = [
  { label: "text", value: 1 },
  { label: "image", value: 0 },
];
export const group = [
  { label: "Admin", value: 1 },
  { label: "General", value: 2 },
  { label: "Site", value: 3 },
  { label: "Review", value: 4 },

];
const AdminInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4 " >
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
        <div className="col-span-1">
          <FormItem
            label="Name"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
            asterisk
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values.name || ""}
              component={Input}
              placeholder="Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Key"
            invalid={errors.key && touched.key}
            errorMessage={errors.key}
            asterisk
          >
            <Field
              type="text"
              autoComplete="off"
              name="key"
              value={values.key || ""}
              component={Input}
              placeholder="Key"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Type"
            invalid={errors.type && touched.type}
            errorMessage={errors.type}
            asterisk
          >
            <Field name="type">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={type}
                  value={values.type}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      })
                      : form.setFieldValue(field.name, {})
                  }
                  
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Group"
            invalid={errors.group && touched.group}
            errorMessage={errors.group}
            asterisk
          >
            <Field name="group">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={group}
                  value={values.group}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      })
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default AdminInformationFields;
