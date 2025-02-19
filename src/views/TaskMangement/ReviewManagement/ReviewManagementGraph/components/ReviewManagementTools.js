import React from "react";
import { Segment } from "@/components/ui";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const IotTools = ({ onfilterChange, type }) => {
  return (
    // <div className="flex md:justify-between md:flex-row flex-col">

      <div>
        <Segment
        size="sm"
          className="flex md:justify-end mb-4 md:flex-row gap-2 flex-col md:gap-0 "
          onChange={onfilterChange}
          value={type}
        >
          <Segment.Item value="today">Today</Segment.Item>
          <Segment.Item value="week">Current Week</Segment.Item>
          <Segment.Item value="curr_month">Current Month</Segment.Item>
          <Segment.Item value="past_week">Past Week</Segment.Item>
          <Segment.Item value="past_month">Previous Month</Segment.Item>
        </Segment>
      </div>
    // </div>
  );
};

export default IotTools;
