import React from "react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarDisabled } from "@/store/auth/userSlice";

const LocationTools = () => {
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess);
  const roleId = useSelector((state) => state.auth.user.roleId);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);

  const dispatch = useDispatch();
  const isDisabled = roleId === 13 && isFreeTrial;

  const handleClick = () => {
    if (!isDisabled) {
      dispatch(setSideBarDisabled(true));
    }
  };

  return (
    <div className="md:flex lg:items-center">
      <Link to={!isDisabled ? "/location-AddNew" : "#"} onClick={handleClick}>
        <div className="mr-0 md:mr-1 mb-1 md:mb-0">
          <Button
            className="bg-[#00C3DE] hover:bg-[#00c4debd]"
            color="black"
            block
            size="sm"
            variant="solid"
            disabled={isDisabled}
            visibility={rolesAccess["/location-AddNew"]}
          >
            <span> Add New</span>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default LocationTools;
