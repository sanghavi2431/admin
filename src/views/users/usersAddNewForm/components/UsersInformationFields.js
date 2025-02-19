import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";
import { fetchRoles } from "@/services/userService";
import AsyncSelect from "react-select/async";

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
const UsersInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
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
              placeholder="email"
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
        <div className="col-span-2">
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
              placeholder="Pincode"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
              maxlength="6"
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
              placeholder="Latitude"
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
              placeholder="Longitude"
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
                  value={field.dob}
                  dateFormat="yyyy-MM-dd"
                  clearable={true}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date);
                  }}
                  maxDate={new Date()}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Role*"
            invalid={errors.role && touched.role}
            errorMessage={errors.role}
          >
            <Field name="role">
              {({ field, form }) => (
                <Select
                field={field}
                form={form}
                required
                loadOptions={loadRoles}
                defaultOptions
                isSearchable={true}
                cacheOptions={false}
                value={values.role}
                componentAs={AsyncSelect}
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

export default UsersInformationFields;
