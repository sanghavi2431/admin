import React from "react";
import { Field, FieldArray, getIn } from "formik";
import { Button, FormItem } from "@/components/ui";
import TimeInputRange from "@/components/ui/TimeInput/TimeInputRange";

const OpeningHourForm = (props) => {
  const { values } = props.data;
  let opening_hours = values.opening_hours;

  const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name);
    const touch = getIn(form.touched, name);
    return {
      errorMessage: error || "",
      invalid: typeof touch === "undefined" ? false : error && touch,
    };
  };

  return (
    <FieldArray name="opening_hours">
      {({ form, remove, push }) => (
        <div>
          {opening_hours && opening_hours.length > 0
            ? opening_hours.map((_, index) => {
                const nameFeedBack = fieldFeedback(
                  form,
                  `opening_hours[${index}].time`
                );
                return (
                  <div key={index}>
                    <FormItem
                      label="Opening Hours"
                      invalid={nameFeedBack.invalid}
                      errorMessage={nameFeedBack.errorMessage}
                    >
                      <Field name={`opening_hours[${index}].time`}>
                        {({ field, form }) => (
                          <TimeInputRange
                            name={`opening_hours[${index}].time`}
                            amPmPlaceholder
                            field={field}
                            form={form}
                            value={values.opening_hours[index].time}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                    {opening_hours.length > 1 ? (
                      <Button
                        className="mb-6"
                        shape="circle"
                        size="sm"
                        type="button"
                        // icon={<HiMinus />}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                );
              })
            : null}
          <div>
            {}
            <Button
              type="button"
              className="ltr:mr-2 rtl:ml-2 "
              onClick={() => {
                push({
                  time: "",
                });
              }}
            >
              Add a Opening Hours
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export default OpeningHourForm;
