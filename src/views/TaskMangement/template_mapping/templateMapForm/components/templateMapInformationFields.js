import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Select, TimeInput, Button } from "@/components/ui";
import { Field } from "formik";
import { getClients } from "@/services/taskManagement/blockService";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { getJanitor, getLocation, getTemplate, get_Blocks, get_Facility, getShifts, getCluster } from "../store/dataSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];

const TemplateMapInformationFields = (props) => {
  const dispatch = useDispatch();
  const { values, touched, errors, type } = props;

  const facilityMappingData = useSelector((state) => state.auth.user.facilityMappingData);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const [location_id, setLocation_id] = useState(facilityMappingData?.location?.value);
  const [block_id, setBlock_id] = useState(facilityMappingData?.block?.value);
  const [facility_id, setFacility_id] = useState(facilityMappingData?.facility_name?.value);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const locations = useSelector((state) => state.tempMapForm.data.locations)
  const blocks = useSelector((state) => state.tempMapForm.data.blocks)
  const facility = useSelector((state) => state.tempMapForm.data.facility)
  let shifts = useSelector((state) => state.tempMapForm.data.shifts);
  const janitorList = useSelector(
    (state) => state.tempMapForm.data.janitorList
  );
  const clusterList = useSelector(
    (state) => state.tempMapForm.data.clusterList
  );
  const templateList = useSelector(
    (state) => state.tempMapForm.data.templateList
  );
  useEffect(() => {
    let data = { location_id: location_id }
    dispatch(getShifts(data));
  }, [client_id, location_id]);

  const loadFacility = async (block_id) => {
    let data = { block_id: block_id };
    dispatch(get_Facility(data))
  };
  const loadClients = async () => {
    let response = await getClients();
    return response.data.results;
  };
  const loadLocations = async (client_id) => {
    let data = { id: client_id };
    dispatch(getLocation(data))
  };

  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id };
    dispatch(get_Blocks(data))
  };
  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [location_id]);

  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    let data = { facility_id: facility_id, role_id: 1 }
    dispatch(getJanitor(data));

  }, [facility_id]);
  useEffect(() => {
    let data = { location_id: location_id }
    dispatch(getTemplate(data));

  }, [location_id]);
  useEffect(() => {
    loadFacility(block_id);
  }, [block_id]);
  return (
    <AdaptableCard className="mb-4" >
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-2 gap-y-6 ">
        <div className="col-span-1">
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
                  isDisabled={loggedInClient ? true : false}
                  // options={clientType}
                  loadOptions={loadClients}
                  defaultOptions
                  isSearchable={true}
                  cacheOptions={false}
                  value={values.client_name}
                  componentAs={AsyncSelect}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setClient_id(option.value),
                        form.setFieldValue("location_name", ""),
                        form.setFieldValue("block_name", ""),
                        form.setFieldValue("facility", "")
                      )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div>
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
                  options={locations}
                  isSearchable={true}
                  value={values.location_name}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setLocation_id(option.value),
                        form.setFieldValue("block_name", ""),
                        form.setFieldValue("facility", "")
                      )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div>
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
                  options={blocks}
                  isSearchable={true}
                  value={values.block_name}
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
                  options={facility}
                  value={values.facility}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setFacility_id(option.value)
                      )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        {/* <div className="col-span-1">
          <FormItem
            label="Cluster*"
            invalid={errors.cluster && touched.cluster}
            errorMessage={errors.cluster}
          >
            <Field name="cluster">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={clusterList}
                  isMulti
                  isSearchable={true}
                  isDisabled={!values?.facility}
                  value={values.cluster}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div> */}
        {/* <div className="col-span-1">
          <FormItem
            label="Shift*"
            invalid={errors.shift_ids && touched.shift_ids}
            errorMessage={errors.shift_ids}
          >
            <Field name="shift_ids">
              {({ field, form }) => (
                <Select
                  isMulti
                  field={field}
                  form={form}
                  required
                  isDisabled={!values.location_name }
                  options={shifts}
                  value={values.shift_ids}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div> */}
        <div className="col-span-1">
          <FormItem
            label="Templates*"
            invalid={errors.templates && touched.templates}
            errorMessage={errors.templates}
          >
            <Field name="templates">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={templateList}
                  isSearchable={true}
                  isDisabled={!values?.location_name}
                  value={values.templates}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Janitor*"
            invalid={errors.janitor && touched.janitor}
            errorMessage={errors.janitor}
          >
            <Field name="janitor">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={janitorList}
                  isSearchable={true}
                  isDisabled={!values?.facility}
                  value={values.janitor}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        {/* Slot Timings Section - Refactored */}
        <div className="col-span-3">
          <FormItem
            label="Schedule Task Timings*"
            invalid={errors.slots && touched.slots}
            errorMessage={errors.slots}
          >
            <Field name="slots">
              {({ form }) => {
                // Get template duration (in minutes) from selected template
                const selectedTemplate = (templateList || []).find(
                  (tpl) => tpl.value === values.templates?.value
                );

                // Assume template object has 'duration' in minutes
                const templateDuration = selectedTemplate?.estimated_time || 0;

                // Local state for slot input and edit
                const [slotStartTime, setSlotStartTime] = useState("");
                const [editingIndex, setEditingIndex] = useState(null);

                // Calculate end time as a Date object
                const calcEndTime = (start, duration) => {
                  if (!start || !duration) return null;
                  const startDate = typeof start === "string" ? new Date(start) : start;
                  if (isNaN(startDate.getTime())) return null;
                  return new Date(startDate.getTime() + duration * 60000);
                };
                const slotEndTime = calcEndTime(slotStartTime, templateDuration);

                // Add or update slot
                const handleAddOrUpdateSlot = () => {
                  if (!slotStartTime || !slotEndTime) return;
                  const newSlot = { start_time: slotStartTime, end_time: slotEndTime };
                  let updatedSlots = [...(values.slots || [])];
                  if (editingIndex !== null) {
                    updatedSlots[editingIndex] = newSlot;
                  } else {
                    updatedSlots.push(newSlot);
                  }
                  form.setFieldValue("slots", updatedSlots);
                  setSlotStartTime("");
                  setEditingIndex(null);
                };
                // Edit slot
                const handleEditSlot = (idx) => {
                  setSlotStartTime(values.slots[idx].start_time);
                  setEditingIndex(idx);
                };
                // Delete slot
                const handleDeleteSlot = (idx) => {
                  const updatedSlots = values.slots.filter((_, i) => i !== idx);
                  form.setFieldValue("slots", updatedSlots);
                  if (editingIndex === idx) {
                    setSlotStartTime("");
                    setEditingIndex(null);
                  }
                };
                const formatTime = (date) => {
                  if (!date) return "";
                  const d = typeof date === "string" ? new Date(date) : date;
                  if (isNaN(d.getTime())) return "";
                  let hours = d.getHours();
                  const minutes = d.getMinutes();
                  const ampm = hours >= 12 ? "PM" : "AM";
                  hours = hours % 12;
                  hours = hours ? hours : 12; // the hour '0' should be '12'
                  const mins = minutes < 10 ? `0${minutes}` : minutes;
                  return `${hours}:${mins} ${ampm}`;
                };
                return (
                  <div>
                    <div className="flex items-end gap-2 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Time*</label>
                        <TimeInput
                          name="slot_start_time"
                          value={slotStartTime}
                          onChange={setSlotStartTime}
                          format="12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <TimeInput
                          name="slot_end_time"
                          value={slotEndTime}
                          disabled={true}
                          format="12"
                        />
                      </div>
                      <Button
                        size="sm"
                        type="button"
                        shape="circle"
                        onClick={handleAddOrUpdateSlot}
                        disabled={!slotStartTime || !slotEndTime || !templateDuration}
                      >
                        {editingIndex !== null ? "Update" : "Add Timings"}
                      </Button>
                    </div>
                    {/* Slot List */}
                    <div className="bg-white rounded shadow p-3 max-h-60 overflow-y-auto">
                      <div className="font-semibold mb-2">Scheduled Slots</div>
                      {(values.slots || []).length === 0 ? (
                        <div className="text-gray-400 text-sm">No slots added yet.</div>
                      ) : (
                        <ul>
                          {values.slots.map((slot, idx) => (
                            <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2 last:border-b-0">
                              <div className="mb-2 sm:mb-0">
                                <span className="font-bold">{formatTime(slot.start_time)}</span> - <span className="font-bold">{formatTime(slot.end_time)}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="text-blue-500 hover:text-blue-700"
                                  title="Edit"
                                  onClick={() => handleEditSlot(idx)}
                                >
                                  <FaEdit />
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete"
                                  onClick={() => handleDeleteSlot(idx)}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              }}
            </Field>
          </FormItem>
        </div>
        {type == "edit" ? (
          <div className="col-span-1">
            <FormItem
              label="Status*"
              invalid={errors.status && touched.status}
              errorMessage={errors.status}
            >
              <Field name="status">
                {({ field, form }) => (
                  <Select
                    field={field}
                    form={form}
                    required
                    options={status}
                    value={values.status}
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
        ) : null}
      </div>
    </AdaptableCard>
  );
};

export default TemplateMapInformationFields;
