import React, { useEffect, useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select, Button } from "@/components/ui";
import { Field } from "formik";
import { getClientTypes } from "@/services/taskManagement/clientService";
import { getClients, getLocations } from "@/services/taskManagement/blockService";
import { getBlocks } from "@/services/taskManagement/facilitiesService";
import AsyncSelect from "react-select/async";
import { useDispatch, useSelector } from "react-redux";
import { getShifts, getTasksByCategory } from "../store/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const status = [
  { label: "ACTIVE", value: true },
  { label: "INACTIVE", value: false },
];
export const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 },
];

export const templateCategories = [
  { label: "Home", value: "Home" },
  { label: "Office", value: "Office" },
  { label: "Restaurant", value: "Restaurant" },
  { label: "Others", value: "Others" },
];

const TaskInformationFields = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { values, touched, errors, type, id } = props;
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  let tasksCheckList = useSelector(
    (state) => state.taskAddForm.data.tasksCheckList
  );
  let shifts = useSelector((state) => state.taskAddForm.data.shifts);
  const [locations, setLocations] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [client_id, setClient_id] = useState(values?.client_name?.value);
  const [location_id, setLocation_id] = useState(values?.location_name?.value);
  // const [block_id, setBlock_id] = useState(values?.block_name?.value);
  const [template_category, setTemplate_category] = useState(values?.template_category?.value);

  useEffect(() => {
    if (client_id && template_category) {
      dispatch(getTasksByCategory({
        category: template_category,
        client_id
      }));
    }
  }, [client_id, template_category]);
  useEffect(() => {
    let data = { location_id: location_id, status: true }
    dispatch(getShifts(data));
  }, [client_id, location_id]);
  const loadClients = async () => {
    let data = { status: true }
    let response = await getClients(data);
    return response.data.results;
  };
  const loadLocations = async (client_id) => {
    let data = { id: client_id, status: true };
    let response = "";
    try {
      response = await getLocations(data);
    }
    catch (err) {
    }
    setLocations(response?.data?.results);
  };
  const loadBlocks = async (client_id, location_id) => {
    let data = { client_id: client_id, location_id: location_id };
    try {
      const response = await getBlocks(data);
      setBlocks(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadLocations(client_id);
  }, [client_id]);

  useEffect(() => {
    loadBlocks(client_id, location_id);
  }, [location_id]);

  // Add effect to auto-calculate estimated time
  useEffect(() => {
    if (values.task_ids && Array.isArray(values.task_ids) && values.task_ids.length > 0) {
      // Each selected task in task_ids should have a value (id) and estimated_time (or required_time)
      // Find the corresponding task in tasksCheckList and sum their estimated_time
      let total = 0;
      values.task_ids.forEach((selected) => {
        // Find the task in tasksCheckList by value
        const found = tasksCheckList.find((t) => t.value === selected.value);
        if (found && found.estimated_time) {
          total += Number(found.estimated_time);
        } else if (found && found.required_time) {
          total += Number(found.required_time);
        }
      });
      if (values.estimated_time !== total) {
        // Only update if changed to avoid infinite loop
        props.setFieldValue && props.setFieldValue("estimated_time", total);
      }
    } else {
      if (values.estimated_time !== "" && values.estimated_time !== 0) {
        props.setFieldValue && props.setFieldValue("estimated_time", 0);
      }
    }
  }, [values.task_ids, tasksCheckList]);


  let data = location?.state ? { ...location?.state, "task_template": { "id": id, "page": type } } : { "task_template": { "id": id, "page": type } }

  return (
    <AdaptableCard className="mb-4">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-4 gap-y-7 ">
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
                  // options={clientType}
                  isDisabled={loggedInClient ? true : false}
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
                        setLocation_id(""),
                        form.setFieldValue("location_name", ""),
                        form.setFieldValue("shift_ids", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
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
                        form.setFieldValue("shift_ids", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
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
                        // setBlock_id(option.value),
                        form.setFieldValue("facility", ""))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Template Name*"
            invalid={errors.template_name && touched.template_name}
            errorMessage={errors.template_name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="template_name"
              value={values.template_name || ""}
              component={Input}
              placeHolder="Template Name"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Template Category*"
            invalid={errors.template_category && touched.template_category}
            errorMessage={errors.template_category}
          >
            <Field name="template_category">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={templateCategories}
                  isDisabled={!values.client_name.value}
                  value={values.template_category}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      }),
                        setTemplate_category(option.value),
                        form.setFieldValue("task_ids", [])
                      )
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <div className="">
            <FormItem
              label="Task Checklist*"
              invalid={errors.task_ids && touched.task_ids}
              errorMessage={errors.task_ids}
            >
              <Field name="task_ids">
                {({ field, form }) => (
                  <Select
                    isMulti
                    field={field}
                    form={form}
                    required
                    options={tasksCheckList}
                    value={values.task_ids}
                    isDisabled={!values?.template_category?.value}
                    onChange={(option) =>
                      option
                        ? form.setFieldValue(field.name, option)
                        : form.setFieldValue(field.name, {})
                    }
                  />
                )}
              </Field>
            </FormItem>
            <Button size="xs" className="mt-6" onClick={() => navigate(`/task_checklist-AddNew`, { state: { ...data, task_temp_data: { ...values } } })}>Add Task</Button>
          </div>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Description*"
            invalid={errors.description && touched.description}
            errorMessage={errors.description}
          >
            <Field
              type="text"
              autoComplete="off"
              name="description"
              value={values.description || ""}
              component={Input}
              placeHolder="Description"
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Estimated Time(in minutes)*"
            invalid={errors.estimated_time && touched.estimated_time}
            errorMessage={errors.estimated_time}
          >
            <Field
              type="text"
              autoComplete="off"
              name="estimated_time"
              value={values.estimated_time || ""}
              component={Input}
              placeHolder="0"
              disabled={true}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Day*"
            invalid={errors.days && touched.days}
            errorMessage={errors.days}
          >
            <Field name="days">
              {({ field, form }) => (
                <Select
                  isMulti
                  field={field}
                  form={form}
                  required
                  options={days}
                  value={values.days}
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
                  isDisabled={!values.location_name}
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
        </div>
        {type == "edit" ? (
          <div className="col-span-1">
            <FormItem
              label="Status*"
              invalid={errors.days && touched.status}
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

export default TaskInformationFields;
