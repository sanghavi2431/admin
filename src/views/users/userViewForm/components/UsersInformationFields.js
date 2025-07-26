import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const gender = [
  { label: "Male", value: 1 },
  { label: "Female", value: -1 },
  { label: "Other", value: 0 },
];

const UsersViewInformationFields = (props) => {
  const { values, touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
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
              placeHolder="Name"
              disabled
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
              placeHolder="email"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-2">
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
              placeHolder="Mobile Number"
              disabled
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
              placeHolder="City"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Pincode*"
            invalid={errors.pincode && touched.pincode}
            errorMessage={errors.pincode}
          >
            <Field
              type="text"
              autoComplete="off"
              name="pincode"
              value={values.pincode || ""}
              component={Input}
              placeHolder="Pincode"
              disabled
            />
          </FormItem>
        </div>

        <div className="col-span-2">
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
                  placeholder="Write User's address here....."
                  component={Input}
                  disabled
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Latitude"
            invalid={errors.lat && touched.lat}
            errorMessage={errors.lat}
          >
            <Field
              type="number"
              autoComplete="off"
              name="lat"
              value={values.lat || ""}
              component={Input}
              placeHolder="Latitude"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Longitude"
            invalid={errors.lng && touched.lng}
            errorMessage={errors.lng}
          >
            <Field
              type="number"
              autoComplete="off"
              name="lng"
              value={values.lng || ""}
              component={Input}
              placeHolder="Longitude"
              disabled
            />
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            label="Gender*"
            invalid={errors.gender && touched.gender}
            errorMessage={errors.gender}
          >
            <Field name="gender">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={gender}
                  value={values.gender}
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
        <div className="col-span-1">
          <FormItem
            label="Date of Birth*"
            invalid={errors.dob && touched.dob}
            errorMessage={errors.dob}
          >
            <Field name="dob" required={false} component={Input}>
              {({ field, form }) => (
                <DatePicker
                  field={field}
                  form={form}
                  placeholder="Pick a date"
                  value={values.dob}
                  dateFormat="YYYY-MM-DD"
                  clearable={true}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                  }}
                  disabled
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2">
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

export default UsersViewInformationFields;
