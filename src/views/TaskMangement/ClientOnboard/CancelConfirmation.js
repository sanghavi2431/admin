import React from "react";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleExitConfirmation } from "./store/dataSlice";
import { deleteClientSetup } from "@/services/taskManagement/clientService";

const CancelConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = useSelector((state) => state?.auth?.user?.clientId?.value);
  const dialogOpen = useSelector(
    (state) => state?.clientOnboard?.data?.toggleExitConfirmation
  );

  const onDialogClose = () => {
    dispatch(toggleExitConfirmation(false));
  };

  const onDelete = async () => {
    try {
      const data = { 
        client_id: clientId
      }
      await deleteClientSetup(data);
    } catch (error) {
      console.log(error);
    }
    finally {
      navigate("/client-Onboard");
      dispatch(toggleExitConfirmation(false));
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      type="danger"
      title="Are you sure you want to terminate the current setup?"
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Exit!"
    >
      Exit will result in the deletion of your unsaved information.
    </ConfirmDialog>
  );
};

export default CancelConfirmation;
