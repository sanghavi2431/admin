import React from "react";
import { Button } from "@/components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toggleBulkUploadConfirmation } from "../store/stateSlice";
import { useDispatch, useSelector } from "react-redux";

const WoloosTools = () => {
  const dispatch = useDispatch()
  const onImport = () => {
    dispatch(toggleBulkUploadConfirmation(true))
  };
  const rolesAccess = useSelector((state) => state.auth.user.rolesAccess)

  return (
    <div className="md:flex lg:items-center w-full">
      <Link
        to="/woloos-AddNew"
      >
        <div className="mb-1 md:mb-0 ">
          <Button className="text-gray-800" block size="sm" variant="solid" icon={<HiPlusCircle />} visibility={rolesAccess["/woloos-AddNew"]}>
            Add New
          </Button>
        </div></Link>
      <div className="mx-0 md:mx-1 mb-1 md:mb-0 " >
        <Button className="text-gray-800" block size="sm" variant="solid" onClick={() => onImport()} visibility={rolesAccess["/woloos-Import"]}>
          Import
        </Button>
      </div>
      <div className=" mb-1 md:mb-0 " >
      <Link
          to="/woloos-QRCode"
          target="_blank"
      >
        <Button className="  text-gray-800" block size="sm" variant="solid" visibility={rolesAccess["/woloos-QRCode"]}>
          QR Print
          </Button>
          </Link>

      </div>
    </div>
  );
};

export default WoloosTools;
