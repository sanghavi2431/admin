import React, { useState } from "react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddConfirmation, toggleUploadConfirmation } from "../store/stateSlice";

const TemplateTools = () => {
  const dispatch = useDispatch()
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)
  const roleId = useSelector((state) => state.auth.user.roleId)
  const isFreeTrial = useSelector((state) => state.auth.user.isFreeTrial)

  const isDisabled = roleId === 13 && isFreeTrial;

  const UploadConfirmation = () => {
    dispatch(toggleUploadConfirmation(true));
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="solid"
        size="sm"
        className="w-28 bg-[#00C3DE] hover:bg-[#00c4debd]"
        color="black"
        visibility={rolesAccess["/templateMap-Import"]}
        onClick={() => UploadConfirmation()}
      >
        <span className="">Import</span>
      </Button>
      <div className="md:flex lg:items-center">
        <Link to={!isDisabled ? "/templateMap-AddNew" : "#"}>
          <div className="mr-0 md:mr-1 mb-1 md:mb-0 ">
            <Button
              className="text-white bg-black"
              color="black"
              block
              size="sm"
              variant="solid"
              disabled={isDisabled}
              visibility={rolesAccess["/templateMap-AddNew"]}
            // onClick={()=>dispatch(toggleAddConfirmation(true))}
            >
              <span className="text-white"> Add New</span>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TemplateTools;
