import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";

export const corporate = [
  { label: "Public LTD", value: 1 },
  { label: "Private LTD", value: -1 },
];
export const subscription = [
  { label: "1 Day", value: 0 },
  { label: "1 Week", value: 1 },
  { label: "1 Month", value: 2 },
  { label: "2 Months", value: 3 },
  { label: "3 Months", value: 4 },
  { label: "6 Months", value: 5 },
  { label: "1 Year", value: 6 },
];
export const payment_mode = [
  { label: "Online", value: 1 },
  { label: "Offline", value: 0 },
];
export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const lifetime_free = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
export const type_of_organization = [
  { label: "Private", value: 0 },
  { label: "Government", value: 1 },
];
export const type_of_voucher = [
  { label: "Free", value: 0 },
  { label: "Paid", value: 1 },
];
const VoucherInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="Corporate*"
            invalid={errors.corporate && touched.corporate}
            errorMessage={errors.corporate}
          >
            <Field name="corporate">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={corporate}
                  value={values.corporate}
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
            label="Expiry*"
            invalid={errors.expiry && touched.expiry}
            errorMessage={errors.expiry}
          >
            <Field name="expiry" required={false} component={Input}>
              {({ field, form }) => (
                <DatePicker
                  field={field}
                  form={form}
                  placeholder="Pick a date"
                  value={values.expiry}
                  dateFormat="yyyy-MM-dd"
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
        <div className="col-span-1">
          <FormItem
            label="Life Time Free*"
            invalid={errors.lifetime_free && touched.lifetime_free}
            errorMessage={errors.lifetime_free}
          >
            <Field name="lifetime_free">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={lifetime_free}
                  value={values.lifetime_free}
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
            label="Type Of Voucher*"
            invalid={errors.type_of_voucher && touched.type_of_voucher}
            errorMessage={errors.type_of_voucher}
          >
            <Field name="type_of_voucher">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={type_of_voucher}
                  value={values.type_of_voucher}
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
              placeholder="No. Of Uses"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Subscription Plan*"
            invalid={errors.subscription && touched.subscription}
            errorMessage={errors.subscription}
          >
            <Field name="subscription">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={subscription}
                  value={values.subscription}
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
            label="Discount Percentage*"
            invalid={errors.discount_percentage && touched.discount_percentage}
            errorMessage={errors.discount_percentage}
          >
            <Field
              type="text"
              autoComplete="off"
              name="discount_percentage"
              value={values.discount_percentage || ""}
              component={Input}
              placeholder="Discount Percentage"
              min="0"
              max="99"
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
        <div className="col-span-1">
          <FormItem
            label="Value"
            invalid={errors.value && touched.value}
            errorMessage={errors.value}
          >
            <Field
              type="text"
              autoComplete="off"
              name="value"
              value={values.value}
              component={Input}
              placeholder="Value"
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Payment Mode*"
            invalid={errors.payment_mode && touched.payment_mode}
            errorMessage={errors.payment_mode}
          >
            <Field name="payment_mode">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={payment_mode}
                  value={values.payment_mode}
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

export default VoucherInformationFields;
