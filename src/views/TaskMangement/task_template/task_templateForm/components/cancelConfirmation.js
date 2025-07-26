import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../store/dataSlice";

const CancelConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogOpen = useSelector(
    (state) => state.taskAddForm?.data?.exitConfirmation
  );

  const onDialogClose = () => {
    dispatch(toggleExitConfirmation(false));
  };

  const onDelete = async () => {
    navigate("/task_template");
    dispatch(toggleExitConfirmation(false));
    dispatch(setSideBarDisabled(false));
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Are you sure you want to terminate the current setup  ?"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Exit !"
    >
      Exit will result in the deletion of your unsaved information.
    </ConfirmDialog>
  );
};

export default CancelConfirmation;
