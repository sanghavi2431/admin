import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {DiOpenshift} from 'react-icons/di'
import reducer from "./store";
import ShiftTableSearch from "./components/shiftTableSearch";
import ShiftTools from "./components/shiftTools";
import ShiftTable from "./components/shiftList";
import ShiftFilterTools from "./components/shiftFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("shiftList", reducer);

function ShiftList() {
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
          <DiOpenshift size={"30"} />
          <h3 className="ml-5">Shift</h3>
        </div>
        <ShiftTableSearch />
        <ShiftTools />
      </div>
      <ShiftFilterTools/>
      <div className="md:flex  justify-between pt-2 mt-2 "></div>
      <ShiftTable />
    </AdaptableCard>
  );
}
export default ShiftList;
