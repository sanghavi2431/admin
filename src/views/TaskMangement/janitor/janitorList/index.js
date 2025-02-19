import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { GiPerson } from "react-icons/gi";
import reducer from "./store";
import JanitorTableSearch from "./components/janitorTableSearch";
import JanitorTools from "./components/janitorTools";
import JanitorTable from "./components/janitorList";
import JanitorFilterTools from "./components/janitorFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("janitorList", reducer);

function JanitorList() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setTableData(initialTableData));
    };
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="flex">
          <GiPerson size={"30"} />
          <h3 className="ml-5">Janitor</h3>
        </div>
        <JanitorTableSearch />
        <JanitorTools />
      </div>

      <JanitorFilterTools />
      <JanitorTable />
    </AdaptableCard>
  );
}
export default JanitorList;
