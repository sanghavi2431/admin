import { AdaptableCard } from "@/components/shared";
import HostOfferTools from "./components/hostOfferTools";
import HostOfferTableSearch from "./components/hostOfferTableSearch";
import { BiSolidOffer } from "react-icons/bi";
import UsersTable from "./components/hostOfferList";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialTableData, setTableData } from "./store/dataSlice";
injectReducer("hostOfferList", reducer);

function HostOfferList() {
  const dispatch = useDispatch()
  useEffect(() => {
    return (() => {
      dispatch(setTableData(initialTableData))
    })
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex items-center mb-4">
        <BiSolidOffer size={"30"} />
        <h3 className="ml-5">Woloo Host Offer</h3>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between my-10 gap-3">
        <HostOfferTools />
        <HostOfferTableSearch />
      </div>
      <UsersTable />
    </AdaptableCard>
  );
}
export default HostOfferList;
