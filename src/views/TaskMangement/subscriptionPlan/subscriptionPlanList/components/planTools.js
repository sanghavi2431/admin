import React from "react";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setSideBarDisabled } from "store/auth/userSlice";
 
const PlanTools = () => {
const dispatch = useDispatch()
const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)
const roleId = useSelector((state) => state.auth.user.roleId);
const data = useSelector((state) => state.planList.data.planList);

  return (
    <div className="md:flex lg:items-center" >
      <Link to="/plan-AddNew" >
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="text-white bg-black"
            color="black"
            block
            size="sm"
            variant="solid"
            visibility={rolesAccess["/plan-AddNew"] }
          >
           <span className="text-white"> Add New</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default PlanTools;