import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, Tooltip } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import AsyncSelect from "react-select/async";
import { getClients } from "@/services/taskManagement/blockService";
import { useDispatch, useSelector } from "react-redux";
import { setMapConfirmation } from "../../locationAdd/store/dataSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import MapConfirmation from "../../locationAdd/components/MapConfirmation";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];
const loadClients = async () => {
  let data = { status: true };
  let response = await getClients(data);
  return response.data.results;
};

const LocationInformationFields = (props) => {
  const { values, touched, errors, type } = props;
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const currentPosition = useSelector(
    (state) => state.locationAdd?.data?.latlng
  );

  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-7 ">
        <div className="col-span-1">
          <FormItem
            label="Client *"
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
                  // options={clientType}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.client_name}
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
            invalid={errors.location_name && touched.location_name}
            errorMessage={errors.location_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="location_name"
              value={values.location_name || ""}
              component={Input}
              placeHolder="Name"
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label={
              <Tooltip title="Tap here to open map">
                <span
                  className="flex cursor-pointer"
                  onClick={() => dispatch(setMapConfirmation(true))}
                >
                  <FaMapMarkerAlt size="20" /> Address*
                </span>
              </Tooltip>
            }
            invalid={errors.address && touched.address}
            errorMessage={errors.address}
          >
            <Field
              type="text"
              autoComplete="off"
              name="address"
              textArea
              value={values.address || ""}
              component={Input}
              disabled={true}
              placeHolder="Address"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="City*"
            invalid={errors.city && touched.city}
            errorMessage={errors.city}
          >
            <Field
              type="text"
              autoComplete="off"
              name="city"
              value={values.city || ""}
              component={Input}
              placeHolder="City"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Pincode*"
            invalid={errors.pincode && touched.pincode}
            errorMessage={errors.pincode}
          >
            <Field
              type="text"
              autoComplete="off"
              name="pincode"
              value={values.pincode || ""}
              component={Input}
              placeHolder="Pincode"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
              maxlength="6"
            />
          </FormItem>
        </div>

        <div className="col-span-1 ">
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
              value={values.lat || ""}
              component={Input}
              disabled={true}
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
              value={values.lng || ""}
              component={Input}
              disabled={true}
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

export default LocationInformationFields;
