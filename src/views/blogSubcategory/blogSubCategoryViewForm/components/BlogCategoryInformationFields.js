import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import AsyncSelect from "react-select/async";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const BlogCategoryInformationFields = (props) => {
  const { values, touched, errors } = props;
  const loadClients = async () => {
    let data={status:true}
    // let response = await getClients(data);
    // return response.data.results;
  };
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Category *"
            invalid={errors.category && touched.category}
            errorMessage={errors.category}
          >
             <Field name="category">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  // isDisabled={loggedInClient?true:false}
                  // options={clientType}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.category}
                  componentAs={AsyncSelect}
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
            label="Sub-Category*"
            invalid={errors.subCategory && touched.subCategory}
            errorMessage={errors.subCategory}
          >
            <Field
              type="text"
              autoComplete="off"
              name="subCategory"
              value={values.subCategory || ""}
              component={Input}
              placeholder="Sub-Category"
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
       
      </div>
    </AdaptableCard>
  );
};

export default BlogCategoryInformationFields;
