import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { PiDevicesFill } from "react-icons/pi";
import reducer from "./store";
import IOTDeviceTableSearch from "./components/IOTDeviceTableSearch";
import IOTDeviceTools from "./components/IOTDeviceTools";
import IOTTable from "./components/IOTDeviceList";
import IotDeviceFilterTools from "./components/IOTDeviceFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("IotDeviceList", reducer);

function IotDeviceList() {
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
          <PiDevicesFill size={"30"} />
          <h3 className="ml-5">IOT Device</h3>
        </div>
        <IOTDeviceTableSearch />
        <IOTDeviceTools />
      </div>
      <IotDeviceFilterTools />
      <IOTTable />
    </AdaptableCard>
  );
}
export default IotDeviceList;
