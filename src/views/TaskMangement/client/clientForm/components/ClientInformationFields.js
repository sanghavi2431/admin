import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import AsyncSelect from "react-select/async";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false }
];
const loadCategory = async () => {
  let response = await getClientTypes();
  return response.data.results;
};
const ClientInformationFields = (props) => {
  const { values, touched, errors,type } = props;
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Type*"
            invalid={errors.client_type && touched.client_type}
            errorMessage={errors.client_type}
          >
             <Field name="client_type">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  // options={clientType}
                  loadOptions={loadCategory}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.client_type}
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
        <div className="col-span-1">
          <FormItem
            label="Name*"
            invalid={errors.client_name && touched.client_name}
            errorMessage={errors.client_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="client_name"
              value={values.client_name || ""}
              component={Input}
              placeHolder="Name"
              className="w-full shadow-xl rounded-full border border-gray-300 px-6"
            />
          </FormItem>
        </div>
       {
        type=="edit"? <div className="col-span-1">
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
      </div>:null
       }
       
      </div>
    </AdaptableCard>
  );
};

export default ClientInformationFields;
