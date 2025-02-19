import React from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import AsyncSelect from "react-select/async";


const PlanFields = (props) => {
  const { values, touched, errors,type } = props;
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
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
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Amount*"
            invalid={errors.amount && touched.amount}
            errorMessage={errors.amount}
          >
            <Field
              type="text"
              autoComplete="off"
              name="amount"
              value={values.amount || ""}
              component={Input}
              placeHolder="Amount"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Number of logins*"
            invalid={errors.no_of_logins && touched.no_of_logins}
            errorMessage={errors.no_of_logins}
          >
            <Field
              type="text"
              autoComplete="off"
              name="no_of_logins"
              value={values.no_of_logins || ""}
              component={Input}
              placeHolder="Number of logins"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Number of facilities*"
            invalid={errors.no_of_facilities && touched.no_of_facilities}
            errorMessage={errors.no_of_facilities}
          >
            <Field
              type="text"
              autoComplete="off"
              name="no_of_facilities"
              value={values.no_of_facilities || ""}
              component={Input}
              placeHolder="Number of facilities"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Number of locations*"
            invalid={errors.no_of_locations && touched.no_of_locations}
            errorMessage={errors.no_of_locations}
          >
            <Field
              type="text"
              autoComplete="off"
              name="no_of_locations"
              value={values.no_of_locations || ""}
              component={Input}
              placeHolder="Number of locations"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Description*"
            labelClass="!justify-start"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
            <Field name="description">
              {({ field, form }) => (
              	<RichTextEditor
                value={field.value} 
                onChange={val => {
                  let empty="<p><br></p>"
                  form.setFieldValue(field.name,val==empty?"": val)
                }
                
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

export default PlanFields;
