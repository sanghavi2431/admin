import React from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select, Upload } from "@/components/ui";
import { Field } from "formik";

export const type = [
  { label: "Public LTD", value: 1 },
  { label: "Private LTD", value: -1 },
];
export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const CorporatesInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 ">
        <div className="col-span-1">
          <FormItem
            label="Name*"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
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
            label="Contact Name*"
            invalid={errors.contact_name && touched.contact_name}
            errorMessage={errors.contact_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="contact_name"
              value={values.contact_name || ""}
              component={Input}
              placeholder="Contact Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Email*"
            invalid={errors.email && touched.email}
            errorMessage={errors.email}
          >
            <Field
              type="text"
              autoComplete="off"
              name="email"
              value={values.email || ""}
              component={Input}
              placeholder="Email"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Mobile Number*"
            invalid={errors.mobile && touched.mobile}
            errorMessage={errors.mobile}
          >
            <Field
              type="text"
              autoComplete="off"
              name="mobile"
              value={values.mobile || ""}
              component={Input}
              placeholder="Mobile Number"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Mobile Number-2"
            invalid={errors.mobile2 && touched.mobile2}
            errorMessage={errors.mobile2}
          >
            <Field
              type="text"
              autoComplete="off"
              name="mobile2"
              value={values.mobile2 || ""}
              component={Input}
              placeholder="Mobile Number-2"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="City*"
            invalid={errors.city && touched.city}
            errorMessage={errors.city}
          >
            <Field
              type="text"
              autoComplete="off"
              name="city"
              value={values.city || ""}
              component={Input}
              placeholder="City"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Address*"
            labelClass="!justify-start"
            invalid={errors.address && touched.address}
            errorMessage={errors.address}
          >
            <Field name="address">
              {({ field, form }) => (
                <Field
                  type="text"
                  autoComplete="off"
                  name="address"
                  textArea
                  value={values.address || ""}
                  placeholder="Write Corporate's address here....."
                  component={Input}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Type*"
            invalid={errors.type && touched.type}
            errorMessage={errors.type}
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
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default CorporatesInformationFields;
