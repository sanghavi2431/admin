import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";
import { fetchRoles } from "@/services/userService";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const gender = [
  { label: "Male", value: 1 },
  { label: "Female", value: -1 },
  { label: "Other", value: 0 },
];
const loadRoles = async () => {
  let response = await fetchRoles();
  return response.data.results;
};
const HostOfferInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="Title*"
            invalid={errors.title && touched.title}
            errorMessage={errors.title}
          >
            <Field
              type="text"
              autoComplete="off"
              name="title"
              value={values.title || ""}
              component={Input}
              placeholder="Title"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Woloo*"
            invalid={errors.woloo_id && touched.woloo_id}
            errorMessage={errors.woloo_id}
          >
            <Field
              type="text"
              autoComplete="off"
              name="woloo_id"
              value={values.woloo_id || ""}
              component={Input}
              placeholder="Woloo"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Description*"
            labelClass="!justify-start"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
                <Field
                  type="text"
                  autoComplete="off"
                  name="description"
                  textArea
                  value={values.description || ""}
                  placeholder="Write Description here....."
                  component={Input}
                  disabled
                />
          </FormItem>
        </div>
        
        <div className="col-span-1">
          <FormItem
            label="Start Date*"
            invalid={errors.start_date && touched.start_date}
            errorMessage={errors.start_date}
          >
            <Field name="start_date" required={false} component={Input}>
              {({ field, form }) => (
                <DatePicker
                  field={field}
                  form={form}
                  placeholder="Pick a date"
                  value={values.start_date}
                  dateFormat="yyyy-MM-dd"
                  clearable={true}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                  }}
                  maxDate={new Date()}
                  disabled
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="End Date*"
            invalid={errors.end_date && touched.end_date}
            errorMessage={errors.end_date}
          >
            <Field name="end_date" required={false} component={Input}>
              {({ field, form }) => (
                <DatePicker
                  field={field}
                  form={form}
                  placeholder="Pick a date"
                  value={values.end_date}
                  dateFormat="yyyy-MM-dd"
                  clearable={true}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                  }}
                  maxDate={new Date()}
                  disabled
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default HostOfferInformationFields;
