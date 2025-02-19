import React, { useState } from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select, Upload } from "@/components/ui";
import { Field } from "formik";
import AsyncSelect from "react-select/async";
import { Checkbox } from "@/components/ui";
export const looDiscoveryVisibilityoption = [
  { label: "YES", value: true },
  { label: "NO", value: false }
];
export const Module = [
  { label: "Task Management", value: 1 },
  { label: "Loo Discovery", value: 0 }
];
export const showModule = [
  { label: "YES", value: true },
  { label: "NO", value: false }
];

const RoleInformationFields = (props) => {
  const { values, touched, errors } = props;
  const [isDisable,setselectedModuleDisabled]=useState(values?.showOnChangeModule?values?.showOnChangeModule?.value:false)

  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8 pb-2">
        <div className="col-span-1">
          <FormItem
            label="Role Name"
            asterisk
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values.name || ""}
              placeholder="Enter Role Name"
              component={Input}
            />
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            label="Role Display Name"
			      asterisk
            invalid={errors.display_name && touched.display_name}
            errorMessage={errors.display_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="display_name"
              value={values.display_name || ""}
              placeholder="Display Name"
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Default Page Name"
			      asterisk
            invalid={errors.defaultPageMapping && touched.defaultPageMapping}
            errorMessage={errors.defaultPageMapping}
          >
            <Field
              type="text"
              autoComplete="off"
              name="defaultPageMapping"
              value={values.defaultPageMapping || ""}
              placeholder="Default Page Name"
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
        <FormItem
          label="Visibility of Loo Discovery"
          asterisk
          invalid={errors.isLoodiscovery && touched.isLoodiscovery}
          errorMessage={errors.isLoodiscovery}
        >
          <Field name="isLoodiscovery">
            {({ field, form }) => (
              <Select
                field={field}
                form={form}
                required
                options={looDiscoveryVisibilityoption}
                value={values.isLoodiscovery}
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
          label="Visibility of Module Option"
          asterisk
          invalid={errors.showOnChangeModule && touched.showOnChangeModule}
          errorMessage={errors.showOnChangeModule}
        >
          <Field name="showOnChangeModule">
            {({ field, form }) => (
              <Select
                field={field}
                form={form}
                required
                options={showModule}
                value={values.showOnChangeModule}
                onChange={(option) =>
                  option
                    ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                      setselectedModuleDisabled(option.value),
                      form.setFieldValue("selectedModule", ""))
                    : form.setFieldValue(field.name, {})
                }
              />
            )}
          </Field>
        </FormItem>
      </div>
      <div className="col-span-1">
        <FormItem
          label="Initial Selected Module"
          asterisk
          invalid={errors.selectedModule && touched.selectedModule}
          errorMessage={errors.selectedModule}
        >
          <Field name="selectedModule">
            {({ field, form }) => (
              <Select
                field={field}
                form={form}
                required
                isDisabled={!isDisable}
                options={Module}
                value={values.selectedModule}
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

export default RoleInformationFields;
