import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import reducer from "./store";
import BlockTableSearch from "./components/blockTableSearch";
import BlockTools from "./components/blockTools";
import BlockTable from "./components/blockList";
import BlockFilterTools from "./components/blockFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";
import { FaBuilding } from "react-icons/fa";

injectReducer("blockList", reducer);

function BlockList() {
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
          <FaBuilding size={"30"} />
          <h3 className="ml-5">Building</h3>
        </div>
        <BlockTableSearch />
        <BlockTools />
      </div>
      <BlockFilterTools />
      <BlockTable />
    </AdaptableCard>
  );
}
export default BlockList;
