import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import AsyncSelect from "react-select/async";
import BoothForm from "./booth";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import { useState, useEffect } from "react";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import { getShifts } from "@/services/taskManagement/facilitiesService";
import { useSelector, useDispatch } from "react-redux";
import {
  getLocation,
  get_Blocks,
  get_Shift,
  setblock,
  setclient,
  setlocation,
} from "../store/dataSlice";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

// Add static facility type options
export const facilityTypes = [
  { label: "Home", value: "home" },
  { label: "Office", value: "office" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Other", value: "other" },
];

const FacilityInformationFields = (props) => {
  const dispatch = useDispatch();

  const { values, touched, errors, type } = props;
  const locations = useSelector(
    (state) => state.facilityaddForm.data.locations
  );
  const blocks = useSelector((state) => state.facilityaddForm.data.blocks);
  const shifts = useSelector((state) => state.facilityaddForm.data.shifts);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const [location_id, setLocation_id] = useState(values?.location_name?.value);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);

  const loadClients = async () => {
    let data = { status: true };
    let response = await getClients(data);
    return response.data.results;
  };

  const loadLocations = async (client_id) => {
    let data = { id: client_id, status: true };
    dispatch(getLocation(data));
  };

  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id, status: true };
    dispatch(get_Blocks(data));
  };

  //   const loadShifts = async (client_id,location_id) => {
  //   let data = { client_id: client_id ,location_id:location_id};
  //   dispatch(get_Shift(data))
  // };

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
    // loadShifts(client_id,location_id)
  }, [client_id, location_id, locations, values?.location_name?.value]);
  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-7 ">
        {type == "add" ? (
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
                    isDisabled={loggedInClient ? true : false}
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
                          dispatch(setclient(option)),
                          form.setFieldValue("location_name", ""),
                          form.setFieldValue("block_name", ""))
                        : form.setFieldValue(field.name, {})
                    }
                  />
                )}
              </Field>
            </FormItem>
          </div>
        ) : null}
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
                  isDisabled={type == "edit" ? true : false}
                  value={values.location_name}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setLocation_id(option.value),
                        dispatch(setlocation(option)),
                        form.setFieldValue("block_name", ""))
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
                  isDisabled={type == "edit" ? true : false}
                  value={values.block_name}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        dispatch(setblock(option)))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div>
          <FormItem
            label="Floor Number*"
            invalid={errors.floor_no && touched.floor_no}
            errorMessage={errors.floor_no}
          >
            <Field
              type="text"
              autoComplete="off"
              name="floor_no"
              value={values.floor_no}
              component={Input}
              placeHolder="Floor Number"
            />
          </FormItem>
        </div>
        {/* Facility Type Field */}
        <div className="col-span-1">
          <FormItem
            label="Facility Type*"
            invalid={errors.facility_type && touched.facility_type}
            errorMessage={errors.facility_type}
          >
            <Field name="facility_type">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={facilityTypes}
                  value={values.facility_type}
                  onChange={option =>
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
        {/* Show custom input if 'Other' is selected */}
        {values.facility_type && values.facility_type.value === "other" && (
          <div className="col-span-1">
            <FormItem
              label="Custom Facility Type*"
              invalid={errors.custom_facility_type && touched.custom_facility_type}
              errorMessage={errors.custom_facility_type}
            >
              <Field
                name="custom_facility_type"
                as={Input}
                placeholder="Enter custom facility type"
              />
            </FormItem>
          </div>
        )}
        <div className="col-span-1">
          <FormItem
            label="Facility Name*"
            invalid={errors.facility_name && touched.facility_name}
            errorMessage={errors.facility_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="facility_name"
              value={values.facility_name || ""}
              component={Input}
              placeHolder="Facility Name"
            />
          </FormItem>
        </div>

        <div className="col-span-2">
          <FormItem
            label="Description*"
            labelClass="!justify-start"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
            <Field
              type="text"
              autoComplete="off"
              name="description"
              textArea
              value={values.description || ""}
              placeholder="Write Description here....."
              component={Input}
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
        <div className="col-span-2">
          <BoothForm data={props} />
        </div>
      </div>
    </AdaptableCard>
  );
};

export default FacilityInformationFields;
