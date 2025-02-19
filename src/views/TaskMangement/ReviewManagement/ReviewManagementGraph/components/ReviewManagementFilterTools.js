import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  RangeCalendar,
  Input,
  FormItem,
  FormContainer,
} from "@/components/ui";
import * as Yup from "yup";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { getClients } from "@/services/taskManagement/blockService";
import {
  getBooths,
  getIOTData,
  getIOTdevicebyMappingId,
  getIOTdeviceIdbyMappingId,
  getLocation,
  get_Blocks,
  get_Clients,
  get_Facility,
  resetloggedState,
  resetState,
  setFacility_id,
  setPayload,

} from "../store/dataSlice";
import AsyncSelect from "react-select/async";
import { AiOutlineSearch } from "react-icons/ai";

const ReviewFilterTools = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.reviewData.data.clients);
  const locations = useSelector((state) => state.reviewData.data.locations);
  const blocks = useSelector((state) => state.reviewData.data.blocks);
  const facility = useSelector((state) => state.reviewData.data.facility);
  const booths = useSelector((state) => state.reviewData.data.booths);
  const IOTdevices = useSelector((state) => state.reviewData.data.IOTdevices);
  const IOTdevicesIDs = useSelector((state) => state.reviewData.data.IOTdevicesIDs);

  const payload = useSelector((state) => state.reviewData.data.payload);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [client_id, setClient_id] = useState(loggedInClient?loggedInClient?.value:"");
  const [location_id, setLocation_id] = useState("");
  const [block_id, setBlock_id] = useState("");
  const [facility_id, setfacility_id] = useState("");
  const [booth_id, setbooth_id] = useState("");
  const [iot_device, setiot_device] = useState("");
  let type = useSelector((state) => state.reviewData.data.type);
  const validationSchema = Yup.object().shape({
    clients: Yup.object().required("Client is required").typeError("Client is required"),
    location: Yup.object().required("Location is required").typeError("Location is required"),
    block: Yup.object().required("Block is required").typeError("Block is required"),
    facility: Yup.object().required("Facility is required").typeError("Facility is required"),
    }); 
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

  const loadBooth = async (facility_id) => {
    let data = { facility_id: facility_id };
    dispatch(getBooths(data));
  };

  const loadIOTDevice = async (mapping_id) => {
    let data = { mapping_id: mapping_id };
    dispatch(getIOTdevicebyMappingId(data));
  };
  const loadIOTDeviceIds = async (mapping_id) => {
    let data = { mapping_id: mapping_id };
    dispatch(getIOTdeviceIdbyMappingId(data));
  };

  useEffect(() => {
    dispatch(get_Clients())
  }, []);

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [ location_id]);

  useEffect(() => {
    loadFacility(block_id);
  }, [block_id]);

  useEffect(() => {
    loadBooth(facility_id);
  }, [facility_id]);

  useEffect(() => {
    let mapping_id = booth_id ? booth_id : facility_id;
    loadIOTDevice(mapping_id);
    loadIOTDeviceIds(mapping_id);
  }, [booth_id, facility_id]);

  return (
    <Formik
      initialValues={{
        block: "",
        boothName: "",
        facility: "",
        iotDevice: "",
        iotDevice_id: "",
        clients: loggedInClient?loggedInClient:"",
        location: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        let data = {};
        data.facility_id = values.facility.value;
        data.type = type[0];
        
        setSubmitting(true);
dispatch(setPayload(data))
        dispatch(getIOTData(data));
        // resetForm();
      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 my-10 gap-3">
            <div>
              <FormItem 
              label="Clients"
              invalid={errors.clients && touched.clients}
              errorMessage={errors.clients}>
                <Field name="clients">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      required
                      size="sm"
                      options={clients}
                      isDisabled={loggedInClient?true:false}
                      value={values.clients}
                      cacheOptions={false}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setClient_id(option.value),
                            form.setFieldValue("location", ""),
                            form.setFieldValue("block", ""),
                            form.setFieldValue("facility", ""),
                            form.setFieldValue("boothName", ""),
                            form.setFieldValue("iotDevice", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div>
              <FormItem 
              label="Location"
              invalid={errors.location && touched.location}
              errorMessage={errors.location}>
                <Field name="location"
                >
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
                            form.setFieldValue("facility", ""),
                            form.setFieldValue("boothName", ""),
                            form.setFieldValue("iotDevice", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div>
              <FormItem 
              label="Building"
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
                            form.setFieldValue("facility", ""),
                            form.setFieldValue("boothName", ""),
                            form.setFieldValue("iotDevice", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div>
              <FormItem 
              label="Facility"
              invalid={errors.facility && touched.facility}
              errorMessage={errors.facility}>
                <Field name="facility">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={facility}
                      value={values.facility}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            form.setFieldValue("boothName", ""),
                            form.setFieldValue("iotDevice", ""),
                            setfacility_id(option.value))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            {/* <div>
              <FormItem label="Booth Name">
                <Field name="boothName">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={booths}
                      value={values.boothName}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            form.setFieldValue("iotDevice", ""),
                            setbooth_id(option.value))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div> */}
            {/* <div className="">
              <FormItem label="IOT Device">
                <Field name="iotDevice">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={IOTdevices}
                      value={values.iotDevice}
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
            </div> */}
            {/* <div className="">
              <FormItem label="IOT Device ID">
                <Field name="iotDevice_id">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={IOTdevicesIDs}
                      value={values.iotDevice_id}
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
            </div> */}
            <div className="flex flex-col md:flex-row gap-2 md:mt-[1.85rem]">
              <Button
                size="sm"
                variant="solid"
                icon={<AiOutlineSearch />}
                className="text-gray-800"
                type="submit"
              >
                Search
              </Button>
              <Button
                size="sm"
                className="text-gray-800"
                type="reset"
                onClick={() => {
                  loggedInClient ?dispatch(resetloggedState()) : dispatch(resetState())
                  !loggedInClient && setClient_id("")
                  setLocation_id("")
                   setBlock_id("")
                   setfacility_id("")
                   setbooth_id("")
                   setiot_device("")
                  dispatch(setPayload(""))
                  !loggedInClient && setFieldValue("clients","")
                  !loggedInClient && setFieldValue("location", "")
                  // setFieldValue("clients","")
                  // setFieldValue("location", "")
                  dispatch(get_Clients())
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
