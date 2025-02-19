import { AdaptableCard } from "@/components/shared";
import VoucherTools from "./components/voucherTools";
import VoucherTable from "./components/voucherList";
import { injectReducer } from "@/store";
import { GiTicket } from "react-icons/gi";
import reducer from "./store";
import VoucherReportTools from "./components/voucherReportTools";
import { ExportButton } from "./components/exportButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("voucherList", reducer);

function VoucherList() {
  const dispatch = useDispatch();
  const resetData = () => dispatch(setTableData(initialTableData));
  useEffect(() => {
    return (() => {
      resetData();
    })
  });
  
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center ">
          <GiTicket size={"30"} />
          <h3 className="ml-5">Voucher Codes</h3>
        </div>
        <ExportButton />
      </div>
      <div className="md:flex my-10">
        <VoucherTools />
      </div>
      <VoucherReportTools resetData={resetData} />
      <VoucherTable />
    </AdaptableCard>
  );
}
export default VoucherList;
