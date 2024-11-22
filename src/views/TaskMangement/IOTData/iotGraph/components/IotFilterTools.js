import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  RangeCalendar,
  Input,
  FormItem,
  FormContainer,
  Dialog,
} from "components/ui";
import * as Yup from "yup";
import { toast, Notification } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "components/ui";
import { getClients } from "services/taskManagement/blockService";
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
  getReviewData,
  getBoards,
} from "../store/dataSlice";
import AsyncSelect from "react-select/async";
import { AiOutlineSearch } from "react-icons/ai";
import { HiFilter } from "react-icons/hi";
import { MdGroups, MdLocationOn } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { PiDesktopTowerFill } from "react-icons/pi";
import { BiMaleFemale } from "react-icons/bi";
import FilterDropdown from "../../../../../components/shared/FilterDropdown";

const IotFilterTools = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.iotData.data.clients);
  const locations = useSelector((state) => state.iotData.data.locations);
  const blocks = useSelector((state) => state.iotData.data.blocks);
  const facility = useSelector((state) => state.iotData.data.facility);
  const booths = useSelector((state) => state.iotData.data.booths);
  const IOTdevices = useSelector((state) => state.iotData.data.IOTdevices);
  const IOTdevicesIDs = useSelector(
    (state) => state.iotData.data.IOTdevicesIDs
  );

  const payload = useSelector((state) => state.iotData.data.payload);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [client_id, setClient_id] = useState(
    loggedInClient ? loggedInClient?.value : ""
  );
  const [location_id, setLocation_id] = useState("");
  const [block_id, setBlock_id] = useState("");
  const [facility_id, setfacility_id] = useState("");
  const [booth_id, setbooth_id] = useState("");
  const [iot_device, setiot_device] = useState("");
  const [is_first_time, setIsFirstTime] = useState(true);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterOpen, setFilterOpen] = useState(null);

  let type = useSelector((state) => state.iotData.data.type);
  const dashboardType = useSelector((state) => state.iotData.data.dashboardType);
  const validationSchema = Yup.object().shape({
    clients: Yup.object()
      .required("Client is required")
      .typeError("Client is required"),
    location: Yup.object()
      .required("Location is required")
      .typeError("Location is required"),
    // block: Yup.object().required("Block is required").typeError("Block is required"),
    // facility: Yup.object().required("Facility is required").typeError("Facility is required"),
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
    loadLocations(client_id);
    console.log("Loading locations for client_id: ", client_id);
  }, [client_id]);

  useEffect(() => {
    console.log("locations: ", locations);

    if (locations?.length) {
      setLocation_id(locations?.[0]?.value);
    }
  }, [locations]);

  useEffect(() => {
    if (!loggedInClient) {
      setClient_id(clients?.[0]?.value);
    }
  }, [clients]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [location_id]);

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

  function findSelectedValueObj(id = client_id) {
    let selectedClient = "";
    clients?.map((client) => {
      if (client.value == id) {
        selectedClient = client;
      }
    });
    return selectedClient;
  }

  useEffect(() => {
    let data = {};
    if (is_first_time && locations?.[0]?.value) {
      data.location_id = locations?.[0]?.value;
      data.type = type;
      // let tempData={"period":"custom",
      // "start_date":"2024-05-01",
      // "end_date":"2024-05-13"}
      console.log("payload_data", data);

      dispatch(setPayload(data));
      dispatch(getIOTData(data));
    }
  }, [locations]);

  return (
    <Formik
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
        } else if (values.block) {
          data.block_id = +values.block.value;
        } else if (values.location) {
          data.location_id = values.location.value;
        } else {
          data.location_id = values.location.value;
        }
        data.type = type;
        if (type == "custom") {
          data.start_date = payload?.start_date;
          data.end_date = payload?.end_date;
        }
        // let tempData={"period":"custom",
        // "start_date":"2024-05-01",
        // "end_date":"2024-05-13"}
        // data.type = "today";

        setSubmitting(true);
        dispatch(setPayload(data));
        switch (dashboardType) {
          case "iot":
        dispatch(getIOTData(data));
            break;
          case "task":
            dispatch(getBoards(data));
            break;
          case "review":
            dispatch(getReviewData(data));
            break;
          default:
            dispatch(getIOTData(data));
        }
        // resetForm();
      }}
    >
      {({ values, touched, errors, setFieldValue, isSubmitting }) => {
        return (
          <Form>
            <FormContainer className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-7 gap-2">
              <div
                className={`md:col-span-2 xl:col-span-6 overflow-x-auto ${
                  filterOpen ? "h-[260px]" : ""
                }`}
              >
                <div className="w-full py-4 flex flex-col md:flex-row gap-2 justify-between items-center">
                  <FormItem
                    className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4"
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
                          onChange={(option) => {
                            form.setFieldValue("clients", option);
                            setIsFirstTime(false);
                            setClient_id(option.value);
                            form.setFieldValue("location", "");
                            form.setFieldValue("block", "");
                            form.setFieldValue("facility", "");
                            form.setFieldValue("boothName", "");
                            form.setFieldValue("iotDevice_id", "");
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4"
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
                          onChange={(option) => {
                            form.setFieldValue("location", option);
                            setLocation_id(option.value);
                            form.setFieldValue("block", "");
                            form.setFieldValue("facility", "");
                            form.setFieldValue("boothName", "");
                            form.setFieldValue("iotDevice_id", "");
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4"
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
                          onChange={(option) => {
                            form.setFieldValue("block", option);
                            setBlock_id(option.value);
                            form.setFieldValue("facility", "");
                            form.setFieldValue("boothName", "");
                            form.setFieldValue("iotDevice_id", "");
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem
                    className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4"
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
                          onChange={(option) => {
                            form.setFieldValue("facility", option);
                            form.setFieldValue("boothName", "");
                            form.setFieldValue("iotDevice_id", "");
                            setfacility_id(option.value);
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4">
                    <Field name="boothName">
                      {({ field, form }) => (
                        <FilterDropdown
                          label="Booth Name"
                          Icon={BiMaleFemale}
                          options={booths}
                          selected={values.boothName}
                          onChange={(option) => {
                            form.setFieldValue("boothName", option);
                            form.setFieldValue("iotDevice_id", "");
                            setbooth_id(option.value);
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>

                  <FormItem className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 xl:w-1/4">
                    <Field name="iotDevice_id">
                      {({ field, form }) => (
                        <FilterDropdown
                          label="IOT Device ID"
                          Icon={PiDesktopTowerFill}
                          options={IOTdevicesIDs}
                          selected={values.iotDevice_id}
                          onChange={(option) => {
                            form.setFieldValue("iotDevice_id", option);
                          }}
                          filterOpen={filterOpen}
                          setFilterOpen={setFilterOpen}
                        />
                      )}
                    </Field>
                  </FormItem>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Button
                  size="sm"
                  variant="solid"
                  color="black"
                  className="bg-[#00C3DE] hover:bg-[#00c4debd] text-gray-800"
                  type="submit"
                >
                  Search
                </Button>

                <Button
                  size="sm"
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
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default IotFilterTools;
