import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HostOfferTools = () => {
  const rolesAccess=useSelector((state)=>state.auth.user.rolesAccess)

  return (
    <div className="md:flex lg:items-center w-full">
      <Link to="/hostOffer-AddNew">
        <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
          <Button
            className="text-gray-800"
            block
            size="sm"
            variant="solid"
            icon={<HiPlusCircle />}
            visibility={rolesAccess["/hostOffer-AddNew"]}
          >
            Add New
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default HostOfferTools;
