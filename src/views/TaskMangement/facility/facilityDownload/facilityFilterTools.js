import React, { useState, useRef, useEffect } from "react";
import { FormItem, FormContainer, Button } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import * as Yup from "yup";
import { Tooltip } from "@/components/ui";
import { toast, Notification } from "@/components/ui";
// import { setClientId } from "../store/dataSlice";
import { getClients } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { downloadlocationBlockDetails } from "@/services/taskManagement/facilitiesService";

const FacilityDataDownloadFormTools = () => {
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const loadClients = async () => {
    let response = await getClients();
    return response.data.results;
  };
  const validationSchema = Yup.object().shape({
    client: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
  });

  return (
    <Formik
      initialValues={{
        client: loggedInClient ? loggedInClient : "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const  response = await downloadlocationBlockDetails({
            client_id: values?.client?.value,
          });
          const {results,success}=response?.data

          if (success) {
            let link = document.createElement("a");
            link.href = results;
            link.setAttribute("download", results);
            document.body.appendChild(link);
            link.click();
            toast.push(
              <Notification
                title={"Successfully Downloaded"}
                type="success"
                duration={2500}
              >
                Facility, Janitor and Template Data Downloaded successfully
              </Notification>,
              {
                placement: "top-center",
              }
            );
          }
        } catch (err) {
          let errorMessage = err.response.data.message;
          toast.push(
            <Notification title={"Failed"} type="warning" duration={2500}>
              {errorMessage}
            </Notification>,
            {
              placement: "top-center",
            }
          );
        }
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form className="w-full">
          <FormContainer className="flex w-full ">
            <div className="md:flex gap-4 items-end">
            <div className="w-40">
              <FormItem
                label="Client"
                invalid={errors.client && touched.client}
                errorMessage={errors.client}
              >
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
                              }
                              //  dispatch(setClientId(option?.value))
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
              className="text-gray-800 w-1/2"
              type="submit"
            >
              <Tooltip title="Available Location and Building Information">
                Download
              </Tooltip>
              </Button>
              </div>
            {/* </Tooltip> */}
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default FacilityDataDownloadFormTools;
