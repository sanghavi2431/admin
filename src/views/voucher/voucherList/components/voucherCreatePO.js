import React from "react";
import UploadDialog from "@/components/shared/uploadDialog";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateConfirmation } from "../store/dataSlice";
import WolooBulkUpload from "@/views/voucher/voucherPo";

const CreateConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.voucherList.data.createPOConfirmation
  );

  const onDialogClose = () => {
    dispatch(toggleCreateConfirmation(false));
  };

  return (
    <UploadDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="none"
      title="Create PO"
      confirmText="Upload"
    >
      <WolooBulkUpload />
    </UploadDialog>
  );
};

export default CreateConfirmation;
