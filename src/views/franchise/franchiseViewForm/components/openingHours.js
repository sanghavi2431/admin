import React from "react";
import { Field, FieldArray } from "formik";
import { FormItem } from "@/components/ui";
import TimeInputRange from "@/components/ui/TimeInput/TimeInputRange";
const OpeningHourForm = (props) => {
  const { values, touched, errors } = props.data;
  let opening_hours = values.opening_hours;

  return (
    <FieldArray name="opening_hours">
      {({ form, remove, push }) => (
        <div>
          {opening_hours && opening_hours.length > 0
            ? opening_hours.map((_, index) => {
                return (
                  <div key={index}>
                    <FormItem label="Opening Hours">
                      <Field
                        placeholder="Opening Hours"
                        name={`opening_hours[${index}].time`}
                      >
                        {({ field, form }) => (
                          <TimeInputRange
                            amPmPlaceholder
                            field={field}
                            form={form}
                            value={values.opening_hours[index].time}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                            disabled
                          />
                        )}
                      </Field>
                    </FormItem>
                  </div>
                );
              })
            : null}
          <div></div>
        </div>
      )}
    </FieldArray>
  );
};

export default OpeningHourForm;
