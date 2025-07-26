import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { RiTeamFill } from "react-icons/ri";
import reducer from "./store";
import SupervisorTableSearch from "./components/supervisorTableSearch";
import SupervisorTools from "./components/supervisorTools";
import SupervisorTable from "./components/supervisorList";
import SupervisorFilterTools from "./components/supervisorFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("supervisorList", reducer);

function SupervisorList() {
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
          <RiTeamFill size={"30"} />
          <h3 className="ml-5">Supervisor</h3>
        </div>
        <SupervisorTableSearch />
        <SupervisorTools />
      </div>

      <SupervisorFilterTools />
      <SupervisorTable />
    </AdaptableCard>
  );
}
export default SupervisorList;
