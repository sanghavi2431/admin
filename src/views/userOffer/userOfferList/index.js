import { AdaptableCard } from "@/components/shared";
import UsersTools from "./components/userOfferTools";
import UserOfferTableSearch from "./components/userOfferTableSearch";
import UsersTable from "./components/userOfferList";
import { injectReducer } from "@/store";
import { MdLocalOffer } from "react-icons/md";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("userOfferList", reducer);

function UserOfferList() {
  const dispatch = useDispatch()
  useEffect(() => {
    return (() => {
      dispatch(setTableData(initialTableData))
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <MdLocalOffer size={"30"} />
        <h3 className="ml-5">User Offers</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <UsersTools />
        <UserOfferTableSearch />
      </div>
      <UsersTable />
    </AdaptableCard>
  );
}
export default UserOfferList;
