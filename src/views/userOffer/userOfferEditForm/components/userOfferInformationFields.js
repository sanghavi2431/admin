import React from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select, Upload } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";
import AsyncSelect from "react-select/async";
import { getOffer } from "@/services/userOffers";

export const Status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const loadCategory = async () => {
  let response = await getOffer();
  return response.data.results;
};
const onStateChange = (form, field, optn) => {
  form.setFieldValue(field.name, { label: optn.label, value: optn.value });
};
const UserOfferInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="User Mobile Number*"
            invalid={errors.mobile && touched.mobile}
            errorMessage={errors.mobile}
          >
            <Field
              type="text"
              autoComplete="off"
              name="mobile"
              value={values.mobile || ""}
              component={Input}
              placeholder="User Mobile Number"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Offer*"
            invalid={errors.offer && touched.offer}
            errorMessage={errors.offer}
          >
            <Field name="offer">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  loadOptions={loadCategory}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.offer}
                  componentAs={AsyncSelect}
                  onChange={(option) => onStateChange(form, field, option)}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
        <FormItem
          label="Expiry*"
          invalid={errors.expiry_date && touched.expiry_date}
          errorMessage={errors.expiry_date}
        >
          <Field name="expiry_date" required={false} component={Input}>
            {({ field, form }) => (
              <DatePicker
                field={field}
                form={form}
                placeholder="Pick a date"
                value={values.expiry_date}
                dateFormat="yyyy-MM-dd"
                clearable={true}
                onChange={(date) => {
                  form.setFieldValue(field.name, date);
                }}
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
                  options={Status}
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

export default UserOfferInformationFields;
