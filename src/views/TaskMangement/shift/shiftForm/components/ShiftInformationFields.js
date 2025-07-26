import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, TimeInput } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import TimeInputRange from "@/components/ui/TimeInput/TimeInputRange";
import { useSelector } from "react-redux";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const ShiftInformationFields = (props) => {
  const { values, touched, errors, type } = props;
  const [locations, setLocations] = useState([]);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const loadClients = async () => {
    let data={status:true}
    let response = await getClients(data);
    return response.data.results;
  };
  const loadLocations = async (client_id) => {
    let data = { id: client_id ,status:true};
    let response="";
    try{
       response = await getLocations(data);

    }
    catch(err){

    }
    setLocations(response?.data?.results);
  };

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);
  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-7 ">
        <div className="col-span-1">
          <FormItem
            label="Client Name*"
            invalid={errors.client_name && touched.client_name}
            errorMessage={errors.client_name}
          >
            <Field name="client_name">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  isDisabled={loggedInClient?true:false}
                  // options={clientType}
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
                        }),
                        setClient_id(option.value),
                        form.setFieldValue("location_name", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div>
          <FormItem
            label="Location Name*"
            invalid={errors.location_name && touched.location_name}
            errorMessage={errors.location_name}
          >
            <Field name="location_name">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={locations}
                  isSearchable={true}
                  value={values.location_name}
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
            invalid={errors.shift_name && touched.shift_name}
            errorMessage={errors.shift_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="shift_name"
              value={values.shift_name || ""}
              component={Input}
              placeHolder="Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Start Time*"
            invalid={errors.start_time && touched.start_time}
            errorMessage={errors.start_time}
          >
             <Field name="start_time">
              {({ field, form }) => ( 
                <TimeInput
                  name="start_time"
                  invalid={errors.start_time && touched.start_time}
                  value={values.start_time}
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
            invalid={errors.end_time && touched.end_time}
            errorMessage={errors.end_time}
          >
           <Field name="end_time">
              {({ field, form }) => ( 
                <TimeInput
                  name="end_time"
                  invalid={errors.end_time && touched.end_time}
                  value={values.end_time}
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

export default ShiftInformationFields;
