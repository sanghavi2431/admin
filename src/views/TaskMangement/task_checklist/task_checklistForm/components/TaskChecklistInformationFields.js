import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import AsyncSelect from "react-select/async";
import { getClients } from "@/services/taskManagement/blockService";
import { useSelector } from "react-redux";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false }
];
const loadClients = async () => {
  let response = await getClients();
  return response.data.results;
};
const TaskChecklistInformationFields = (props) => {
  const { values, touched, errors,type } = props;
    const loggedInClient = useSelector((state) => state.auth.user.clientId);

  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Client Name"
            invalid={errors.client_name && touched.client_name}
            errorMessage={errors.client_name}
          >
            <Field name="client_name">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  // options={clientType}
                  isDisabled={loggedInClient?true:false}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.client_name}
                  componentAs={AsyncSelect}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                          label: option.label,
                          value: option.value,
                        })
                        // setClient_id(option.value)
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
            label="Task Name*"
            invalid={errors.task_name && touched.task_name}
            errorMessage={errors.task_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="task_name"
              value={values.task_name || ""}
              component={Input}
              placeHolder="Name"
            />
          </FormItem>
        </div>

       {
        type=="edit"? <div className="col-span-2">
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

export default TaskChecklistInformationFields;
