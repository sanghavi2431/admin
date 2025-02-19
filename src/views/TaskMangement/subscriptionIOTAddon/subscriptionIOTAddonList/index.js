import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { LuNewspaper } from "react-icons/lu";
import reducer from "./store";
import AddOnTableSearch from "./components/subscribedIOTTableSearch";
import AddOnTools from "./components/subscribedIOTTools";
import AddOnTable from "./components/subscribedIOTList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialTableData,setTableData } from "./store/dataSlice";
injectReducer("subscribedIOTList", reducer);

function IOTDevicesList() {
  const dispatch=useDispatch()
  useEffect(()=>{
return (()=>{
  dispatch(setTableData(initialTableData))
})
  },[])
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="flex">
          <LuNewspaper size={"30"} />
          <h3 className="ml-5">Subscribed Addons</h3>
        </div>
        <AddOnTableSearch />
        <AddOnTools />
      </div>
      <div className="md:flex  justify-between pt-4 mt-8 "></div>
      <AddOnTable />
    </AdaptableCard>
  );
}
export default IOTDevicesList;
