import { AdaptableCard } from "@/components/shared";
import SubscriptionReportTable from "./components/subscriptionReportList";
import { injectReducer } from "@/store";
import reducer from "./store";
import SubscriptionReportTools from "./components/subscriptionReportTools";
import { ExportButton } from "./components/exportButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer('subscriptionReportList', reducer)


function SubscriptionReportList() {
  const dispatch = useDispatch()
  const resetData = () => dispatch(setTableData(initialTableData));
  useEffect(() => {
    return (() => {
      resetData();
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="mb-4">
        {/* <BiTransfer size={"30"} /> */}
        <div className="flex justify-between">
        <h3 >Subscription Transaction Report</h3>
        <ExportButton/>
        </div>
        <p className="font-bold mt-4 md:w-9/12">
          A user subscription report is a summary that provides information about the subscription/voucher status of individual users within Woloo application. It typically includes details such as the user's name, email address, subscription plan, subscription start and end date, renewal status, and any applicable transactions.
        </p>
      </div>
      <div className="mb-4">
        <SubscriptionReportTools resetData={resetData} />
      </div>
      <SubscriptionReportTable />
    </AdaptableCard>
  );
}
export default SubscriptionReportList;