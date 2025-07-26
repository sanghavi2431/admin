import { AdaptableCard } from "@/components/shared";
import UserReportTable from "./components/userReportList";
import { injectReducer } from "@/store";
import reducer from "./store";
import UserReportTools from "./components/userReportTools";
import { ExportButton } from "./components/exportButton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer('userReportList', reducer)


function UserReportList() {
  const dispatch = useDispatch()
  const resetData = () => dispatch(setTableData(initialTableData));
  useEffect(() => {
    return (() => {
      resetData();
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className=" mb-4">
        <div className="flex justify-between">
        <h3 >User Referral and Subscription Report</h3>
        <ExportButton/>
        </div>
        <p className="font-bold mt-4 md:w-9/12">
        A user report is a document or summary that provides information about an individual user's activity, behavior, or performance within a Woloo application. It can include details such as registration details, subscription status and other relevant data.
        </p>
      </div>
      <div className="">
        <UserReportTools resetData={resetData} />
      </div>
      <UserReportTable />
    </AdaptableCard>
  );
}
export default UserReportList;