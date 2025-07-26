import { AdaptableCard } from "@/components/shared";
import FranchiseTableSearch from "./components/franchiseTableSearch";
import FranchiseTable from "./components/franchiseList";
import { injectReducer } from "@/store";
import { FaHandshake } from "react-icons/fa"
import reducer from "./store";
import FranchiseTools from "./components/franchiseTools";
import { useDispatch } from "react-redux";
import { initialTableData, setTableData } from "./store/dataSlice";
import { useEffect } from "react";
injectReducer('franchiseList', reducer)


function FranchiseList() {
  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(setTableData(initialTableData))
    })
  }, [])
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <FaHandshake size={"30"} />
        <h3 className="ml-5">Franchise</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <FranchiseTools/>
        <FranchiseTableSearch />
      </div>
      <FranchiseTable />
    </AdaptableCard>
  );
}
export default FranchiseList;