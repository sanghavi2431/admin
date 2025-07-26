import React from "react";
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import { Input, Button, FormItem, FormContainer } from "@/components/ui";
import TimeInputRange from "@/components/ui/TimeInput/TimeInputRange";
const BoothForm = (props) => {
  const { values, touched, errors } = props.data;
  let booth = values.booth;

  const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name);
    const touch = getIn(form.touched, name);
    return {
      errorMessage: error || "",
      invalid: typeof touch === "undefined" ? false : error && touch,
    };
  };
  return (
    <Form>
      <FormContainer>
        <div>
          <FieldArray name="booth">
            {({ form, remove, push }) => (
              <div>
                {booth && booth.length > 0
                  ? booth.map((_, index) => {
                      const nameFeedBack = fieldFeedback(
                        form,
                        `booth[${index}].booth_name`
                      );
                      return (
                        <div key={index} className="flex gap-2 items-end mb-3">
                          <FormItem
                            label="Booth*"
                            invalid={nameFeedBack.invalid}
                            errorMessage={nameFeedBack.errorMessage}
                          >
                            <Field
                              type="text"
                              autoComplete="off"
                              name={`booth[${index}].booth_name`}
                              value={values.booth[index].booth_name || ""}
                              component={Input}
                              placeHolder={"Booth"}
                            />
                            {/* <Field name={`booth[${index}].name`}>
                        {({ field, form }) => (
                          <TimeInputRange
                            name={`booth[${index}].time`}
                            amPmPlaceholder
                            field={field}
                            form={form}
                            value={values.booth[index].time}
                            onChange={(date) => {
                              form.setFieldValue(field.name, date);
                            }}
                          />
                        )}
                      </Field> */}
                          </FormItem>
                       
                           {
                            booth && booth.length > 1 &&
                            <Button
                              className="mb-1"
                              shape="circle"
                              size="sm"
                              type="button"
                              // icon={<HiMinus />}
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                           } 
                         
                        </div>
                      );
                    })
                  : null}
                <div>
                  <Button
                    type="button"
                    onClick={() => {
                      push({
                        booth_name: "",
                      });
                    }}
                    className="mt-2"
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
          </FieldArray>
        </div>
      </FormContainer>
    </Form>
  );
};

export default BoothForm;
