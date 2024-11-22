import React from "react";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarDisabled } from "store/auth/userSlice";
import { toggleDownloadFAQConfirmation, toggleUploadConfirmation } from "../store/stateSlice";

const FacilityTools = () => {
  const roleId = useSelector((state) => state.auth.user.roleId);
  const rolesAccess = useSelector(state => state.auth.user?.rolesAccess)
  
  const dispatch = useDispatch();
  const UploadConfirmation = () => {
    dispatch(toggleUploadConfirmation(true));
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="solid"
        size="sm"
        className="text-white bg-black"
        color="black"
        onClick={() =>{ dispatch(toggleDownloadFAQConfirmation(true))}}
        visibility={rolesAccess["/facility-Import"]}
      >
        <span className="">Download QR</span>
      </Button>
      <Button
        variant="solid"
        size="sm"
        className="w-28 text-black bg-[#00C3DE] hover:bg-[#00c4debd]"
        color="black"
        onClick={() => UploadConfirmation()}
        visibility={rolesAccess["/facility-Import"]}
      >
        <span className="text-black">Import</span>
      </Button>

      <div
        className="md:flex lg:items-center"
        onClick={() => {
          dispatch(setSideBarDisabled(true));
        }}
      >
        <Link to="/facility-AddNew">
          <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
            <Button
              className="text-white bg-black"
              color="black"
              block
              size="sm"
              variant="solid"
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
