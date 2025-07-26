import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {GrServices} from 'react-icons/gr'
import reducer from "./store";
import FacilityTableSearch from "./components/facilityTableSearch";
import FacilityTools from "./components/facilityTools";
import FacilityTable from "./components/facilityList";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";
import FacilityFilterTools from "./components/facilityFilterTools";
injectReducer("facilityList", reducer);

function FacilityList() {
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
          <GrServices size={"30"} />
          <h3 className="ml-5">Facility</h3>
        </div>
        <FacilityTableSearch />
        <FacilityTools />
     
      </div>
      <FacilityFilterTools/>

      <FacilityTable />
    </AdaptableCard>
  );
}
export default FacilityList;
