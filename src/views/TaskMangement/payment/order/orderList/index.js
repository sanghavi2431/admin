import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import reducer from "./store";
import OrderTable from "./components/orderList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialTableData,setTableData } from "./store/dataSlice";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
injectReducer("orderList", reducer);

function OrderList() {
  const dispatch=useDispatch()
  useEffect(()=>{
return (()=>{
  dispatch(setTableData(initialTableData))
})
  },[])
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex mb-8">
          <BiSolidPurchaseTagAlt size={"30"} />
          <h3 className="ml-5">Orders</h3>
        </div>
      <OrderTable />
    </AdaptableCard>
  );
}
export default OrderList;
