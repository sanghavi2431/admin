import React, { useState, useRef } from "react";
import { Segment, Button, RangeCalendar } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  getIOTData,
  setPayload,
  setType,
  getReviewData,
  getTaskDashboardData,
} from "../store/dataSlice";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";

const DateTypeSegment = () => {
  const dispatch = useDispatch();
  const dashboardType = useSelector(
    (state) => state.iotData.data.dashboardType
  );
  const type = useSelector((state) => state.iotData.data.type);
  const payload = useSelector((state) => state.iotData.data.payload);
  const [calenderDate, setCalenderDate] = useState("");
  const [calenderShow, setCalenderShow] = useState(false);
  const popoverRef = useRef(null);

  function onCalenderClose() {
    setCalenderShow(false);
    let start_date = "";
    let end_date = "";
    let payloadData = cloneDeep(payload);
    if (payloadData) {
      payloadData.type = "custom";
    }
    if (calenderDate?.[1] && calenderDate?.[0]) {
      start_date = dayjs(calenderDate[0]).format("YYYY-MM-DD");
      end_date = dayjs(calenderDate[1]).format("YYYY-MM-DD");
    } else if (calenderDate?.[0]) {
      start_date = dayjs(calenderDate[0]).format("YYYY-MM-DD");
      end_date = start_date;
    }
    if (start_date) {
      console.log(start_date, end_date, "start_date, end_date");
      // payloadData.start_date = start_date;
      // payloadData.end_date = end_date;
      payloadData = {
        ...payloadData,
        start_date: start_date,
        end_date: end_date,
      };
      dispatch(setPayload(payloadData));
      dispatch(setType("custom"));
      // dispatch(getIOTData(payloadData));
      switch (dashboardType) {
        case "iot":
          dispatch(getIOTData(payloadData));
          break;
        case "task":
          dispatch(getTaskDashboardData(payloadData));
          break;
        case "review":
          dispatch(getReviewData(payloadData));
          break;
        default:
          dispatch(getTaskDashboardData(payloadData));
      }
    }
  }

  const today = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(today.getMonth() - 3);

  return (
    <div>
      <Segment
        className="flex md:flex-row gap-2 flex-col md:gap-0"
        onChange={(val) => dispatch(setType(val[0]))}
        onClick={(e) => {
          // console.log("clicked", e.target.innerText);
          if (e.target.innerText === "Custom") setCalenderShow(true);
          else setCalenderShow(false);
        }}
        value={type}
        size="md"
      >
        <Segment.Item
          value="today"
          style={{ background: `${type === "today" ? "#00C3DE" : ""}` }}
          className={`rounded-lg ${type === "today" ? "shadow-inner-custom" : "shadow-custom"}`}
        >
          Today
        </Segment.Item>
        <Segment.Item
          value="last_7_days"
          style={{ background: `${type === "last_7_days" ? "#00C3DE" : ""}` }}
          className={`rounded-lg ${type === "last_7_days" ? "shadow-inner-custom" : "shadow-custom"}`}
        >
          Last 7 Days
        </Segment.Item>
        {/* <Segment.Item
          value="custom"
          style={{ background: `${type === "custom" ? "#00C3DE" : ""}` }}
          className={`rounded-lg ${type === "custom" ? "shadow-inner-custom" : "shadow-custom"}`}
        >
          Custom
        </Segment.Item> */}
      </Segment>
      <div>
        {calenderShow && (
          <div
            ref={popoverRef}
            className="box-border border-2 drop-shadow-md bg-white h-78 w-78 p-4 absolute left-6 z-50"
          >
            <RangeCalendar
              maxDate={today}
              minDate={twoMonthsAgo}
              dateViewCount={2}
              value={calenderDate}
              onChange={(date) => setCalenderDate(date)}
            />
            <div className="flex justify-end mt-2">
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
        )}
      </div>
    </div>
  );
};

export default DateTypeSegment;
