import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, TimeInput } from "@/components/ui";
import { Field } from "formik";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { getCluster } from "../store/dataSlice";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];
export const gender = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
  { label: "Other", value: 2 },
];

const JanitorInformationFields = (props) => {
  const { values, touched, errors, type } = props;
  const clusterList = useSelector(
    (state) => state.janitorForm.data.clusterList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let data={status:true}
    dispatch(getCluster(data));
  }, []);
  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="First Name*"
            invalid={errors.first_name && touched.first_name}
            errorMessage={errors.first_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="first_name"
              value={values.first_name || ""}
              component={Input}
              placeHolder="First Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Last Name*"
            invalid={errors.last_name && touched.last_name}
            errorMessage={errors.last_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="last_name"
              value={values.last_name || ""}
              component={Input}
              placeHolder="Last Name"
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
              placeHolder="Mobile Number"
            />
          </FormItem>
        </div>
        {/* <div className="col-span-1">
          <FormItem
            label="Email Id"
            invalid={errors.email && touched.email}
            errorMessage={errors.email}
          >
            <Field
              type="text"
              autoComplete="off"
              name="email"
              value={values.email || ""}
              component={Input}
              placeHolder="Email Id"
            />
          </FormItem>
        </div> */}
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
        {/* <div className="col-span-1">
          <FormItem
            label="Address*"
            invalid={errors.address && touched.address}
            errorMessage={errors.address}
          >
            <Field
              type="text"
              autoComplete="off"
              name="address"
              value={values.address || ""}
              component={Input}
              placeHolder="Address"
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
            />
          </FormItem>
        </div> */}
        <div className="col-span-1">
          <FormItem
            label="Cluster*"
            invalid={errors.cluster && touched.cluster}
            errorMessage={errors.cluster}
          >
            <Field name="cluster">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={clusterList}
                  isMulti
                  isSearchable={true}
                  value={values.cluster}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Start Time*"
            invalid={errors?.start_time && touched?.start_time}
            errorMessage={errors?.start_time}
          >
            <Field name="start_time">
              {({ field, form }) => (
                <TimeInput
                  name="start_time"
                  invalid={errors?.start_time && touched?.start_time}
                  value={values?.start_time}
                  onChange={(date) => {
                    form.setFieldValue("start_time", date);
                  }}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="End Time*"
            invalid={errors?.end_time && touched?.end_time}
            errorMessage={errors?.end_time}
          >
            <Field name="end_time">
              {({ field, form }) => (
                <TimeInput
                  name="end_time"
                  invalid={errors?.end_time && touched?.end_time}
                  value={values?.end_time}
                  onChange={(date) => {
                    form.setFieldValue("end_time", date);
                  }}
                />
              )}
            </Field>
          </FormItem>
        </div>

        {type == "edit" ? (
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
        ) : null}
      </div>
    </AdaptableCard>
  );
};

export default JanitorInformationFields;
