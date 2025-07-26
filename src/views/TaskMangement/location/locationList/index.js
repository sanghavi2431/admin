import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { IoLocationSharp } from "react-icons/io5";
import reducer from "./store";
import LocationTableSearch from "./components/locationTableSearch";
import LocationTools from "./components/locationTools";
import LocationTable from "./components/locationList";
import LocationFilterTools from "./components/locationFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("locationList", reducer);

function LocationList() {
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
          <IoLocationSharp size={"30"} />
          <h3 className="ml-5">Location</h3>
        </div>
        <LocationTableSearch />
        <LocationTools />
      </div>
      <LocationFilterTools />
      <div className="md:flex  justify-between pt-2 mt-2 "></div>
      <LocationTable />
    </AdaptableCard>
  );
}
export default LocationList;
