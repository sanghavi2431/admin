import React from 'react';
import { Segment } from "components/ui";
import { useDispatch } from "react-redux";
import { setDashboardType } from "../store/dataSlice";

const DashboardTypeSegment = ({ dashboardType }) => {
  const dispatch = useDispatch();

  return (
    <Segment
      className="flex md:flex-row gap-2 flex-col md:gap-0 shadow-xl rounded-full"
      onChange={(value) => dispatch(setDashboardType(value[0]))}
      value={dashboardType}
      size="lg"
    >
      <Segment.Item
        value="iot"
        style={{ background: `${dashboardType === "iot" ? "#00C3DE" : ""}` }}
        className="rounded-full"
      >
        IoT
      </Segment.Item>
      <Segment.Item
        value="task"
        style={{ background: `${dashboardType === "task" ? "#00C3DE" : ""}` }}
      >
        Task
      </Segment.Item>
      <Segment.Item
        value="review"
        style={{ background: `${dashboardType === "review" ? "#00C3DE" : ""}` }}
        className="rounded-full"
      >
        Review
      </Segment.Item>
    </Segment>
  );
};

export default DashboardTypeSegment;
