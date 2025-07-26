import { AdaptableCard } from "@/components/shared";
import UsersTools from "./components/usersTools";
import UsersTableSearch from "./components/userTableSearch";
import { HiUser } from "react-icons/hi";
import UsersTable from "./components/usersList";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("usersList", reducer);

function WoloosList() {
  const dispatch = useDispatch()
  useEffect(()=>{
    return (()=>{
      dispatch(setTableData(initialTableData))
    })
  }, [])
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <HiUser size={"30"} />
        <h3 className="ml-5">Woloo Guest</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <UsersTools />
        <UsersTableSearch />
      </div>
      <UsersTable />
    </AdaptableCard>
  );
}
export default WoloosList;
