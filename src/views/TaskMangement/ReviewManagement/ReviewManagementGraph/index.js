import { AdaptableCard } from "@/components/shared";
// import TransactionTable from "./components/transactionList";
import { injectReducer } from "@/store";
import { FaUsers } from "react-icons/fa";
import ReviewManagementFilterTools from "./components/ReviewManagementFilterTools";
import reducer from "./store";
import ReviewManagementGraph from "./components/ReviewManagementGraph";
import { AiOutlineStar } from "react-icons/ai";

injectReducer("reviewData", reducer);

function ReviewManagementData() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-start md:justify-start mb-8 flex-col">
      <div className="flex mb-4">
          <AiOutlineStar size={"30"} />
          <h3 className="ml-5">Review Management</h3>
        </div>
      <div className="w-full border-b-2">
        <ReviewManagementFilterTools />
        </div>
      </div>
      <ReviewManagementGraph />
    </AdaptableCard>
  );
}
export default ReviewManagementData;
