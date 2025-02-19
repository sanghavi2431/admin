import React from "react";
import classNames from "classnames";
import { Segment } from "@/components/ui";
import { HiCheckCircle } from "react-icons/hi";
import isLastChild from "@/utils/isLastChild";

const BoardTools = ({ onfilterChange, type }) => {
  return (
    <Segment className="flex justify-end" size="sm"  onChange={onfilterChange}
    value={type}>
       <Segment.Item value="today" >Today</Segment.Item>
        <Segment.Item value="last_7_days">Last 7 days</Segment.Item>
        <Segment.Item value="past_3_months">Last 3 months</Segment.Item>
        {/* <Segment.Item value="month">Current Month</Segment.Item>
        <Segment.Item value="previousMonth">Previous Month</Segment.Item> */}
    </Segment>
  );
};

export default BoardTools;
