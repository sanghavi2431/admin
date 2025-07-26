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
import { getCustomerHistory, setTableData } from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import {
  getPointsSource,
  getUsersList,
} from "@/services/customerHistoryReportService";

const CustomerHistoryTools = ({resetData}) => {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const type = [
    { label: "Gift Points", value: 1 },
    { label: "Woloo Points", value: 0 },
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
  const [is_gift, setIs_gift] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const [calenderShow, setCalenderShow] = useState(false);
  const [expiryRange, setExpiryRange] = useState("");
  let tableData = useSelector((state) => state.customerHistory.data.tableData);

  const loadCategory = async () => {
    let data = { is_gift: is_gift };
    let response = await getPointsSource(data);
    setCategoryList(response.data.results.data);
    return response.data.results.data;
  };
  const loadUsers = async () => {
    let response = await getUsersList();
    return response.data.results.data;
  };
  useEffect(() => {
    loadCategory();
  }, [is_gift]);

  useEffect(() => {
    setExpiryRange(currentMonth());
  }, []);

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

  return (
    <Formik
      initialValues={{
        type: { label: "Woloo Points", value: 0 },
        users: "",
        expiryDate: { label: "This Month", value: 5 },
        calenderDate: "",
        pincode: "",
        pointsSource: "",
      }}
      enableReinitialize
      onSubmit={async (values) => {
        let fromDate = "";
        let toDate = "";
        let filterData = [];
        let pageIndex = 1;
        let pageSize = 10;
        let newTableData = cloneDeep(tableData);

        let DateObject = {
          type: "date",
          column: "created_at",
          value: [],
        };
        let typeObject = {
          type: "string",
          column: "is_gift",
          value: 0,
        };
        let pointSourceObject = {
          type: "string",
          column: "type",
          value: "",
        };
        let pincodeObject = {
          type: "string",
          column: "pincode",
          value: "",
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

        DateObject.value.push(toDate);
        DateObject.value.push(fromDate);
        pointSourceObject.value = values.pointsSource.label;
        typeObject.value = values.type.value;
        pincodeObject.value = values.pincode;

        if (fromDate && toDate) {
          filterData.push(DateObject);
        }
        if (values.pincode != "") {
          filterData.push(pincodeObject);
        }
        if (values.type != "") {
          filterData.push(typeObject);
        }
        newTableData.query = "";

        if (values.users != "") {
          newTableData.query = values.users;
        }
        if (values.pointsSource != "") {
          filterData.push(pointSourceObject);
        }

        newTableData.pageIndex = pageIndex;
        newTableData.pageSize = pageSize;
        newTableData.filterType = filterData;
        dispatch(setTableData(newTableData));
        dispatch(getCustomerHistory(newTableData));
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3 my-10">
            <div className="">
              <FormItem label="Points Type">
                <Field name="type">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      // required
                      options={type}
                      value={values.type}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            setIs_gift(option.value),
                            form.setFieldValue("pointsSource", ""))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
              </FormItem>
            </div>
            <div className="">
              <FormItem label="Points Source">
                <Field name="pointsSource">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="sm"
                      options={categoryList}
                      value={values.pointsSource}
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
              <FormItem label="Customer Name">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="users"
                  value={values.users || ""}
                  component={Input}
                  placeholder="Name"
                />
              </FormItem>
            </div>

            <div className="">
              <FormItem label="Redemption Date Range">
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
                      <div className="">
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
            <div className="">
              <FormItem label="Pincode">
                <Field
                  type="text"
                  size="sm"
                  autoComplete="off"
                  name="pincode"
                  value={values.pincode || ""}
                  component={Input}
                  placeholder="Pincode"
                />
              </FormItem>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:mt-7">
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

export default CustomerHistoryTools;
