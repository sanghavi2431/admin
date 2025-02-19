import { AdaptableCard } from "@/components/shared";
import WoloosTable from "./components/woloosList";
import WoloosTools from "./components/wolooTools";
import WoloosTableSearch from "./components/wolooTableSearch";
import { injectReducer } from "@/store";
import { HiMenu } from "react-icons/hi";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { initialTableData, setTableData } from "./store/dataSlice";
import { useEffect } from "react";
injectReducer('woloosList', reducer)

function WoloosList() {
  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(setTableData(initialTableData))
    })
  })
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <HiMenu size={"30"} />
        <h3 className="ml-5">Woloo Host</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <WoloosTools />
        <WoloosTableSearch />
        
      </div>
      <WoloosTable />
    </AdaptableCard>
  );
}
export default WoloosList;
