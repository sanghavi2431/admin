import React, { useEffect, useState } from "react";
import { AdaptableCard } from "components/shared";
import { Input, FormItem, Select, TimeInput } from "components/ui";
import { Field } from "formik";
import { getClientTypes } from "services/taskManagement/clientService";
import { getClients } from "services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { getFacility, getJanitor, getLocation, getTemplate, get_Blocks, get_Facility,getShifts,getCluster } from "../store/dataSlice";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];

const TemplateMapInformationFields = (props) => {
  const dispatch = useDispatch();
  const { values, touched, errors, type } = props;

  const facilityMappingData  = useSelector((state) => state.auth.user.facilityMappingData);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [location_id, setLocation_id] = useState(facilityMappingData?.location?.value);
  const [block_id, setBlock_id] = useState(facilityMappingData?.block?.value);
  const [facility_id, setFacility_id] = useState(facilityMappingData?.facility_name?.value);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const locations=useSelector((state)=>state.tempMapForm.data.locations)
  const blocks=useSelector((state)=>state.tempMapForm.data.blocks)
  const facility=useSelector((state)=>state.tempMapForm.data.facility)
  let shifts = useSelector((state) => state.tempMapForm.data.shifts);
  const janitorList = useSelector(
    (state) => state.tempMapForm.data.janitorList
  );
  const clusterList = useSelector(
    (state) => state.tempMapForm.data.clusterList
  );
  const templateList = useSelector(
    (state) => state.tempMapForm.data.templateList
  );
  useEffect(() => {
    let data={location_id:location_id}
    dispatch(getShifts(data));
  }, [client_id,location_id]);
  
  const loadFacility = async (block_id) => {
    let data = { block_id: block_id };
    dispatch(get_Facility(data))
  };
  const loadClients = async () => {
    let response = await getClients();
    return response.data.results;
  };
  const loadLocations = async (client_id) => {
    let data = { id: client_id };
    dispatch(getLocation(data))
  };

  const loadBlocks = async (client_id,location_id) => {
    let data = { client_id: client_id ,location_id:location_id};
    dispatch(get_Blocks(data))
  };
  useEffect(() => {
    loadBlocks(client_id,location_id);
  }, [location_id]);

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);
 
  useEffect(() => {
    let data={facility_id:facility_id,role_id:1}
    dispatch(getJanitor(data));

  }, [facility_id]);
  useEffect(() => {
    let data={location_id:location_id}
    dispatch(getTemplate(data));

  }, [location_id]);
  useEffect(() => {
    loadFacility(block_id);
  }, [block_id]);
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-2 gap-y-6 ">
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
                        form.setFieldValue("location_name", ""),
                        form.setFieldValue("block_name", ""),
                        form.setFieldValue("facility", "")
                      )
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
                    ? (form.setFieldValue(field.name, {
                      label: option.label,
                      value: option.value,
                    }),
                    setLocation_id(option.value),
                    form.setFieldValue("block_name", ""),
                  form.setFieldValue("facility", "")
                    )
                  : form.setFieldValue(field.name, {})
              }
        />
              )}
            </Field>
          </FormItem>
        </div>
        <div>
          <FormItem
            label="Building Name*"
            invalid={errors.block_name && touched.block_name}
            errorMessage={errors.block_name}
          >
            <Field name="block_name">
              {({ field, form }) => (
                <Select
                field={field}
                form={form}
                required
                options={blocks}
                isSearchable={true}
                value={values.block_name}
                  onChange={(option) =>
                    option
                    ? (form.setFieldValue(field.name, {
                      label: option.label,
                      value: option.value,
                    }),
                    setBlock_id(option.value),
                  form.setFieldValue("facility", "")                            )
              : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div 
                    label="Facility Name*"
                    invalid={errors.facility && touched.facility}
                    errorMessage={errors.facility}
        
         >
              <FormItem label="Facility"
               invalid={errors.facility && touched.facility}
               errorMessage={errors.facility}>
                <Field name="facility">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={facility}
                      value={values.facility}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setFacility_id(option.value)
                            )
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            {/* <div className="col-span-1">
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
                  isDisabled={!values?.facility}
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
        </div> */}
            {/* <div className="col-span-1">
          <FormItem
            label="Shift*"
            invalid={errors.shift_ids && touched.shift_ids}
            errorMessage={errors.shift_ids}
          >
            <Field name="shift_ids">
              {({ field, form }) => (
                <Select
                  isMulti
                  field={field}
                  form={form}
                  required
                  isDisabled={!values.location_name }
                  options={shifts}
                  value={values.shift_ids}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div> */}
         <div className="col-span-1">
          <FormItem
            label="Templates*"
            invalid={errors.templates && touched.templates}
            errorMessage={errors.templates}
          >
            <Field name="templates">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={templateList}
                  isSearchable={true}
                  isDisabled={!values?.location_name}
                  value={values.templates}
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
            label="Slot Start Time*"
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
            label="Slot End Time*"
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
        
  
        <div className="col-span-1">
          <FormItem
            label="Janitor*"
            invalid={errors.janitor && touched.janitor}
            errorMessage={errors.janitor}
          >
            <Field name="janitor">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={janitorList}
                  isSearchable={true}
                  isDisabled={!values?.facility}
                  value={values.janitor}
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

export default TemplateMapInformationFields;
