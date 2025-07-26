import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Button,
  FormItem,
  FormContainer,
} from "@/components/ui";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
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
  setPayload,
  getReviewData,
  getTaskDashboardData,
  setGraphDataLevel,
  setSelectedFiltersData,
} from "../store/dataSlice";
import { MdGroups, MdLocationOn } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { PiDesktopTowerFill } from "react-icons/pi";
import { BiMaleFemale } from "react-icons/bi";
import FilterDropdown from "../../../../../components/custom/FilterDropdown";
import DateTypeSegment from "./DateTypeSegment";

const IotFilterTools = () => {
  const dispatch = useDispatch();
  const { clients, locations, blocks, facility, booths, IOTdevices, IOTdevicesIDs, payload, selectedFiltersData, dashboardType, type, isDemoMode } = useSelector((state) => state.iotData.data);
  const { clientId: loggedInClient, isFreeTrial, roleId} = useSelector((state) => state.auth.user);
  const dropdownRef = useRef(null);

  const [client_id, setClient_id] = useState(
    loggedInClient ? loggedInClient?.value : ""
  );
  const [location_id, setLocation_id] = useState("");
  const [block_id, setBlock_id] = useState("");
  const [facility_id, setfacility_id] = useState("");
  const [booth_id, setbooth_id] = useState("");
  const [iot_device, setiot_device] = useState("");
  const [is_first_time, setIsFirstTime] = useState(true);
  const [filterOpen, setFilterOpen] = useState(null);

  const validationSchema = Yup.object().shape({
    clients: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
    location: Yup.object()
      .required("Location is required")
      .typeError("Location is required"),
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
    dispatch(get_Clients());
  }, []);

  useEffect(() => {
    if (client_id) loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    if (locations?.length && !location_id) {
      const locationId = locations?.[0]?.value;
      setLocation_id(locationId);
      const data = { location_id: locationId, type };
      dispatch(setPayload(data));
    }
  }, [locations]);

  useEffect(() => {
    if (!loggedInClient) {
      setClient_id(clients?.[0]?.value);
    }
  }, [clients]);

  useEffect(() => {
    if (client_id && location_id) loadBlocks(client_id, location_id);
  }, [client_id, location_id]);

  useEffect(() => {
    if (block_id) loadFacility(block_id);
  }, [block_id]);

  useEffect(() => {
    if (facility_id) loadBooth(facility_id);
  }, [facility_id]);

  useEffect(() => {
    if (booth_id || facility_id) {
      let mapping_id = booth_id ? booth_id : facility_id;
      loadIOTDevice(mapping_id);
      loadIOTDeviceIds(mapping_id);
    }
  }, [booth_id, facility_id]);

  function findSelectedValueObj(id = client_id) {
    let selectedClient = "";
    clients?.map((client) => {
      if (client.value == id) {
        selectedClient = client;
      }
    });
    return selectedClient;
  }

  // useEffect(() => {
  //   let data = {};

  //   if (is_first_time && locations?.[0]?.value) {
  //     console.log("is_first_time---", is_first_time);
  //     data.location_id = locations?.[0]?.value;
  //     data.type = type;
  //     dispatch(setPayload(data));
  //     // dispatch(getTaskDashboardData(data));
  //   }
  // }, [locations]);

  const handleFilterChange = (filterKey, option) => {
    dispatch(
      setSelectedFiltersData({
        ...selectedFiltersData,
        [filterKey]: option.label,
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilterOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-filter">
      <Formik
        id="iotFilterTools"
        initialValues={{
          block: "",
          boothName: "",
          facility: "",
          iotDevice: "",
          iotDevice_id: "",
          clients: loggedInClient
            ? loggedInClient
            : is_first_time
              ? clients?.[0]
              : findSelectedValueObj(),
          location: locations?.[0],
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let data = {};
          if (values.iotDevice_id) {
            data.device_id = values.iotDevice_id.value;
          } else if (values.iotDevice) {
            data.device_id = values.iotDevice_id.value;
          } else if (values.boothName) {
            data.mapping_id = +values.boothName.value
              ? +values.boothName.value
              : +values.facility.value;
          } else if (values.facility) {
            data.facility_id = +values.boothName.value
              ? +values.boothName.value
              : +values.facility.value;
            dispatch(setGraphDataLevel("Janitor"));
          } else if (values.block) {
            data.block_id = +values.block.value;
            dispatch(setGraphDataLevel("Facility"));
          } else if (values.location) {
            data.location_id = values.location.value;
            dispatch(setGraphDataLevel("Building"));
          } else {
            data.location_id = values.location.value;
          }
          data.type = type;
          if (type == "custom") {
            data.start_date = payload?.start_date;
            data.end_date = payload?.end_date;
          }
          setSubmitting(true);
          dispatch(setPayload(data));
          switch (dashboardType) {
            case "iot":
              dispatch(getIOTData(data));
              break;
            case "task":
              dispatch(getTaskDashboardData(data));
              break;
            case "review":
              dispatch(getReviewData(data));
              break;
            default:
              dispatch(getTaskDashboardData(data));
          }
        }}
      >
        {({ values, touched, errors, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <FormContainer className="">
                <div className="flex flex-col gap-2">
                  <div ref={dropdownRef} className="w-full pb-4 grid grid-cols-6 gap-3">
                    <FormItem
                      className=""
                      invalid={errors.clients && touched.clients}
                      errorMessage={errors.clients}
                    >
                      <Field name="clients">
                        {({ field, form }) => (
                          <FilterDropdown
                            label="Clients"
                            Icon={MdGroups}
                            options={clients}
                            selected={values.clients}
                            isDisabled={(loggedInClient || isDemoMode) ? true : false}
                            onChange={(option) => {
                              form.setFieldValue("clients", option);
                              setIsFirstTime(false);
                              setClient_id(option.value);
                              form.setFieldValue("location", "");
                              form.setFieldValue("block", "");
                              form.setFieldValue("facility", "");
                              form.setFieldValue("boothName", "");
                              form.setFieldValue("iotDevice_id", "");
                              handleFilterChange("clients", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>
                    <FormItem
                      className=""
                      invalid={errors.location && touched.location}
                      errorMessage={errors.location}
                    >
                      <Field name="location">
                        {({ field, form }) => (
                          <FilterDropdown
                            label="Location"
                            Icon={MdLocationOn}
                            options={locations}
                            selected={values.location}
                            isDisabled={roleId !==1 && isFreeTrial}
                            onChange={(option) => {
                              form.setFieldValue("location", option);
                              setLocation_id(option.value);
                              form.setFieldValue("block", "");
                              form.setFieldValue("facility", "");
                              form.setFieldValue("boothName", "");
                              form.setFieldValue("iotDevice_id", "");
                              handleFilterChange("location", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      className=""
                      invalid={errors.block && touched.block}
                      errorMessage={errors.block}
                    >
                      <Field name="block">
                        {({ field, form }) => (
                          <FilterDropdown
                            label="Building"
                            Icon={FaBuilding}
                            options={blocks}
                            selected={values.block}
                            isDisabled={roleId !==1 && isFreeTrial}
                            onChange={(option) => {
                              form.setFieldValue("block", option);
                              setBlock_id(option.value);
                              form.setFieldValue("facility", "");
                              form.setFieldValue("boothName", "");
                              form.setFieldValue("iotDevice_id", "");
                              handleFilterChange("block", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem
                      className=""
                      // label="Facility"
                      invalid={errors.facility && touched.facility}
                      errorMessage={errors.facility}
                    >
                      <Field name="facility">
                        {({ field, form }) => (
                          <FilterDropdown
                            label={"Facility"}
                            Icon={BsBuildingsFill}
                            options={facility}
                            selected={values.facility}
                            isDisabled={roleId !==1 && isFreeTrial}
                            onChange={(option) => {
                              form.setFieldValue("facility", option);
                              form.setFieldValue("boothName", "");
                              form.setFieldValue("iotDevice_id", "");
                              setfacility_id(option.value);
                              handleFilterChange("facility", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem className="">
                      <Field name="boothName">
                        {({ field, form }) => (
                          <FilterDropdown
                            label="Booth"
                            Icon={BiMaleFemale}
                            options={booths}
                            selected={values.boothName}
                            isDisabled={roleId !==1 && isFreeTrial}
                            onChange={(option) => {
                              form.setFieldValue("boothName", option);
                              form.setFieldValue("iotDevice_id", "");
                              setbooth_id(option.value);
                              handleFilterChange("boothName", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>

                    <FormItem className="">
                      <Field name="iotDevice_id">
                        {({ field, form }) => (
                          <FilterDropdown
                            label="IoT ID"
                            Icon={PiDesktopTowerFill}
                            options={IOTdevicesIDs}
                            selected={values.iotDevice_id}
                            isDisabled={roleId !==1 && isFreeTrial}
                            onChange={(option) => {
                              form.setFieldValue("iotDevice_id", option);
                              handleFilterChange("iotDevice_id", option);
                            }}
                            filterOpen={filterOpen}
                            setFilterOpen={setFilterOpen}
                          />
                        )}
                      </Field>
                    </FormItem>
                  </div>
                  <div className="flex justify-between items-center">
                    <DateTypeSegment />
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <Button
                        size="md"
                        variant="solid"
                        color="black"
                        className="bg-[#00C3DE] hover:bg-[#00c4debd] text-gray-800"
                        type="submit"
                      >
                        Search
                      </Button>

                      <Button
                        size="md"
                        className="text-gray-800"
                        type="reset"
                        onClick={() => {
                          loggedInClient
                            ? dispatch(resetloggedState())
                            : dispatch(resetState());
                          setLocation_id("");
                          setBlock_id("");
                          setfacility_id("");
                          setbooth_id("");
                          setiot_device("");
                          dispatch(setPayload(""));
                          // setClient_id("")
                          // !loggedInClient && setFieldValue("clients","")
                          !loggedInClient && setFieldValue("location", "");
                          // setFieldValue("clients","")
                          // setFieldValue("location", "")
                          !loggedInClient && dispatch(get_Clients());
                          // !loggedInClient && setClient_id("")
                          loadLocations(
                            Object.keys(loggedInClient).length
                              ? loggedInClient.value
                              : clients?.[0]?.value
                          );
                          setIsFirstTime(true);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default IotFilterTools;
