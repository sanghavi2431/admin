import React, { useState, useRef, useEffect } from "react";
import { Button, RangeCalendar, FormContainer, FormItem } from "@/components/ui";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { AiOutlineSearch } from "react-icons/ai";
import dayjs from "dayjs";
import { getTransaction, setTableData } from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const TransactionTools = ({resetData}) => {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  const status = [
    { label: "All", value: "" },
    { label: "PENDING", value: 0 },
    { label: "COMPLETED", value: 1 },
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
  const [transactionRange, setTransactionRange] = useState(["", ""]);
  let tableData = useSelector((state) => state.transactionList.data.tableData);

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

  const temp = document.createElement("span");
  temp.setAttribute("class", "ml-2");
  temp.innerHTML = "Custom Range";

  return (
    <Formik
      initialValues={{
        status: { label: "All", value: "" },
        transactionDate: "",
        calenderDate: "",
      }}
      onSubmit={async (values, { resetForm }) => {
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
        let statusObject = {
          type: "string",
          column: "status",
          value: "",
        };

        if (values.transactionDate.value != 7 && values.transactionDate != "") {
          fromDate = dayjs(transactionRange[0]).format("YYYY-MM-DD");
          toDate = dayjs(transactionRange[1]).format("YYYY-MM-DD");
        } else if (values.transactionDate == "") {
          fromDate = "";
          toDate = "";
        } else {
          fromDate = dayjs(values.calenderDate[1]).format("YYYY-MM-DD");
          toDate = dayjs(values.calenderDate[0]).format("YYYY-MM-DD");
        }
        DateObject.value.push(toDate);
        DateObject.value.push(fromDate);
        statusObject.value = values.status.value;
        if (typeof values.status.value != "string") {
          filterData.push(statusObject);
        }
        if (fromDate && toDate) {
          filterData.push(DateObject);
        }

       
        newTableData.pageIndex = pageIndex;
        newTableData.pageSize = pageSize;

        newTableData.filterType = filterData;
        dispatch(getTransaction(newTableData));
        dispatch(setTableData(newTableData));
      }}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer className="flex flex-col md:flex-row gap-3">
              <div >
                <FormItem label="Transaction Status">
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
              <div >
                <FormItem label="Transaction Date Range">
                  <Field name="transactionDate">
                    {({ field, form }) => (
                      <Select
                        field={field}
                        form={form}
                        size="sm"
                        // required
                        options={dateRange}
                        value={values.transactionDate}
                        onChange={(option) =>
                          option
                            ? (form.setFieldValue(field.name, {
                                label: option.label,
                                value: option.value,
                              }),
                              option.value == 1
                                ? setTransactionRange(todayDate())
                                : "",
                              option.value == 2
                                ? setTransactionRange(yesterdayDate())
                                : "",
                              option.value == 3
                                ? setTransactionRange(substractDays(7))
                                : "",
                              option.value == 4
                                ? setTransactionRange(substractDays(30))
                                : "",
                              option.value == 6
                                ? setTransactionRange(lastMonth())
                                : "",
                              option.value == 5
                                ? setTransactionRange(currentMonth())
                                : "",
                              option.value == 7
                                ? setCalenderShow(true)
                                : setCalenderShow(false))
                            : form.setFieldValue(field.name, {})
                        }
                      />
                    )}
                  </Field>
                  {values.transactionDate.value != 7 ? (
                    <span className="font-thin text-red-500">
                      {transactionRange[1]
                        ? "(" +
                          dayjs(transactionRange[1]).format("DD/MM/YYYY") +
                          "  - " +
                          dayjs(transactionRange[0]).format("DD/MM/YYYY") +
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
                </FormItem>
                {calenderShow ? (
                  <div
                    ref={popoverRef}
                    id="clickbox"
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
                  setTransactionRange(["", ""], setCalenderShow(false));
                  resetData();
                }
              }
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

export default TransactionTools;
