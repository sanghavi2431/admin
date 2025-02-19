import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {BsCheckSquareFill} from 'react-icons/bs'
import reducer from "./store";
import TaskchecklistTableSearch from "./components/task_checklistTableSearch";
import TaskchecklistTools from "./components/task_checklistTools";
import TaskChecklistTable from "./components/task_checklist";
import ChecklistFilterTools from "./components/task_checklistFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("taskchecklist", reducer);

function TaskChecklistList() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setTableData(initialTableData));
    };
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="flex">
          <BsCheckSquareFill size={"25"} />
          <h3 className="ml-5">Task checklist</h3>
        </div>
        <TaskchecklistTableSearch />
        <TaskchecklistTools />
      </div>
      <ChecklistFilterTools/>
      <TaskChecklistTable />
    </AdaptableCard>
  );
}
export default TaskChecklistList;
