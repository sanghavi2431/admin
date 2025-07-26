import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, Tooltip } from "@/components/ui";
import { Field } from "formik";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { setMapConfirmation } from "../../blockAdd/store/dataSlice";
import { FaMapMarkerAlt } from "react-icons/fa";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];

const BlockInformationFields = (props) => {
  const { values, touched, errors, type } = props;
  const dispatch = useDispatch();
  const [locations, setLocations] = useState([]);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const loadClients = async () => {
    let data = { status: true };
    let response = await getClients(data);
    return response.data.results;
  };
  const loadLocations = async (client_id) => {
    let data = { id: client_id, status: true };
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
                  // options={clientType}
                  isDisabled={loggedInClient ? true : false}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values?.client_name}
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
                  value={values?.location_name}
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
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values?.name || ""}
              component={Input}
              placeHolder="Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Min Floors"
            invalid={errors.min_floor && touched.min_floor}
            errorMessage={errors.min_floor}
          >
            <Field
              type="text"
              autoComplete="off"
              name="min_floor"
              value={values?.min_floor}
              component={Input}
              placeHolder="Min Floors"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Max Floors"
            invalid={errors.max_floor && touched.max_floor}
            errorMessage={errors.max_floor}
          >
            <Field
              type="text"
              autoComplete="off"
              name="max_floor"
              value={values?.max_floor || ""}
              component={Input}
              placeHolder="Max Floors"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label={
              <Tooltip title="Tap here to open map">
                <span
                  className="flex cursor-pointer"
                  onClick={() => dispatch(setMapConfirmation(true))}
                >
                  <FaMapMarkerAlt size="20" /> Latitude*
                </span>
              </Tooltip>
            }
            invalid={errors.lat && touched.lat}
            errorMessage={errors.lat}
          >
            <Field
              type="text"
              autoComplete="off"
              name="lat"
              disabled={true}
              value={values?.lat || ""}
              component={Input}
              placeHolder="Latitude"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label={
              <Tooltip title="Tap here to open map">
                <span
                  className="flex cursor-pointer"
                  onClick={() => dispatch(setMapConfirmation(true))}
                >
                  <FaMapMarkerAlt size="20" /> Longitude*
                </span>
              </Tooltip>
            }
            invalid={errors.lng && touched.lng}
            errorMessage={errors.lng}
          >
            <Field
              type="text"
              autoComplete="off"
              name="lng"
              disabled={true}
              value={values?.lng || ""}
              component={Input}
              placeHolder="Longitude"
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
                    value={values?.status}
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

export default BlockInformationFields;
