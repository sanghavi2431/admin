import { AdaptableCard } from "@/components/shared";
import VoucherReportTable from "./components/voucherReportList";
import { injectReducer } from "@/store";
import reducer from "./store";
import VoucherReportTools from "./components/voucherReportTools";
injectReducer('voucherReportList', reducer)


function SubscriptionReportList() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="mb-4">
        {/* <BiTransfer size={"30"} /> */}
        <h3 >Voucher Report</h3>
        {/* <p className="font-bold mt-4 w-9/12">
          A user subscription report is a summary that provides information about the subscription/voucher status of individual users within Woloo application. It typically includes details such as the user's name, email address, subscription plan, subscription start and end date, renewal status, and any applicable transactions.
        </p> */}
      </div>
      <div className="lg:flex items-center mt-4 mb-4">
      </div>
      <div className="lg:flex items-center justify-between pt-4 mt-4 mb-5">
        <VoucherReportTools />
      </div>
      <VoucherReportTable />
    </AdaptableCard>
  );
}
export default SubscriptionReportList;