import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  RangeCalendar,
  Input,
  FormItem,
  FormContainer,
} from "@/components/ui";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { AiOutlineSearch } from "react-icons/ai";
import dayjs from "dayjs";
import {
  get_Subscription_Report,
  setTableData,
  setSubscriptionType,
} from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getCorporate } from "@/services/voucherService";
import AsyncSelect from "react-select/async";

const SubscriptionReportTools = ({resetData}) => {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const status = [
    { label: "All", value: "" },
    { label: "ACTIVE", value: 1 },
    { label: "EXPIRED", value: 0 },
  ];
  const subscriptionType = [
    { label: "Paid", value: "1" },
    { label: "Voucher", value: "0" },
  ];
  const dateRange = [
    { label: "Today", value: 1 },
    { label: "Yesterday", value: 2 },
    { label: "Last 7 Days", value: 3 },
    { label: "Last 30 Days", value: 4 },
    { label: "This Month", value: 5 },
    { label: "Last Month", value: 6 },
    { label: "Custom Range", value: 7 },
  ];
  const [calenderShow, setCalenderShow] = useState(false);
  const [expiryRange, setExpiryRange] = useState("");
  let tableData = useSelector(
    (state) => state.subscriptionReportList.data.tableData
  );
  const subscription_Type = useSelector(
    (state) => state.subscriptionReportList.data.subscriptionType
  );

  const substractDays = function (days) {
    var toDate = new Date();
    var fromDate = new Date();

    fromDate.setDate(toDate.getDate() - days);
    return [toDate, fromDate];
  };
  const todayDate = function () {
    var toDate = new Date();
    var fromDate = new Date();

    return [toDate, fromDate];
  };
  const yesterdayDate = function () {
    var toDate = new Date();
    var fromDate = new Date();
    fromDate.setDate(toDate.getDate() - 1);

    return [fromDate, fromDate];
  };
  const lastMonth = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    return [lastDay, firstDay];
  };
  const currentMonth = function () {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date();
    return [lastDay, firstDay];
  };
  const loadCorporate = async () => {
    let response = await getCorporate();
    return response.data.results.data;
  };

  // const temp = document.createElement("span");
  // temp.setAttribute('class', 'ml-2');
  // temp.innerHTML = 'Custom Range';

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (popoverRef.current && !(e.target).isEqualNode(temp) && !popoverRef.current.contains(e.target)) {
  //       setCalenderShow(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClick);
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [popoverRef]);
  return (
    <Formik
      initialValues={{
        status: { label: "All", value: "" },
        subscriptionType: { label: "Paid", value: "1" },
        expiryDate: "",
        calenderDate: "",
        corporate: "",
      }}
      onSubmit={async (values) => {
        let fromDate = "";
        let toDate = "";
        let filterData = [];
        let pageIndex = 1;
        let pageSize = 10;
        let newTableData = cloneDeep(tableData);
        let DateObject = {
          type: "date",
          column: "expiry_date",
          value: [],
        };
        let statusObject = {
          type: "string",
          column: "status",
          value: "",
        };
        let corporateObject = {
          type: "string",
          column: "corporate_id",
          value: "",
        };
        let subscriptionTypeObject = {
          type: "string",
          column: "subscription",
          value: "1",
        };

        if (values.expiryDate.value != 7 && values.expiryDate != "") {
          fromDate = dayjs(expiryRange[0]).format("YYYY-MM-DD");
          toDate = dayjs(expiryRange[1]).format("YYYY-MM-DD");
        } else if (values.expiryDate == "") {
          fromDate = "";
          toDate = "";
        } else {
          fromDate = dayjs(values.calenderDate[1]).format("YYYY-MM-DD");
          toDate = dayjs(values.calenderDate[0]).format("YYYY-MM-DD");
        }

        corporateObject.value = values.corporate.value;

        DateObject.value.push(toDate);
        DateObject.value.push(fromDate);
        statusObject.value = values.status.value;
        subscriptionTypeObject.value = values.subscriptionType.value;
        if (fromDate && toDate) {
          filterData.push(DateObject);
        }

        if (typeof values.status.value != "string") {
          filterData.push(statusObject);
        }
        filterData.push(subscriptionTypeObject);

        if (values.corporate != "") {
          filterData.push(corporateObject);
        }
        newTableData.pageIndex = pageIndex;
        newTableData.pageSize = pageSize;
        newTableData.filterType = filterData;

        dispatch(setTableData(newTableData));
        dispatch(get_Subscription_Report(newTableData));
        dispatch(setSubscriptionType(values.subscriptionType.label));
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 my-10">
            <div className="">
              <FormItem label="Subscription Status">
                {/* <FormItem label="dfghdf"> */}
                <Field name="status">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      // required
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
            <div className="">
              <FormItem label="Subscription Type">
                {/* <FormItem label="dfghdf"> */}
                <Field name="subscriptionType">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      // required
                      options={subscriptionType}
                      value={values.subscriptionType}
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

            {subscription_Type != "Paid" ? (
              <div className="">
                <FormItem label="Corporate*">
                  <Field name="corporate">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        size="sm"
                        required
                        loadOptions={loadCorporate}
                        defaultOptions
                        isSearchable={true}
                        cacheOptions={false}
                        value={values.corporate}
                        componentAs={AsyncSelect}
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
            <div className="">
              <FormItem label="Expiry Date Range">
                <div>
                  <Field name="expiryDate">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        size="sm"
                        // required
                        options={dateRange}
                        value={values.expiryDate}
                        onChange={(option) =>
                          option
                            ? (form.setFieldValue(field.name, {
                                label: option.label,
                                value: option.value,
                              }),
                              option.value == 1
                                ? setExpiryRange(todayDate())
                                : "",
                              option.value == 2
                                ? setExpiryRange(yesterdayDate())
                                : "",
                              option.value == 3
                                ? setExpiryRange(substractDays(7))
                                : "",
                              option.value == 4
                                ? setExpiryRange(substractDays(30))
                                : "",
                              option.value == 6
                                ? setExpiryRange(lastMonth())
                                : "",
                              option.value == 5
                                ? setExpiryRange(currentMonth())
                                : "",
                              option.value == 7
                                ? setCalenderShow(true)
                                : setCalenderShow(false))
                            : form.setFieldValue(field.name, {})
                        }
                      />
                    )}
                  </Field>
                  {values.expiryDate.value != 7 ? (
                    <span className="font-thin text-red-500">
                      {expiryRange[1]
                        ? "(" +
                          dayjs(expiryRange[1]).format("DD/MM/YYYY") +
                          "  - " +
                          dayjs(expiryRange[0]).format("DD/MM/YYYY") +
                          ")"
                        : null}
                    </span>
                  ) : (
                    <span className="font-thin text-red-500">
                      {" "}
                      {values.calenderDate[1] && values.calenderDate[0]
                        ? "(" +
                          dayjs(values.calenderDate[0]).format("DD/MM/YYYY") +
                          "  - " +
                          dayjs(values.calenderDate[1]).format("DD/MM/YYYY") +
                          ")"
                        : null}
                    </span>
                  )}
                </div>

                {calenderShow ? (
                  <div
                    ref={popoverRef}
                    className=" box-border border-2 drop-shadow-md  bg-white h-78 w-78 p-4  absolute "
                  >
                    <Field name="calenderDate">
                      {({ field, form }) => (
                        <div className="w-[520px] mx-auto">
                          <RangeCalendar
                            dateViewCount={2}
                            value={values.calenderDate}
                            onChange={(date) => {
                              form.setFieldValue("calenderDate", date);
                            }}
                          />
                        </div>
                      )}
                    </Field>
                    <div className="flex justify-end mt-2">
                      <div className="mr-2">
                        <Button
                          size="sm"
                          className="text-gray-800"
                          type="button"
                          onClick={() => setCalenderShow(false)}
                        >
                          close
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </FormItem>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:mt-[1.95rem]">
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
                  setExpiryRange(["", ""], setCalenderShow(false));
                  resetData();
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

export default SubscriptionReportTools;
