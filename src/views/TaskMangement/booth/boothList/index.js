import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { FaPersonBooth } from "react-icons/fa";
import reducer from "./store";
import BoothTable from "./components/boothList";
import BoothFilterTools from "./components/boothFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData, setFacility_id } from "./store/dataSlice";

injectReducer("boothList", reducer);

function BoothList() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setTableData(initialTableData));
      dispatch(setFacility_id(""))

    };
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="flex">
          <FaPersonBooth size={"30"} />
          <h3 className="ml-5">Booths</h3>
        </div>
      </div>
      <BoothFilterTools />
      <BoothTable />
    </AdaptableCard>
  );
}
export default BoothList;
