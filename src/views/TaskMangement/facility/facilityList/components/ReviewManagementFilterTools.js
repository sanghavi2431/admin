import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  RangeCalendar,
  Input,
  FormItem,
  FormContainer,
} from "@/components/ui";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import {
  get_Clients,
} from "../store/stateSlice";
import { useNavigate } from "react-router-dom";

const ReviewFilterTools = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clients = useSelector((state) => state.facilityList.state.clients);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [client_id, setClient_id] = useState(
    loggedInClient ? loggedInClient?.value : ""
  );

  const validationSchema = Yup.object().shape({
    clients: Yup.object()
      .required("Client is required")
      .typeError("Client is required")
  });


  useEffect(() => {
    dispatch(get_Clients());
  }, []);

  return (
    <Formik
      initialValues={{
        clients: loggedInClient ? loggedInClient : "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {

      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting,setErrors }) => (
        <Form>
          <FormContainer className="xl:grid xl:grid-cols-1 gap-2">
            <div>
              <FormItem
                label="Clients"
                invalid={errors.clients && touched.clients}
                errorMessage={errors.clients}
              >
                <Field name="clients">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      required
                      size="sm"
                      options={clients}
                      isDisabled={loggedInClient ? true : false}
                      value={values.clients}
                      cacheOptions={false}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setClient_id(option.value)
                          )
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div className="md:flex gap-3">
              <Button
                size="sm"
                variant="solid"
                className="text-gray-800"
                type="submit"
                onClick={() => {
                  if (values?.clients)
                    window.open(
                      `${import.meta.env.VITE_BASE_URL}/api/whms/feedback-page/qr?client_id=${client_id}`,
                      "_blank"
                    );
                }}
              >
                Download
              </Button>

              <Button
                size="sm"
                className="text-gray-800"
                type="reset"
                onClick={() => {
                  !loggedInClient && setClient_id("");
                  !loggedInClient && setFieldValue("clients", "");
                  dispatch(get_Clients());
                }}
              >
                Reset
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default ReviewFilterTools;
