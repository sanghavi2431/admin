import React, { useEffect } from "react";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { injectReducer } from "@/store/index";
import { Container } from "@/components/shared";
import BoardTools from "./BoardTools";
import BoardFilterTools from "./BoardFilterTools";
import TaskDashboardGraph from "./TaskDashboardGraph";
import {
  getBoards,
  setPayload,
  setTaskDashboardData,
  setType,
} from "./store/dataSlice";
import { cloneDeep } from "lodash";

injectReducer("scrumBoard", reducer);

const ScrumBoard = (props) => {
  const dispatch = useDispatch();
  const payload = useSelector((state) => state.scrumBoard.data?.payload);
  const type = useSelector((state) => state.scrumBoard.data?.type);
  const taskDashboardData = useSelector((state) => state.scrumBoard.data?.taskDashboardData);
  
  const onfilterChange = async (val) => {  
    dispatch(setType(val));
  };
  
  const fetchData = async (data) => {  
    dispatch(setTaskDashboardData({}));
    let payloadData = cloneDeep(payload);
    payloadData && dispatch(getBoards(data));
  };
  
  useEffect(() => {
    let data = { type: type?.[0] };
    let payloadData = cloneDeep(payload);
    if (payloadData) {
      payloadData.type = type?.[0];
    }
    data = payloadData ? payloadData : data;
    fetchData(data);
  }, [type, payload]);
  
  useEffect(() => {
    return () => {
      dispatch(setTaskDashboardData({}));
      dispatch(setPayload(""));
    };
  }, []);

  return (
    <>
      <div className="w-full border-b-2">
        <BoardFilterTools />
      </div>
      {/* <div className="w-full mt-2 flex items-end justify-end">
        <Segment
          className="flex md:flex-row gap-2 flex-col md:gap-0  "
          // onChange={onfilterChange}
          // value={type}
          size="sm"
        >
          <Segment.Item value="today">Today</Segment.Item>
          <Segment.Item value="week">Current Week</Segment.Item>
        </Segment>
      </div> */}
      <div className=" mt-4 mb-4">
        <BoardTools onfilterChange={onfilterChange} type={type} />
      </div>
      <Container className="h-full">
        {/* <SummaryCards /> */}
        {/* <Board {...props} /> */}
        <TaskDashboardGraph />
      </Container>
    </>
  );
};

export default ScrumBoard;
