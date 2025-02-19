import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setSideBarDisabled } from "@/store/auth/userSlice";
 
const ClientsTools = () => {
const dispatch = useDispatch()

const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)
  return (
    <div className="md:flex lg:items-center" onClick={(()=>{dispatch(setSideBarDisabled(true))})}>
      <Link to="/client-AddNew" >
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="bg-[#00C3DE] hover:bg-[#00c4debd]"
            color="black"
            block
            size="sm"
            variant="solid"
            visibility={rolesAccess["/client-AddNew"]}
          >
           <span className="text-black"> Add New</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ClientsTools;
