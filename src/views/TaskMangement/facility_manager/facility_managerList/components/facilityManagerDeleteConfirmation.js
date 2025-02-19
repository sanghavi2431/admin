import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation,delete_supervisor } from "../store/stateSlice";
import { getSupervisor } from "../store/dataSlice";

const SupervisiorDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.facility_managerList.state.deleteConfirmation
  );
  const selectedSupervisor = useSelector(
    (state) => state.facility_managerList.state.selectedSupervisor
  );
  const tableData = useSelector((state) => state.facility_managerList.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedSupervisor;
    try {
      const success = await delete_supervisor(data);
      if (success) {
        dispatch(getSupervisor(tableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Supervisor deleted successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
      }
    } catch (err) {
      let errorMessage = err.response.data.error.message;
      toast.push(
        <Notification title={"Failed"} type="warning" duration={2500}>
          {errorMessage}
        </Notification>,
        {
          placement: "top-center",
        }
      );
    }
  };

  return (
    <ConfirmDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="danger"
      title="Are you sure you want to delete this Supervisor? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default SupervisiorDeleteConfirmation;
