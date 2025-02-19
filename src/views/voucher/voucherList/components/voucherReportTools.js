import React, { useState, useRef } from "react";
import {
  Button,
  RangeCalendar,
  FormItem,
  FormContainer,
} from "@/components/ui";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Select } from "@/components/ui";
import { AiOutlineSearch } from "react-icons/ai";
import dayjs from "dayjs";
import { getVoucher, setTableData } from "../store/dataSlice";
import { useSelector } from "react-redux";
import { cloneDeep } from "lodash";

const VoucherReportTools = ({resetData}) => {
  const dispatch = useDispatch();
  const popoverRef = useRef(null);
  // const status = [
  //   { label: "All", value: "" },
  //   { label: "ACTIVE", value: 1 },
  //   { label: "INACTIVE", value: 0 },
  // ];
  // const subscriptionType = [
  //   { label: "Paid", value: "1" },
  //   { label: "Voucher", value: "0" },
  // ];
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
  let tableData = useSelector((state) => state.voucherList.data.tableData);

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
        expiryDate: "",
        calenderDate: "",
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
          column: "expiry",
          value: [],
        };

        if (values.expiryDate.value !== 7 && values.expiryDate !== "") {
          fromDate = dayjs(expiryRange[0]).format("YYYY-MM-DD");
          toDate = dayjs(expiryRange[1]).format("YYYY-MM-DD");
        } else if (values.expiryDate === "") {
          fromDate = "";
          toDate = "";
        } else {
          fromDate = dayjs(values.calenderDate[1]).format("YYYY-MM-DD");
          toDate = dayjs(values.calenderDate[0]).format("YYYY-MM-DD");
        }

        DateObject.value.push(toDate);
        DateObject.value.push(fromDate);

        if (fromDate && toDate) {
          filterData.push(DateObject);
        }

        newTableData.pageIndex = pageIndex;
        newTableData.pageSize = pageSize;
        newTableData.filterType = filterData;
        dispatch(setTableData(newTableData));
        dispatch(getVoucher(newTableData));
      }}
    >
      {({ values }) => (
        <Form>
          <FormContainer className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10">
            <div className="">
              <FormItem label="Expiry Date Range">
                <Field name="expiryDate">
                  {({ field, form }) => (
                    <Select
                      field={field}
                      form={form}
                      size="xs"
                      // required
                      options={dateRange}
                      value={values.expiryDate}
                      onChange={(option) =>
                        option
                          ? (form.setFieldValue(field.name, {
                              label: option.label,
                              value: option.value,
                            }),
                            option.value === 1
                              ? setExpiryRange(todayDate())
                              : "",
                            option.value === 2
                              ? setExpiryRange(yesterdayDate())
                              : "",
                            option.value === 3
                              ? setExpiryRange(substractDays(7))
                              : "",
                            option.value === 4
                              ? setExpiryRange(substractDays(30))
                              : "",
                            option.value === 6
                              ? setExpiryRange(lastMonth())
                              : "",
                            option.value === 5
                              ? setExpiryRange(currentMonth())
                              : "",
                            option.value === 7
                              ? setCalenderShow(true)
                              : setCalenderShow(false))
                          : form.setFieldValue(field.name, {})
                      }
                    />
                  )}
                </Field>
                {values.expiryDate.value !== 7 ? (
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
                className="text-gray-800 "
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

export default VoucherReportTools;
