import { AdaptableCard } from "@/components/shared";
import OwnerWiseHistoryTable from "./components/ownerWiseHistoryList";
import { injectReducer } from "@/store";
import reducer from "./store";
import OwnerWiseHistoryTools from "./components/ownerWiseHistoryTools";
import { ExportButton } from "./components/exportButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("ownerWiseHistoryList", reducer);

function UserReportList() {
  const dispatch = useDispatch()
  useEffect(() => {
    return (() => {
      dispatch(setTableData(initialTableData))
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className=" flex justify-between mb-4">
        <h3>Referrer / User History Report</h3>
        <ExportButton />
      </div>
      <div className="mb-4">
        <OwnerWiseHistoryTools />
      </div>
      <OwnerWiseHistoryTable />
    </AdaptableCard>
  );
}
export default UserReportList;
