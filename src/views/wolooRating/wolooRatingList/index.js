import { AdaptableCard } from "@/components/shared";
import WolooRatingTableSearch from "./components/wolooRatingTableSearch";
import WolooRatingTable from "./components/wolooRatingList";
import { injectReducer } from "@/store";                                                                                                                                                                                                                                                                                                
import {AiOutlineStar} from "react-icons/ai";
import reducer from "./store";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
import { useDispatch } from "react-redux";
injectReducer('WolooRatingList', reducer)

function WoloosUserRatingList() {

  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(setTableData(initialTableData))
    })
  }, [])
  
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex items-center justify-between mb-6">
        <div className="flex items-center mb-4">
          <AiOutlineStar size={"30"} />
          <h3 className="ml-5">Woloo Ratings</h3>
        </div>
          <WolooRatingTableSearch />
      </div>
      <WolooRatingTable />
    </AdaptableCard>
  );
}
export default WoloosUserRatingList;