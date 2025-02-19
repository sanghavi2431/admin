import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { FaUsers } from "react-icons/fa";
import reducer from "./store";
import ClientTableSearch from "./components/clientTableSearch";
import ClientsTools from "./components/clientTools";
import ClientTable from "./components/clientList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initialTableData,setTableData } from "./store/dataSlice";
injectReducer("clientList", reducer);

function ClientList() {
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
          <FaUsers size={"30"} />
          <h3 className="ml-5">Client</h3>
        </div>
        <ClientTableSearch />
        <ClientsTools />
      </div>
      <div className="md:flex  justify-between pt-4 mt-8 "></div>
      <ClientTable />
    </AdaptableCard>
  );
}
export default ClientList;
