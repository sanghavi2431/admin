import { AdaptableCard } from "@/components/shared";
import OwnerHistoryTable from "./components/ownerHistoryList";
import { injectReducer } from "@/store";
import reducer from "./store";
import OwnerHistoryTools from "./components/ownerHistoryTools";
import { ExportButton } from "./components/exportButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("ownerHistoryList", reducer);

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
        <h3>Referrer Report </h3>
        <ExportButton />
      </div>

      <div className="mb-0">
        <OwnerHistoryTools />
      </div>
      <OwnerHistoryTable />
    </AdaptableCard>
  );
}
export default UserReportList;
