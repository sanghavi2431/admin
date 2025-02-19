import { AdaptableCard } from "@/components/shared";
import TransactionTable from "./components/transactionList";
import { injectReducer } from "@/store";
import { BiTransfer } from "react-icons/bi";
import reducer from "./store";
import TransactionTableSearch from "./components/transactionTableSearch";
import TransactionTools from "./components/transactionTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("transactionList", reducer);

function TransactionList() {
  const dispatch = useDispatch()
  const resetData = () => dispatch(setTableData(initialTableData));
  useEffect(() => {
    return (() => {
      resetData();
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <BiTransfer size={"30"} />
        <h3 className="ml-5">Transaction</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:items-end justify-between my-10">
        <TransactionTools resetData={resetData} />
        <TransactionTableSearch />
      </div>
      <TransactionTable />
    </AdaptableCard>
  );
}
export default TransactionList;
