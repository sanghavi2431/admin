import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { LuNewspaper } from "react-icons/lu";
import reducer from "./store";
import PlanTableSearch from "./components/planTableSearch";
import PlanTools from "./components/planTools";
import PlanList from "./components/planList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialTableData,setTableData } from "./store/dataSlice";
injectReducer("planList", reducer);

function SubscriptionPlanList() {
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
          <h3 className="ml-5">Plans</h3>
        </div>
        <PlanTableSearch />
        <PlanTools />
      </div>
      <div className="md:flex  justify-between pt-4 mt-8 "></div>
      <PlanList />
    </AdaptableCard>
  );
}
export default SubscriptionPlanList;
