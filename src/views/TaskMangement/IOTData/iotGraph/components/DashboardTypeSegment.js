import React from 'react';
import { Segment } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardType } from "../store/dataSlice";

const DashboardTypeSegment = ({ dashboardType, dashboardSize }) => {
  const dispatch = useDispatch();
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);

  return (
    <Segment
      className="flex md:flex-row gap-2 flex-col md:gap-0"
      onChange={(value) => dispatch(setDashboardType(value[0]))}
      value={dashboardType}
      size={dashboardSize}
    >
      <Segment.Item
        value="task"
        style={{ background: `${dashboardType === "task" ? "#00C3DE" : ""}` }}
        className={`rounded-lg ${dashboardType === "task" ? "shadow-inner-custom" : "shadow-custom"}`}
      >
        Task
      </Segment.Item>
      <Segment.Item
        value="iot"
        style={{ background: `${dashboardType === "iot" ? "#00C3DE" : ""}` }}
        className={`rounded-lg ${dashboardType === "iot" ? "shadow-inner-custom" : "shadow-custom"}`}
      >
        IoT
      </Segment.Item>
      <Segment.Item
        value="review"
        style={{ background: `${dashboardType === "review" ? "#00C3DE" : ""}` }}
        className={`rounded-lg ${dashboardType === "review" ? "shadow-inner-custom" : "shadow-custom"}`}
      >
        Review
      </Segment.Item>
    </Segment>
  );
};

export default DashboardTypeSegment;
