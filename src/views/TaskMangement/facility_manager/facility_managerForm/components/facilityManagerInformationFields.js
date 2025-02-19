import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { getClients } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const FacilityManagerInformationFields = (props) => {
  const { values, touched, errors, type } = props;
  const loggedInClient = useSelector((state) => state.auth.user.clientId);

  const dispatch = useDispatch();

  const loadClients = async () => {
    let data={status:true}
    let response = await getClients(data);
    return response.data.results;
  };
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Client Name*"
            invalid={errors.client && touched.client}
            errorMessage={errors.client}
          >
            <Field name="client">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  isDisabled={loggedInClient?true:false}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values?.client}
                  componentAs={AsyncSelect}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        })
                        )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
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
            label="Email Id*"
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
        </div>
        <div className="col-span-1">
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
            label="Password*"
            invalid={errors.password && touched.password}
            errorMessage={errors.password}
          >
            <Field
              type="text"
              autoComplete="off"
              name="password"
              value={values.password || ""}
              component={Input}
              placeHolder="Password"
            />
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

export default FacilityManagerInformationFields;
