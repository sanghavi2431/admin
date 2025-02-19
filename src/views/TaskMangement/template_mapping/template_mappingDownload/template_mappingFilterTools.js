import React, { useState, useRef, useEffect } from "react";
import { FormItem, FormContainer, Button } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import * as Yup from "yup";
import { Tooltip } from "@/components/ui";
import { toast, Notification } from "@/components/ui";
import { getClients } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { downloadlocationBlockDetails } from "@/services/taskManagement/facilitiesService";
import { downloadAutoTaskMappingSampleSheet } from "@/services/taskManagement/templateMapService";

const TemplateMappingDataDownloadFormTools = () => {
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
          const  response = await downloadAutoTaskMappingSampleSheet({
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
                Location and Building Data Downloaded successfully
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
            <div className="w-32 ">
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
              className="mt-8 ml-1 mb-1 md:mb-0 xl:mt-8 md:mr-1 text-gray-800"
              type="submit"
            >
              <Tooltip title="Available Facility,Janitor and Template Information">
                Download
              </Tooltip>
            </Button>
            {/* </Tooltip> */}
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default TemplateMappingDataDownloadFormTools;
