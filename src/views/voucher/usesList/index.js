import { AdaptableCard } from "@/components/shared";
import VoucherUsesTable from "./components/voucherUsesList";
import { injectReducer } from "@/store";
import { GiTicket } from "react-icons/gi";
import reducer from "./store";
import { useLocation } from "react-router-dom";
import UsesListTools from "./components/usesListTools";
import UsageTable from "./components/monthOnMonthUsageList";
import { useSelector } from "react-redux";
import { ExportButton } from "./components/exportButton";
injectReducer("voucherusesList", reducer);

function VoucherList() {
  const location = useLocation();
  let reportType = useSelector(
    (state) => state.voucherusesList.data.reportType
  );
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex justify-between mb-4">
        <div className="flex items-center ">
          <GiTicket size={"30"} />
          <h3 className="ml-5">Voucher User List</h3>
        </div>
        {!reportType ? null : <ExportButton />}
      </div>
      <div className="lg:flex items-center mt-8 mb-4">
        <UsesListTools />
      </div>
      {!reportType ? <VoucherUsesTable /> : <UsageTable />}
    </AdaptableCard>
  );
}
export default VoucherList;
