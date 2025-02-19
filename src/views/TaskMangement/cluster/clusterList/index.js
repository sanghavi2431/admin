import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {BiSolidNetworkChart} from 'react-icons/bi'
import reducer from "./store";
import ClusterTableSearch from "./components/clusterTableSearch";
import ClusterTools from "./components/clusterTools";
import ClusterTable from "./components/clusterList";
import ClusterFilterTools from "./components/clusterFilterTools";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTableData, initialTableData } from "./store/dataSlice";

injectReducer("clusterList", reducer);

function ClusterList() {
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
          <BiSolidNetworkChart size={"30"} />
          <h3 className="ml-5">Cluster</h3>
        </div>
        <ClusterTableSearch />
        <ClusterTools />
      </div>
      <ClusterFilterTools/>
      <ClusterTable />
    </AdaptableCard>
  );
}
export default ClusterList;
