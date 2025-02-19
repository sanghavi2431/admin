import React, { useEffect, useRef, useState } from "react";
import { Segment } from "@/components/ui";
import { Link } from "react-router-dom";
import { Button, RangeCalendar } from "@/components/ui";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getIOTData, setPayload } from "../store/dataSlice";
import { setType, setDashboardType } from "../store/dataSlice";

const IotTools = ({ type, dashboardType }) => {
  // const [dashboardType, setDashboardType] = useState("iot");
  const popoverRef = useRef(null);
  const dispatch = useDispatch();
  const [calenderDate, setCalenderDate] = useState("");
  const [calenderShow, setCalenderShow] = useState(false);
  let payload = useSelector((state) => state.iotData.data.payload);

  useEffect(() => {
    if (type == "custom") setCalenderShow(true);
    else {
      setCalenderShow(false);
      setCalenderDate("");
    }
    return () => {
      setCalenderShow(false);
      setCalenderDate("");
    };
  }, [type]);

  function onCalenderClose() {
    setCalenderShow(false);
    let start_date = "";
    let end_date = "";
    let payloadData = cloneDeep(payload);
    payloadData.type = "custom";
    if (calenderDate?.[1] && calenderDate?.[0]) {
      start_date = dayjs(calenderDate[0]).format("YYYY-MM-DD");
      end_date = dayjs(calenderDate[1]).format("YYYY-MM-DD");
      payloadData.start_date = start_date;
      payloadData.end_date = end_date;
      dispatch(getIOTData(payloadData));
      dispatch(setPayload(payloadData));
      dispatch(setType("custom"));
    } else if (calenderDate?.[0]) {
      start_date = dayjs(calenderDate[0]).format("YYYY-MM-DD");
      end_date = dayjs(calenderDate[0]).format("YYYY-MM-DD");
      payloadData.start_date = start_date;
      payloadData.end_date = end_date;
      dispatch(getIOTData(payloadData));
      dispatch(setPayload(payloadData));
      dispatch(setType("custom"));
    }
  }
  const today = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(today.getMonth() - 3);
  return (
    <div className="flex gap-3 xl:flex-row justify-between itmes-center pb-5 mt-2">
      <div className="">
        <Segment
          className="flex md:flex-row gap-2 flex-col md:gap-0"
          onChange={(value) => {
            dispatch(setDashboardType(value[0]));
          }}
          value={dashboardType}
          size="sm"
        >
          <Segment.Item
            value="iot"
            style={{
              background: `${dashboardType === "iot" ? "#00C3DE" : ""}`,
            }}
          >
            IoT
          </Segment.Item>
          <Segment.Item
            value="task"
            style={{
              background: `${dashboardType === "task" ? "#00C3DE" : ""}`,
            }}
          >
            Task
          </Segment.Item>
          <Segment.Item
            value="review"
            style={{
              background: `${dashboardType === "review" ? "#00C3DE" : ""}`,
            }}
          >
            Review
          </Segment.Item>
        </Segment>
      </div>

      <div>
        <Segment
          className="flex md:flex-row gap-2 flex-col md:gap-0 "
          onChange={(val) => dispatch(setType(val[0]))}
          onClick={(e) => {
            console.log("clicked", e.target.innerText);
            if (e.target.innerText == "Custom") setCalenderShow(true);
          }}
          value={type}
          size="sm"
        >
          <Segment.Item
            value="today"
            style={{
              background: `${type === "today" ? "#00C3DE" : ""}`,
            }}
          >
            Today
          </Segment.Item>
          <Segment.Item
            value="last_7_days"
            style={{
              background: `${type === "last_7_days" ? "#00C3DE" : ""}`,
            }}
          >
            Last 7 Days
          </Segment.Item>
          <Segment.Item
            value="custom"
            style={{
              background: `${type === "custom" ? "#00C3DE" : ""}`,
            }}
          >
            Custom
          </Segment.Item>
        </Segment>
        {
          <span className="font-thin text-red-500">
            {type == "custom" && calenderDate?.[0]
              ? "(" +
                dayjs(calenderDate[0]).format("DD/MM/YYYY") +
                "  - " +
                (calenderDate?.[1] == null
                  ? dayjs(calenderDate[0]).format("DD/MM/YYYY")
                  : dayjs(calenderDate[1]).format("DD/MM/YYYY")) +
                ")"
              : null}
          </span>
        }
        {calenderShow ? (
          <div
            ref={popoverRef}
            className=" box-border border-2 drop-shadow-md  bg-white h-78 w-78 p-4  absolute right-6 z-50"
          >
            <div className="w-[520px] mx-auto z-50">
              <RangeCalendar
                maxDate={today}
                minDate={twoMonthsAgo}
                dateViewCount={2}
                value={calenderDate}
                onChange={(date) => {
                  setCalenderDate(date);
                }}
              />
            </div>
            <div className="flex justify-end mt-2">
              <div className="mr-2">
                <Button
                  size="sm"
                  className="text-gray-800"
                  type="button"
                  onClick={() => onCalenderClose()}
                >
                  Ok
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default IotTools;
