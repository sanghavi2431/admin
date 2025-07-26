import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const IotDeviceTools = () => {
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)

  return (
    <div className="md:flex lg:items-center">
      <Link to="/iotDevice-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
        <Button
            className="bg-[#00C3DE] hover:bg-[#00c4debd]"
            color="black"
            block
            size="sm"
            variant="solid"
            visibility={rolesAccess["/iotDevice-AddNew"]}
          >
           <span className=""> Add New</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default IotDeviceTools;
