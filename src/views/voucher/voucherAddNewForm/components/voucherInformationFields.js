import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, Radio } from "@/components/ui";
import { Field } from "formik";
import { DatePicker } from "@/components/ui";
import AsyncSelect from "react-select/async";
import {
  getCorporate,
  getSubscription,
  getSubscriptionbyId,
} from "@/services/voucherService";
import { settype_of_voucher,setLife_time_free } from "../store/dataSlice";
import { useDispatch } from "react-redux";

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
export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const lifetime_free = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
export const is_email = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];
export const payment_mode = [
  { label: "online", value: 1 },
  { label: "offline", value: 0 },
];
export const type_of_organization = [
  { label: "Private", value: 0 },
  { label: "Government", value: 1 },
];
export const type_of_voucher = [
  { label: "free", value: 0 },
  { label: "paid", value: 1 },
];
const VoucherInformationFields = (props) => {
  const { values, touched, errors } = props;
  const [subscriptionId, setsubscriptionId] = useState("");
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const [paymentFlag, setPaymentFlag] = useState(false);
  let dispatch=useDispatch()
  useEffect(() => {
    if (values.lifetime_free.label === "Yes") {
      setFlag(true);
      values.type_of_voucher = { label: "free", value: 0 };
      values.discount_percentage = 0;
      values.payment_mode = "";
    } else {
      setFlag(false);
      values.type_of_voucher = "";
    }
  }, [values.lifetime_free]);
  useEffect(() => {
    if (values.type_of_voucher.label === "free") {
      setPaymentFlag(true);
      values.discount_percentage = 0;
      values.payment_mode = "";
    } else {
      setPaymentFlag(false);
    }
  }, [values.type_of_voucher]);
  const loadCategory = async () => {
    let response = await getCorporate();
    return response.data.results.data;
  };
  const loadSubscription = async () => {
    let response = await getSubscription();
    return response.data.results.data;
  };
  const getSubscriptionValue = async () => {
    try{
      let response = await getSubscriptionbyId({ id: subscriptionId });
      let discounted_price =
      response.data.results.price *
      (1 - response.data.results.discount / 100) *
      1.18;
    setValue(discounted_price);
    }
    catch(err){

    }
 
  };
  useEffect(() => {
    getSubscriptionValue();
  }, [subscriptionId]);
  const onStateChange = (form, field, optn) => {
    form.setFieldValue(field.name, { label: optn.label, value: optn.value });
  };
  const onSubscriptionChange = (form, field, optn) => {
    form.setFieldValue(field.name, { label: optn.label, value: optn.value });
    setsubscriptionId(optn.value);
  };

  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 ">
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
                  loadOptions={loadCategory}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.corporate}
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
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Life Time Free*"
            invalid={errors.lifetime_free?.label && touched.lifetime_free}
            errorMessage={errors.lifetime_free?.label}
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
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        }),
                        dispatch(setLife_time_free({
                          label: option.label,
                          value: option.value,
                        })))
                      : form.setFieldValue(field.name, {})
                  }
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
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        }),
                        dispatch(settype_of_voucher({
                          label: option.label,
                          value: option.value,
                        })))
                      : form.setFieldValue(field.name, {})
                  }
                  isDisabled={flag}
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
              placeholder="No. Of Users"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
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
                  loadOptions={loadSubscription}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.subscription}
                  componentAs={AsyncSelect}
                  onChange={(option) =>
                    onSubscriptionChange(form, field, option)
                  }
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
              disabled={paymentFlag || flag}
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
          {values.value > 0 &&
          values.discount_percentage > 0 &&
          values.type_of_voucher.label === "paid" &&
          values.number_of_uses > 0 ? (
            <span className="font-thin text-red-500">{`Discounted Price is ${_.round(
              values.number_of_uses *
                (value * (1 - values.discount_percentage / 100))
            )}`}</span>
          ) : (
            <div></div>
          )}
          {values.value > 0 &&
          values.discount_percentage === 0 &&
          values.type_of_voucher.label === "paid" &&
          values.number_of_uses > 0 ? (
            <span className="font-thin text-red-500">{`Price is ${_.round(
              values.number_of_uses *
                (value * (1 - values.discount_percentage / 100))
            )}`}</span>
          ) : (
            <div></div>
          )}
        </div>

        <div className="col-span-1">
          <FormItem
            label="Value"
            invalid={errors.value && touched.value}
            errorMessage={errors.value}
          >
            <Field
              type="number"
              autoComplete="off"
              name="value"
              value={
                values.type_of_voucher.label === "paid" &&
                values.number_of_uses > 0 ? (
                  (values.value = _.round(
                    values.number_of_uses *
                      (value * (1 - values.discount_percentage / 100))
                  ))
                ) : (
                  <div></div>
                )
              }
              component={Input}
              placeholder="Value"
              disabled
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
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
                  isDisabled={paymentFlag || flag}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Send Email to Corporate*"
            invalid={errors.is_email && touched.is_email}
            errorMessage={errors.is_email}
          >
            <Field name="is_email" className="flex justify-around items-center">
              {({ field, form }) => (
                <>
                  <Radio.Group
                    onChange={(options) =>
                      form.setFieldValue(field.name, options)
                    }
                    disabled={values.file.length}
                    className="flex justify-start items-center"
                    value={values.is_email}
                  >
                    <Radio name="is_email" value={1}>
                      Yes
                    </Radio>
                    <Radio className="ml-16" name="is_email" value={0}>
                      No
                    </Radio>
                  </Radio.Group>
                </>
              )}
            </Field>
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default VoucherInformationFields;
