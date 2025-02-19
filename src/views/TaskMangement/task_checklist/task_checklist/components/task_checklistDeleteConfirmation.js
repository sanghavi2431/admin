import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation,delete_task } from "../store/stateSlice";
import { get_taskchecklist } from "../store/dataSlice";

const TaskDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.taskchecklist.state.deleteConfirmation
  );
  const selectedTask = useSelector(
    (state) => state.taskchecklist.state.selectedTask
  );
  const tableData = useSelector((state) => state.taskchecklist.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedTask;
    try {
      const success = await delete_task(data);
      if (success) {
        dispatch(get_taskchecklist(tableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Task Checklist deleted successfully
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
      title="Are you sure you want to delete this Task Checklist? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default TaskDeleteConfirmation;
