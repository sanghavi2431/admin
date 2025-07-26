import { AdaptableCard } from "@/components/shared";
import UsersTools from "./components/corporatesTools";
import CorporatesTableSearch from "./components/corporatesTableSearch";
import UsersTable from "./components/corporatesList";
import { injectReducer } from "@/store";
import { HiBuildingOffice2 } from "react-icons/hi2";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("corporatesList", reducer);

function CorporateList() {
  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(setTableData(initialTableData))
    })
  }, [])
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <HiBuildingOffice2 size={"30"} />
        <h3 className="ml-5">Corporates</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <UsersTools />
        <CorporatesTableSearch />
      </div>
      <UsersTable />
    </AdaptableCard>
  );
}
export default CorporateList;
