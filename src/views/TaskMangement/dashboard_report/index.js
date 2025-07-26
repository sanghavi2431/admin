import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select, Button, Input } from "@/components/ui";
import AsyncSelect from "react-select/async";
import { FormContainer, FormItem } from "@/components/ui";

const ReportFilterScreen = () => {
    const dispatch = useDispatch();
    const loggedInClient = useSelector((state) => state.auth.user.clientId);

    // Dummy loaders for dropdown data
    const loadClients = async () => {
        // Replace with API call
        return [
            { label: "Client A", value: "clientA" },
            { label: "Client B", value: "clientB" },
        ];
    };

    const loadLocations = async () => {
        return [
            { label: "Location X", value: "locationX" },
            { label: "Location Y", value: "locationY" },
        ];
    };

    const loadBuildings = async () => {
        return [
            { label: "Building 1", value: "building1" },
            { label: "Building 2", value: "building2" },
        ];
    };

    const loadFacilities = async () => {
        return [
            { label: "Facility P", value: "facilityP" },
            { label: "Facility Q", value: "facilityQ" },
        ];
    };

    const loadBooths = async () => {
        return [
            { label: "Booth 101", value: "booth101" },
            { label: "Booth 102", value: "booth102" },
        ];
    };

    const loadIoTDevices = async () => {
        return [
            { label: "Device Alpha", value: "deviceAlpha" },
            { label: "Device Beta", value: "deviceBeta" },
        ];
    };

    return (
        <Formik
            initialValues={{
                client: loggedInClient ? loggedInClient : null,
                location: null,
                building: null,
                facility: null,
                booth: null,
                iotDevice: null,
                email: "",
                phone: "",
                frequency: "daily",
            }}
            onSubmit={(values) => {
                console.log("Form Values:", values);
                alert("Your report preferences have been saved!");
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Report Preferences
                    </h2>
                    <FormContainer>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Client Dropdown */}
                            <FormItem label="Client">
                                <Field name="client">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.client}
                                            loadOptions={loadClients}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            isDisabled={loggedInClient ? true : false}
                                            onChange={(option) =>
                                                setFieldValue("client", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* Location Dropdown */}
                            <FormItem label="Location">
                                <Field name="location">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.location}
                                            loadOptions={loadLocations}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            onChange={(option) =>
                                                setFieldValue("location", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* Building Dropdown */}
                            <FormItem label="Building">
                                <Field name="building">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.building}
                                            loadOptions={loadBuildings}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            onChange={(option) =>
                                                setFieldValue("building", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* Facility Dropdown */}
                            <FormItem label="Facility">
                                <Field name="facility">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.facility}
                                            loadOptions={loadFacilities}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            onChange={(option) =>
                                                setFieldValue("facility", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* Booth Dropdown */}
                            <FormItem label="Booth">
                                <Field name="booth">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.booth}
                                            loadOptions={loadBooths}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            onChange={(option) =>
                                                setFieldValue("booth", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            {/* IoT Device Dropdown */}
                            <FormItem label="IoT Device">
                                <Field name="iotDevice">
                                    {({ field }) => (
                                        <Select
                                            field={field}
                                            value={values.iotDevice}
                                            loadOptions={loadIoTDevices}
                                            defaultOptions
                                            isSearchable
                                            cacheOptions
                                            componentAs={AsyncSelect}
                                            onChange={(option) =>
                                                setFieldValue("iotDevice", option)
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                        </div>

                        {/* Email Input */}
                        <FormItem label="Email">
                            <Field name="email">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                )}
                            </Field>
                        </FormItem>

                        {/* Phone Input */}
                        <FormItem label="Phone">
                            <Field name="phone">
                                {({ field }) => (
                                    <Input
                                        {...field}
                                        type="tel"
                                        placeholder="Enter your phone number"
                                    />
                                )}
                            </Field>
                        </FormItem>

                        {/* Frequency Radio Buttons */}
                        <div className="xl:col-span-4">
                            <FormItem label="Frequency">
                                <div className="flex space-x-4">
                                    {[
                                        { label: "Daily", value: "daily" },
                                        { label: "Weekly", value: "weekly" },
                                        { label: "Monthly", value: "monthly" },
                                    ].map((freq) => (
                                        <label
                                            key={freq.value}
                                            className="flex items-center space-x-2"
                                        >
                                            <Field
                                                type="radio"
                                                name="frequency"
                                                value={freq.value}
                                            />
                                            <span>{freq.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </FormItem>
                        </div>

                        {/* Submit Button */}
                        <div className="xl:col-span-4">
                            <Button
                                type="submit"
                                size="md"
                                variant="solid"
                                color="black"
                                className="w-full bg-[#00C3DE] hover:bg-[#00c4debd] text-gray-800"
                            >
                                Save Preferences
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default ReportFilterScreen;
