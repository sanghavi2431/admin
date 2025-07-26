import { AdaptableCard } from "@/components/shared";
import CustomerHistoryTable from "./components/customerHistoryList";
import { injectReducer } from "@/store";
import reducer from "./store";
import CustomerHistoryTools from "./components/customerHistoryTools";
import { ExportButton } from "./components/exportButton";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
import { useDispatch } from "react-redux";
injectReducer("customerHistory", reducer);

function CustomerHistoryList() {
  const dispatch = useDispatch()
  const resetData = () => dispatch(setTableData(initialTableData));
  useEffect(() => {
    return (() => {
      resetData();
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex justify-between mb-4">
        <h3>Loyalty Report</h3>
        <ExportButton />
      </div>
      <div className="mb-4">
        <CustomerHistoryTools resetData={resetData} />
      </div>
      <CustomerHistoryTable />
    </AdaptableCard>
  );
}
export default CustomerHistoryList;
