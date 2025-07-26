import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import { HiRectangleGroup } from "react-icons/hi2";
import reducer from "./store";
import TemplateMapTableSearch from "./components/templateMapTableSearch";
import TemplateMapTable from "./components/templateMapList";
import TemplateMapFilterTools from "./components/templateMapFilterTools";
import TemplateTools from "./components/templateMapTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData, setFacility_id } from "./store/dataSlice";

injectReducer("templateMapList", reducer);

function TemplateMapList() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setTableData(initialTableData));
    };
  }, []);
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:mb-4 justify-between w-full">
        <div className="flex ">
          <HiRectangleGroup size={"30"} />
          <h3 className="ml-5">Template Mapping</h3>
        </div>
        <TemplateTools/>
      </div>
      <TemplateMapFilterTools/>
      <TemplateMapTable />
    </AdaptableCard>
  );
}
export default TemplateMapList;
