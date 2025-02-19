import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  RangeCalendar,
  Input,
  FormItem,
  FormContainer,
} from "@/components/ui";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { getClients } from "@/services/taskManagement/blockService";
import {
  getLocation,
  get_Blocks,
  get_Facility,
  setFacility_id,
} from "../store/dataSlice";
import AsyncSelect from "react-select/async";
import { useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";

const BoothFilterTools = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    clients: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
    location: Yup.object()
      .required("Location is required")
      .typeError("Location is required"),
    block: Yup.object()
      .required("Block is required")
      .typeError("Block is required"),
    facility: Yup.object()
      .required("Facility is required")
      .typeError("Facility is required"),
  });

  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const locations = useSelector(
    (state) => state.templateMapList.data.locations
  );
  const blocks = useSelector((state) => state.templateMapList.data.blocks);
  const facilitys = useSelector((state) => state.templateMapList.data.facility);
  const [client_id, setClient_id] = useState(
    loggedInClient ? loggedInClient?.value : ""
  );
  const [location_id, setLocation_id] = useState();
  const [block_id, setBlock_id] = useState();
  const loadClients = async () => {
    let response = await getClients();
    return response.data.results;
  };

  const loadLocations = async (client_id) => {
    let data = { id: client_id };
    dispatch(getLocation(data));
  };

  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id };
    dispatch(get_Blocks(data));
  };
  const loadFacility = async (block_id) => {
    let data = { block_id: block_id };
    dispatch(get_Facility(data));
  };
  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [client_id, location_id, locations]);

  useEffect(() => {
    loadFacility(block_id);
  }, [block_id]);
  return (
    <Formik
      initialValues={{
        clients: loggedInClient ? loggedInClient : "",
        location: "",
        block: "",
        facility:""
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        dispatch(setFacility_id(values?.facility))
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 items-end my-10 gap-3">
            <div >
              <FormItem label="Clients"
              invalid={errors.clients && touched.clients}
              errorMessage={errors.clients}>
                <Field name="clients"
                >
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      required
                      size="sm"
                      // options={clientType}
                      isDisabled={loggedInClient ? true : false}
                      loadOptions={loadClients}
                      defaultOptions
                      isSearchable={true}
                      cacheOptions={false}
                      value={values.clients}
                      componentAs={AsyncSelect}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setClient_id(option.value),
                            form.setFieldValue("location", ""),
                            form.setFieldValue("block", ""),
                            form.setFieldValue("facility", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div >
              <FormItem label="Location"
              invalid={errors.location && touched.location}
              errorMessage={errors.location}>
                <Field name="location">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={locations}
                      value={values.location}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setLocation_id(option.value),
                            form.setFieldValue("block", ""),
                            form.setFieldValue("facility", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div >
              <FormItem label="Building"
              invalid={errors.block && touched.block}
              errorMessage={errors.block}>
                <Field name="block">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={blocks}
                      value={values.block}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setBlock_id(option.value),
                            form.setFieldValue("facility", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div >
              <FormItem label="Facility"
               invalid={errors.facility && touched.facility}
               errorMessage={errors.facility}>
                <Field name="facility">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={facilitys}
                      value={values.facility}
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
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                size="sm"
                variant="solid"
                icon={<AiOutlineSearch />}
                className="bg-[#00C3DE] hover:bg-[#00c4debd]"
                color="black"
                type="submit"
              >
                Search
              </Button>

              <Button
                size="sm"
                className="text-gray-800"
                type="reset"
                onClick={() => {
                  dispatch(setFacility_id(""))
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

export default BoothFilterTools;
