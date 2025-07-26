import React, { forwardRef, useEffect, useState, useCallback, useMemo } from "react";
import { FormContainer, Button, Tooltip, Select, FormItem } from "@/components/ui";
import { Form, Formik, yupToFormErrors, Field } from "formik";
import cloneDeep from "lodash/cloneDeep";
import * as Yup from "yup";
import FacilityBulkUploadFiles from "./components/facilityUpload";
import { StickyFooter } from "@/components/shared";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "@/store";
import reducer from "./store";
import { setclient, setlocation, setblock, getLocation, get_Blocks } from "./store/dataSlice";
import AsyncSelect from "react-select/async";
import { getClients } from "@/services/taskManagement/blockService";
import { DownloadIcon } from "lucide-react";
import { downloadFacilityUploadTemplate } from "@/services/taskManagement/facilitiesService";

injectReducer("facilityUploadForm", reducer);

const validationSchema = Yup.object().shape({
  client_name: Yup.object().required("Client is required").typeError("Client is required"),
  location_name: Yup.object().required("Location is required").typeError("Location is required"),
  block_name: Yup.object().required("Building is required").typeError("Building is required"),
  file: Yup.array().min(1, "Please select file").required("Please select file"),
});

const FacilityUploadFileForm = forwardRef((props, ref) => {
  const { onFormSubmit, onDiscard } = props;
  const dispatch = useDispatch();

  // Redux state
  const locations = useSelector((state) => state.facilityUploadForm.data.locations);
  const blocks = useSelector((state) => state.facilityUploadForm.data.blocks);
  const loading = useSelector((state) => state.facilityUploadForm.data.loading);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);

  // Local state for managing form dependencies
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Memoized initial form values
  const initialFormValues = useMemo(() => {
    const baseValues = {
      client_name: "",
      location_name: "",
      block_name: "",
      file: []
    };

    // Pre-populate client if user is logged in with a specific client
    if (loggedInClient && typeof loggedInClient === 'object') {
      baseValues.client_name = {
        label: loggedInClient.label,
        value: loggedInClient.value
      };
    }

    return baseValues;
  }, [loggedInClient]);

  // Memoized client loading function
  const loadClients = useCallback(async (inputValue = "") => {
    try {
      const data = { status: true, search: inputValue };
      const response = await getClients(data);
      return response.data.results || [];
    } catch (error) {
      console.error("Error loading clients:", error);
      return [];
    }
  }, []);

  // Load locations based on client selection
  const loadLocations = useCallback(async (clientId) => {
    if (!clientId) return;

    try {
      const data = { id: clientId, status: true };
      dispatch(getLocation(data));
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  }, [dispatch]);

  // Load blocks based on client and location selection
  const loadBlocks = useCallback(async (clientId, locationId) => {
    if (!clientId || !locationId) return;

    try {
      const data = { client_id: clientId, location_id: locationId, status: true };
      dispatch(get_Blocks(data));
    } catch (error) {
      console.error("Error loading blocks:", error);
    }
  }, [dispatch]);

  // Initialize form with logged-in client data
  useEffect(() => {
    if (loggedInClient && !isInitialized) {
      const clientId = loggedInClient.value;
      if (clientId) {
        setSelectedClientId(clientId);
        dispatch(setclient(loggedInClient));
        setIsInitialized(true);
      }
    }
  }, [loggedInClient, dispatch, isInitialized]);

  // Load locations when client changes
  useEffect(() => {
    if (selectedClientId) {
      loadLocations(selectedClientId);
    }
  }, [selectedClientId, loadLocations]);

  // Load blocks when client or location changes
  useEffect(() => {
    if (selectedClientId && selectedLocationId) {
      loadBlocks(selectedClientId, selectedLocationId);
    }
  }, [selectedClientId, selectedLocationId, loadBlocks]);

  // Handle client selection change
  const handleClientChange = useCallback((option, form) => {
    if (option) {
      const clientData = {
        label: option.label,
        value: option.value
      };

      form.setFieldValue("client_name", clientData);
      setSelectedClientId(option.value);
      dispatch(setclient(option));

      // Reset dependent fields
      form.setFieldValue("location_name", "");
      form.setFieldValue("block_name", "");
      setSelectedLocationId("");
    } else {
      form.setFieldValue("client_name", "");
      setSelectedClientId("");
      form.setFieldValue("location_name", "");
      form.setFieldValue("block_name", "");
      setSelectedLocationId("");
    }
  }, [dispatch]);

  // Handle location selection change
  const handleLocationChange = useCallback((option, form) => {
    if (option) {
      const locationData = {
        label: option.label,
        value: option.value
      };

      form.setFieldValue("location_name", locationData);
      setSelectedLocationId(option.value);
      dispatch(setlocation(option));

      // Reset dependent field
      form.setFieldValue("block_name", "");
    } else {
      form.setFieldValue("location_name", "");
      setSelectedLocationId("");
      form.setFieldValue("block_name", "");
    }
  }, [dispatch]);

  // Handle block selection change
  const handleBlockChange = useCallback((option, form) => {
    if (option) {
      const blockData = {
        label: option.label,
        value: option.value
      };

      form.setFieldValue("block_name", blockData);
      dispatch(setblock(option));
    } else {
      form.setFieldValue("block_name", "");
    }
  }, [dispatch]);

  const downloadTemplate = async (values) => {
    if (!values.block_name || !values.block_name.value) {
      console.error("No building selected");
      return;
    }
    try {
      const response = await downloadFacilityUploadTemplate({ block_id: values.block_name.value });
      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "facility-upload-template.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        const formData = cloneDeep(values);
        onFormSubmit?.(formData, setSubmitting);
      }}
    >
      {({ values, touched, errors, isSubmitting }) => {
        const canDownload = values.client_name && values.location_name && values.block_name;
        const canUpload = canDownload && values.file && values.file.length > 0 && !loading;

        return (
          <Form>
            <FormContainer>
              {/* Instructions */}
              <div className="mb-4 text-md text-gray-500">
                1. Select all fields. 2. Download template. 3. Fill and upload the file.
              </div>

              {/* Dropdown Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {/* Client Dropdown */}
                <FormItem
                  label="Client Name*"
                  invalid={errors.client_name && touched.client_name}
                  errorMessage={errors.client_name}
                >
                  <Field name="client_name">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        required
                        isDisabled={!!loggedInClient}
                        loadOptions={loadClients}
                        defaultOptions
                        isSearchable={true}
                        cacheOptions={false}
                        value={values.client_name}
                        componentAs={AsyncSelect}
                        placeholder="Select client..."
                        noOptionsMessage={() => "No clients found"}
                        onChange={(option) => handleClientChange(option, form)}
                      />
                    )}
                  </Field>
                </FormItem>

                {/* Location Dropdown */}
                <FormItem
                  label="Location Name*"
                  invalid={errors.location_name && touched.location_name}
                  errorMessage={errors.location_name}
                >
                  <Field name="location_name">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        required
                        options={locations || []}
                        isSearchable={true}
                        isDisabled={!selectedClientId}
                        value={values.location_name}
                        placeholder={selectedClientId ? "Select location..." : "Select client first"}
                        noOptionsMessage={() => selectedClientId ? "No locations found" : "Select client first"}
                        onChange={(option) => handleLocationChange(option, form)}
                      />
                    )}
                  </Field>
                </FormItem>

                {/* Building Dropdown */}
                <FormItem
                  label="Building Name*"
                  invalid={errors.block_name && touched.block_name}
                  errorMessage={errors.block_name}
                >
                  <Field name="block_name">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        required
                        options={blocks || []}
                        isSearchable={true}
                        isDisabled={!selectedLocationId}
                        value={values.block_name}
                        placeholder={selectedLocationId ? "Select building..." : "Select location first"}
                        noOptionsMessage={() => selectedLocationId ? "No buildings found" : "Select location first"}
                        onChange={(option) => handleBlockChange(option, form)}
                      />
                    )}
                  </Field>
                </FormItem>
              </div>

              {/* Template Download & Upload Row */}
              <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
                <Button
                  type="button"
                  className="w-full md:w-auto flex items-center gap-1"
                  disabled={!canDownload}
                  onClick={() => downloadTemplate(values)}
                >
                  Template <DownloadIcon size={20} />
                </Button>

                <div className="w-full md:w-auto flex-1">
                  <FacilityBulkUploadFiles
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>

              <StickyFooter
                className="flex items-center gap-2 py-4"
                stickyClass="bg-white dark:bg-gray-800"
              >
                <Button
                  size="sm"
                  variant="solid"
                  loading={isSubmitting}
                  className="w-full md:w-auto text-gray-800"
                  type="submit"
                  disabled={!canUpload}
                >
                  {isSubmitting ? "Uploading..." : "Upload"}
                </Button>
                <Button
                  size="sm"
                  className="ltr:mr-3 rtl:ml-3"
                  onClick={() => onDiscard?.()}
                  type="button"
                >
                  Discard
                </Button>
              </StickyFooter>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
});

FacilityUploadFileForm.defaultProps = {
  type: "add"
};

export default FacilityUploadFileForm;