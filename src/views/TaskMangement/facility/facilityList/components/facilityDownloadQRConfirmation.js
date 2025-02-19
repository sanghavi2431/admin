import React from "react";
import UploadDialog from "@/components/shared/uploadDialog";
import { useSelector, useDispatch } from "react-redux";
import { toggleDownloadFAQConfirmation, toggleUploadConfirmation } from "../store/stateSlice";
import FacilityUpload from "../../facilityUpload";
import IotFilterTools from "../../facilityDownload/facilityFilterTools";
import { Button } from "@/components/ui";
import { HiDownload } from "react-icons/hi";
import ReviewFilterTools from "./ReviewManagementFilterTools";
import env from "react-dotenv";

const FacilityDownloadQRConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.facilityList?.state?.downloadFAQConfirmation
  );
  const onDialogClose = () => {
    dispatch(toggleDownloadFAQConfirmation(false));
  };

  return (
    <UploadDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="none"
      title="Download QR code"
      confirmText="Upload"
    >
      {/* <IotFilterTools /> */}
      <ReviewFilterTools/>
    </UploadDialog>
  );
};

export default FacilityDownloadQRConfirmation;
