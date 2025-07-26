import React from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import OpeningHourForm from "./openingHours";

export const status = [
  { label: "YES", value: 1 },
  { label: "NO", value: 0 },
];
export const Status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
export const washroomStyle = [
  { label: "Western", value: 1 },
  { label: "Indian", value: 0 },
];

const WoloosInformationFields = (props) => {
  const { values, touched, errors } = props;
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
        <div className="col-span-1">
          <FormItem
            label="Owner Name*"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              value={values.name || ""}
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Woloo Host Name*"
            invalid={errors.title && touched.title}
            errorMessage={errors.title}
          >
            <Field
              type="text"
              autoComplete="off"
              name="title"
              value={values.title || ""}
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Description"
            labelClass="!justify-start"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
            <Field
              type="text"
              autoComplete="off"
              name="description"
              textArea
              value={values.description}
              placeholder="Write Woloos Description here....."
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Code*"
            invalid={errors.code && touched.code}
            errorMessage={errors.code}
          >
            <Field
              type="text"
              autoComplete="off"
              name="code"
              value={values.code || ""}
              component={Input}
              disabled
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Address*"
            labelClass="!justify-start"
            invalid={errors.address && touched.address}
            errorMessage={errors.address}
          >
            <Field name="address">
              {({ field, form }) => (
                <Field
                  type="text"
                  autoComplete="off"
                  name="address"
                  textArea
                  value={values.address || ""}
                  placeholder="Write Woloo's Address here....."
                  component={Input}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Email*"
            invalid={errors.email && touched.email}
            errorMessage={errors.email}
          >
            <Field
              type="text"
              autoComplete="off"
              name="email"
              value={values.email || ""}
              component={Input}
              placeholder="Email"

            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Mobile"
            invalid={errors.mobile && touched.mobile}
            errorMessage={errors.mobile}
          >
            <Field
              type="text"
              autoComplete="off"
              name="mobile"
              value={values.mobile || ""}
              component={Input}
              placeholder="Mobile"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
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
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
              maxlength="6"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Latitude*"
            invalid={errors.lat && touched.lat}
            errorMessage={errors.lat}
          >
            <Field
              type="text"
              autoComplete="off"
              name="lat"
              value={values.lat || ""}
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Longitude*"
            invalid={errors.lng && touched.lng}
            errorMessage={errors.lng}
          >
            <Field
              type="text"
              autoComplete="off"
              name="lng"
              value={values.lng || ""}
              component={Input}
            />
          </FormItem>
        </div>
        {/* <div className="col-span-1">
          <FormItem
            label="Opening Hours"
            invalid={errors.opening_hours && touched.opening_hours}
            errorMessage={errors.opening_hours}
          >
            <Field name="opening_hours"
            >
              {({ field, form }) => (
                <TimeInputRange
                amPmPlaceholder
                  field={field}
                  form={form}
                  placeholder="Pick a Time"
                  value={values.opening_hours}
                  onChange={(date) => {
                    form.setFieldValue(field.name, date)
                  }}
                />
              )}
            </Field>
          </FormItem>
        </div> */}
        <div className="col-span-2">
          <OpeningHourForm data={props} />
        </div>
        <div className="col-span-1">
          <FormItem
            label="Is Restaurant*"
            invalid={errors.restaurant && touched.restaurant}
            errorMessage={errors.restaurant}
          >
            <Field name="restaurant">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.restaurant}
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
            label="Is Franchise*"
            invalid={errors.is_franchise && touched.is_franchise}
            errorMessage={errors.is_franchise}
          >
            <Field name="is_franchise">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.is_franchise}
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
            label="Is Segregated*"
            invalid={errors.segregated && touched.segregated}
            errorMessage={errors.segregated}
          >
            <Field name="segregated">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.segregated}
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
            label="Is Covid Free*"
            invalid={errors.is_covid_free && touched.is_covid_free}
            errorMessage={errors.is_covid_free}
          >
            <Field name="is_covid_free">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.is_covid_free}
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
            label="Is Safe Space*"
            invalid={errors.is_safe_space && touched.is_safe_space}
            errorMessage={errors.is_safe_space}
          >
            <Field name="is_safe_space">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_safe_space}
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
            label="Is Clean And Hygiene*"
            invalid={
              errors.is_clean_and_hygiene && touched.is_clean_and_hygiene
            }
            errorMessage={errors.is_clean_and_hygiene}
          >
            <Field name="is_clean_and_hygiene">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_clean_and_hygiene}
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
            label="Is Sanitary Pads Available*"
            invalid={
              errors.is_sanitary_pads_available &&
              touched.is_sanitary_pads_available
            }
            errorMessage={errors.is_sanitary_pads_available}
          >
            <Field name="is_sanitary_pads_available">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_sanitary_pads_available}
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
            label="Is Makeup Room Available*"
            invalid={
              errors.is_makeup_room_available &&
              touched.is_makeup_room_available
            }
            errorMessage={errors.is_makeup_room_available}
          >
            <Field name="is_makeup_room_available">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_makeup_room_available}
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
            label="Is Coffee Available*"
            invalid={errors.is_coffee_available && touched.is_coffee_available}
            errorMessage={errors.is_coffee_available}
          >
            <Field name="is_coffee_available">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_coffee_available}
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
            label="Is Sanitizer Available*"
            invalid={
              errors.is_sanitizer_available && touched.is_sanitizer_available
            }
            errorMessage={errors.is_sanitizer_available}
          >
            <Field name="is_sanitizer_available">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_sanitizer_available}
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
            label="Is Feeding Room*"
            invalid={errors.is_feeding_room && touched.is_feeding_room}
            errorMessage={errors.is_feeding_room}
          >
            <Field name="is_feeding_room">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_feeding_room}
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
            label="Is Wheelchair Accessible*"
            invalid={
              errors.is_wheelchair_accessible &&
              touched.is_wheelchair_accessible
            }
            errorMessage={errors.is_wheelchair_accessible}
          >
            <Field name="is_wheelchair_accessible">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_wheelchair_accessible}
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
            label="Is Washroom*"
            invalid={errors.is_washroom && touched.is_washroom}
            errorMessage={errors.is_washroom}
          >
            <Field name="is_washroom">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={washroomStyle}
                  value={values.is_washroom}
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
            label="Is Premium*"
            invalid={errors.is_premium && touched.is_premium}
            errorMessage={errors.is_premium}
          >
            <Field name="is_premium">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={status}
                  value={values.is_premium}
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
            label="Recommended By User ID"
            invalid={errors.recommended_by && touched.recommended_by}
            errorMessage={errors.recommended_by}
          >
            <Field
              type="number"
              autoComplete="off"
              name="recommended_by"
              value={values.recommended_by || ""}
              component={Input}
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Recommended Mobile"
            invalid={errors.recommended_mobile && touched.recommended_mobile}
            errorMessage={errors.recommended_mobile}
          >
            <Field
              type="text"
              autoComplete="off"
              name="recommended_mobile"
              value={values.recommended_mobile || ""}
              component={Input}
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
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
                  options={Status}
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
        <div className="col-span-1">
          <FormItem
            label="Rating"
            invalid={errors.rating && touched.rating}
            errorMessage={errors.rating}
          >
            <Field
              type="text"
              autoComplete="off"
              name="rating"
              value={values.rating || ""}
              component={Input}
              placeholder="Rating"
              onKeyPress={(e) => {
                if (new RegExp(/[0-9]/).test(e.key)) {
                } else e.preventDefault();
              }}
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default WoloosInformationFields;
