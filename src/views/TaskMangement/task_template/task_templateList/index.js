import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {MdFactCheck} from 'react-icons/md'
import reducer from "./store";
import TemplateTableSearch from "./components/task_templateTableSearch";
import TemplateTools from "./components/task_templateTools";
import TemplateTable from "./components/task_templateList";
import TemplateFilterTools from "./components/task_templateFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("tempList", reducer);

function TaskTemplateList() {
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
          <MdFactCheck size={"30"} />
          <h3 className="ml-5">Task Template</h3>
        </div>
        <TemplateTableSearch />
      <TemplateTools />
      </div>
      <TemplateFilterTools/>
      <TemplateTable />
    </AdaptableCard>
  );
}
export default TaskTemplateList;
