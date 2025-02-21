import React from "react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleDownloadFAQConfirmation, toggleUploadConfirmation } from "../store/stateSlice";

const FacilityTools = () => {
  const roleId = useSelector((state) => state.auth.user.roleId);
  const rolesAccess = useSelector(state => state.auth.user?.rolesAccess);
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial);

  const dispatch = useDispatch();
  const UploadConfirmation = () => {
    dispatch(toggleUploadConfirmation(true));
  };
  const isDisabled = roleId === 13 && isFreeTrial;

  const handleClick = () => {
    if (!isDisabled) {
      dispatch(setSideBarDisabled(true));
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="solid"
        size="sm"
        className="text-white bg-black"
        color="black"
        onClick={() => {
          if (!isDisabled) dispatch(toggleDownloadFAQConfirmation(true))
        }}
        disabled={isDisabled}
        visibility={rolesAccess["/facility-Import"]}
      >
        <span className="">Download QR</span>
      </Button>
      <Button
        variant="solid"
        size="sm"
        className="w-28 text-black bg-[#00C3DE] hover:bg-[#00c4debd]"
        color="black"
        onClick={() => {
          if (!isDisabled) UploadConfirmation()
        }}
        disabled={isDisabled}
        visibility={rolesAccess["/facility-Import"]}
      >
        <span className="text-black">Import</span>
      </Button>

      <div className="md:flex lg:items-center">
        <Link to={!isDisabled ? "/facility-AddNew" : "#"} onClick={handleClick}>
          <div className="mr-0 md:mr-1 mb-1 md:mb-0">
            <Button
              className="text-white bg-black"
              color="black"
              block
              size="sm"
              variant="solid"
              disabled={isDisabled}
              visibility={rolesAccess["/facility-AddNew"]}
            >
              <span className="text-white"> Add New</span>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FacilityTools;
