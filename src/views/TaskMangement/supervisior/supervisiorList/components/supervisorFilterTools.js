import React, { useState, useRef, useEffect } from "react";
import { FormItem, FormContainer, Button } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { setClientId } from "../store/dataSlice";
import { getClients } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";

const SupervisorFilterTools = () => {
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const loadClients = async () => {
    let response = await getClients();
    return response.data.results;
  };
  return (
    <Formik
      initialValues={{
        client: loggedInClient ? loggedInClient : "",
      }}
      onSubmit={async (values) => {}}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 items-end my-10 gap-3">
            <div className="xl:col-span-2 ">
              <FormItem label="Client">
                <Field name="client">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      value={values.client}
                      loadOptions={loadClients}
                      defaultOptions
                      isSearchable={true}
                      cacheOptions={false}
                      componentAs={AsyncSelect}
                      isDisabled={loggedInClient ? true : false}
                      onChange={(option) =>
                        option
                          ? form.setFieldValue(
                              field.name,
                              {
                                label: option.label,
                                value: option.value,
                              },
                              dispatch(setClientId(option?.value))
                            )
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <Button
              size="sm"
              className="text-gray-800"
              type="reset"
              onClick={() => {
                dispatch(setClientId(""));
              }}
            >
              Reset
            </Button>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default SupervisorFilterTools;
