import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, Card } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import { getClients } from "@/services/taskManagement/blockService";
import {
  getBooths,
  getLocation,
  getTemplate,
  get_Blocks,
  get_facility,
  setFacility_id,
} from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import '../iotDevice.css'
export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

export const device_type = [
  { label: "PPM-Device", value: 1 },
  { label: "Odour Monitor", value: 0 },
];

const IOTDeviceInformationFields = (props) => {
  const dispatch = useDispatch();
  const { values, touched, errors, type } = props;
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [client_id, setClient_id] = useState(loggedInClient?.value);
  const [location_id, setLocation_id] = useState();
  const [block_id, setBlock_id] = useState();
  const [facility_id, setFacility_id] = useState();
  const locations = useSelector((state) => state.IotDeviceForm.data.locations);
  const blocks = useSelector((state) => state.IotDeviceForm.data.blocks);
  const facility = useSelector((state) => state.IotDeviceForm.data.facility);
  const booths = useSelector((state) => state.IotDeviceForm.data.booths);
  const loading = useSelector((state) => state.IotDeviceForm.data.loading);
  const templateList = useSelector(
    (state) => state.IotDeviceForm.data.templateList
  );

  const loadClients = async () => {
    let data = { status: true }
    let response = await getClients(data);
    return response.data.results;
  };

  const loadLocations = async (client_id) => {
    let data = { id: client_id, status: true };
    dispatch(getLocation(data));
  };
  useEffect(() => {
    let data = { location_id: location_id }
    dispatch(getTemplate(data));

  }, [location_id]);
  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id, status: true };
    dispatch(get_Blocks(data));
  };

  const loadFacility = async (block_id) => {
    let data = { block_id: block_id, status: true };
    dispatch(get_facility(data));
  };

  const loadBooth = async (facility_id) => {
    let data = { facility_id: facility_id, status: true };
    dispatch(getBooths(data));
  };

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [client_id, location_id]);

  useEffect(() => {
    loadFacility(block_id);
  }, [block_id]);

  useEffect(() => {
    loadBooth(facility_id);
  }, [facility_id]);

  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 ">
        
        <div className=" col-span-2">
          <FormItem label="Clients*"
            invalid={errors.client && touched.client}
            errorMessage={errors.client}>
            <Field name="client">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  isDisabled={type=="add" ? (loggedInClient ? true : false) :true}
                  // options={clientType}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.client}
                  componentAs={AsyncSelect}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setClient_id(option.value),
                        form.setFieldValue("location", ""),
                        form.setFieldValue("block", ""),
                        form.setFieldValue("facility", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2 ">
          <FormItem label="Location*"
            invalid={errors.location && touched.location}
            errorMessage={errors.location}>
            <Field name="location">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={locations}
                  isDisabled={type=="add" ? false : true}
                  value={values.location}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setLocation_id(option.value),
                        form.setFieldValue("block", ""),
                        form.setFieldValue("facility", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2 ">
          <FormItem label="Building*"
            invalid={errors.block && touched.block}
            errorMessage={errors.block}>
            <Field name="block">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  isDisabled={type=="add" ? false : true}
                  options={blocks}
                  value={values.block}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setBlock_id(option.value),
                        form.setFieldValue("facility", ""),
                        form.setFieldValue("booth", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2 ">
          <FormItem
            label="Facility*"
            invalid={errors.facility && touched.facility}
            errorMessage={errors.facility}
          >
            <Field name="facility">
              {({ field, form }) => (
                <Select
                  field={field}
                  isDisabled={type=="add" ? false : true}
                  form={form}
                  required
                  options={facility}
                  isSearchable={true}
                  value={values.facility}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        form.setFieldValue("booth", ""),
                        setFacility_id(option.value))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2 ">
          <FormItem
            label="Booth Name*"
            invalid={errors.booth && touched.booth}
            errorMessage={errors.booth}
          >
            <Field name="booth">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  isDisabled={type=="add" ? false : true}
                  required
                  options={booths}
                  isSearchable={true}
                  value={values.booth}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        form.setFieldValue("deviceType", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-2">
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
                  isDisabled={type=="add" ?  !values?.location : true}
                  isSearchable={true}
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
        <div className="col-span-2 ">
          <FormItem
            label="Device Type*"
            invalid={errors.deviceType && touched.deviceType}
            errorMessage={errors.deviceType}
          >
            <Field name="deviceType">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  isDisabled={type=="add" ? false : true}
                  required
                  options={device_type}
                  isSearchable={true}
                  value={values.deviceType}
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

        <div className="col-span-2">
          <FormItem
            label="Device ID*"
            invalid={errors.device_id && touched.device_id}
            errorMessage={errors.device_id}
          >
            <Field
              type="text"
              autoComplete="off"
              name="device_id"
              value={values.device_id || ""}
              component={Input}
              placeHolder="Device ID"
              disabled={type=="add" ? false : true}
            />
          </FormItem>
        </div>

        <div className="col-span-2">
          <FormItem
            label="Trigger Value*"
            invalid={errors.trigger_value && touched.trigger_value}
            errorMessage={errors.trigger_value}
          >
            <Field
              type="text"
              autoComplete="off"
              name="trigger_value"
              value={values.trigger_value || ""}
              component={Input}
              placeHolder="Trigger Value"
              
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <Card className=" [&>div]:flex [&>div]:gap-2 [&>div]:bg-green-500/50 [&>div]:rounded-lg [&>div]:text-black ">
            <div className="min-w-[50%]">

              <FormItem
                label="Healthy Min value"
                invalid={errors.healthy_min && touched.healthy_min}
                errorMessage={errors.healthy_min}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="healthy_min"
                  value={values.healthy_min || ""}
                  component={Input}
                  placeHolder="Healthy Min value"
                  onKeyPress={(e) => {
                    if (new RegExp(/[0-9.]/).test(e.key)) {
                    } else e.preventDefault();
                }}
                />
              </FormItem>
            </div>
            <div className="min-w-[50%]">

              <FormItem
                label="Healthy Max value"
                invalid={errors.healthy_max && touched.healthy_max}
                errorMessage={errors.healthy_max}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="healthy_max"
                  value={values.healthy_max || ""}
                  component={Input}
                  placeHolder="Healthy Max value"
                />
              </FormItem>
            </div>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className=" [&>div]:flex [&>div]:gap-2 [&>div]:bg-yellow-500/50 [&>div]:rounded-lg [&>div]:text-black ">
            <div className="min-w-[50%]">

              <FormItem
                label="Moderate Min value"
                invalid={errors.moderate_min && touched.moderate_min}
                errorMessage={errors.moderate_min}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="moderate_min"
                  value={values.moderate_min || ""}
                  component={Input}
                  placeHolder="Moderate Min value"
                />
              </FormItem>
            </div>
            <div className="min-w-[50%]">

              <FormItem
                label="Moderate Max value"
                invalid={errors.moderate_max && touched.moderate_max}
                errorMessage={errors.moderate_max}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="moderate_max"
                  value={values.moderate_max || ""}
                  component={Input}
                  placeHolder="Moderate Max value"
                />
              </FormItem>
            </div>
          </Card>
        </div>

        <div className="col-span-2">
          <Card className=" [&>div]:flex [&>div]:gap-2 [&>div]:bg-red-500/50 [&>div]:rounded-lg [&>div]:text-black ">
            <div className="min-w-[50%]">

              <FormItem
                label="Unhealthy Min value"
                invalid={errors.unhealthy_min && touched.unhealthy_min}
                errorMessage={errors.unhealthy_min}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="unhealthy_min"
                  value={values.unhealthy_min || ""}
                  component={Input}
                  placeHolder="Unhealthy Min value"
                />
              </FormItem>
            </div>
            <div className="min-w-[50%]">

              <FormItem
              
                label="Unhealthy Max value"
                invalid={errors.unhealthy_max && touched.unhealthy_max}
                errorMessage={errors.unhealthy_max}
              >
                <Field
                  type="number"
                  autoComplete="off"
                  name="unhealthy_max"
                  value={values.unhealthy_max || ""}
                  component={Input}
                  placeHolder="Unhealthy Max value"
                />
              </FormItem>
            </div>
          </Card>
        </div>
        {type == "edit" ? (
          <div className="col-span-2">
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

export default IOTDeviceInformationFields;
