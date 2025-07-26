import { AdaptableCard } from "@/components/shared";
import { injectReducer } from "@/store";
import {GrUserManager} from 'react-icons/gr'
import reducer from "./store";
import SupervisorTableSearch from "./components/facilityManagerTableSearch";
import SupervisorTools from "./components/facilityManagerTools";
import FacilityManagerTable from "./components/facilityManagerList";

injectReducer("facility_managerList", reducer);

function Facility_ManagerList() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex md:items-center md:justify-between md:mb-4">
        <div className="flex">
          <GrUserManager size={"30"} />
          <h3 className="ml-5">Facility Manager</h3>
        </div>
        {/* <SupervisorTableSearch /> */}
        <SupervisorTools />
      </div>

      <div className="md:flex  justify-between pt-4 mt-8 "></div>
      <FacilityManagerTable />
    </AdaptableCard>
  );
}
export default Facility_ManagerList;
