import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
export const days = [
  { label: "1 week", value: 1 },
  { label: "1 month", value: 2 },
  { label: "2 months", value: 3 },
  { label: "3 months", value: 4 },
  { label: "6 months", value: 5 },
  { label: "1 year", value: 6 },
];
export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const is_recommended = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
export const is_insurance_available = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
export const is_voucher = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

const SubscriptionInformationFields = (props) => {
  const { values, touched, errors } = props;
  const [InsuranceFlag, setInsuranceFlag] = useState(false);
  useEffect(() => {
    if (values.is_insurance_available.value == "1") {
      setInsuranceFlag(true);
    } else {
      setInsuranceFlag(false);
    }
  }, [values.is_insurance_available]);
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
        <div className="col-span-2">
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
            label="Subscription Time*"
            invalid={errors.days && touched.days}
            errorMessage={errors.days}
          >
            <Field name="days">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={days}
                  value={values.days}
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
            label="Insurance*"
            invalid={
              errors.is_insurance_available && touched.is_insurance_available
            }
            errorMessage={errors.is_insurance_available}
          >
            <Field name="is_insurance_available">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={is_insurance_available}
                  value={values.is_insurance_available}
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
        {InsuranceFlag ? (
          <div className="col-span-2">
            <FormItem
              label="Insurance Description"
              labelClass="!justify-start"
              invalid={errors.insurance_desc && touched.insurance_desc}
              errorMessage={errors.insurance_desc}
            >
              <Field name="insurance_desc">
                {({ field, form }) => (
                  <Field
                    type="text"
                    autoComplete="off"
                    name="insurance_desc"
                    textArea
                    value={values.insurance_desc || ""}
                    placeholder="Write Insurance Description here....."
                    component={Input}
                  />
                )}
              </Field>
            </FormItem>
          </div>
        ) : (
          <></>
        )}

        <div className="col-span-1">
          <FormItem
            label="Price*"
            invalid={errors.price && touched.price}
            errorMessage={errors.price}
          >
            <Field
              type="text"
              autoComplete="off"
              name="price"
              value={values.price || ""}
              component={Input}
              placeholder="Price"
              min="0"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
          {values.price > 0 && values.discount == 0 ? (
            <span className="font-thin text-red-500">{`Price with GST is ${_.round(
              values.price * 1.18
            )}`}</span>
          ) : (
            <></>
          )}
          {values.price > 0 && values.discount > 0 ? (
            <span className="font-thin text-red-500">{`Strike Out Price is ${_.round(
              values.price * 1.18
            )}`}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="col-span-1">
          <FormItem
            label="Discount*"
            invalid={errors.discount && touched.discount}
            errorMessage={errors.discount}
          >
            <Field
              type="text"
              autoComplete="off"
              name="discount"
              value={values.discount || ""}
              component={Input}
              placeholder="Discount"
              min="0"
              max="99"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>

          {values.price > 0 && values.discount > 0 && values.discount < 100 ? (
            <span className="font-thin text-red-500">{`Discounted Price is ${_.round(
              values.price * (1 - values.discount / 100) * 1.18
            )}`}</span>
          ) : (
            <div></div>
          )}
        </div>
        {/* <div className="col-span-2">
          <FormItem
            label="Strike out Price"
            invalid={errors.strike_out_price && touched.strike_out_price}
            errorMessage={errors.strike_out_price}
          >
            <Field
              type="text"
              autoComplete="off"
              name="strike_out_price"
              value={values.strike_out_price || ""}
              component={Input}
              placeholder="Strike out Price"
              min="0"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>

        </div> */}
        <div className="col-span-1">
          <FormItem
            label="Backgound Color*"
            invalid={errors.backgroud_color && touched.backgroud_color}
            errorMessage={errors.backgroud_color}
          >
            <Field
              type="color"
              autoComplete="off"
              name="backgroud_color"
              value={values.backgroud_color || ""}
              component={Input}
              placeholder="Backgound Color"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Shield Color*"
            invalid={errors.shield_color && touched.shield_color}
            errorMessage={errors.shield_color}
          >
            <Field
              type="color"
              autoComplete="off"
              name="shield_color"
              value={values.shield_color || ""}
              component={Input}
              placeholder="Shield Color"
            />
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            label="Recommended*"
            invalid={errors.is_recommended && touched.is_recommended}
            errorMessage={errors.is_recommended}
          >
            <Field name="is_recommended">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={is_recommended}
                  value={values.is_recommended}
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
            label="Voucher*"
            invalid={errors.is_voucher && touched.is_voucher}
            errorMessage={errors.is_voucher}
          >
            <Field name="is_voucher">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={is_voucher}
                  value={values.is_voucher}
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

        <div className="col-span-2">
          <FormItem
            label="Description*"
            labelClass="!justify-start"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
            <Field name="description">
              {({ field, form }) => (
                <Field
                  type="text"
                  autoComplete="off"
                  name="description"
                  textArea
                  value={values.description || ""}
                  placeholder="Write Subscription Description here....."
                  component={Input}
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
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default SubscriptionInformationFields;
