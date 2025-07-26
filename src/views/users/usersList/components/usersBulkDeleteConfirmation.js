import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleBulkDeleteConfirmation } from "../store/dataSlice";
import {
  getUsers,
  deleteBulkUser,
  setBulkDeleteButton,
} from "../store/dataSlice";
import { setSelectedRows, setSelectedRow } from "../store/stateSlice";

const UsersBulkDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.usersList.data.bulkdeleteConfirmation
  );
  const selectedRows = useSelector(
    (state) => state.usersList.state.selectedRows
  );
  const tableData = useSelector((state) => state.usersList.data.tableData);
  let selectedUsers = [];
  for (let row of selectedRows) {
    if (row.isSelected == 1) {
      selectedUsers.push(row.id);
    }
  }

  const onDialogClose = () => {
    dispatch(toggleBulkDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleBulkDeleteConfirmation(false));
    let data = {};
    data.id = selectedUsers;
    dispatch(setSelectedRows([]));
    dispatch(setSelectedRow([]));

    try {
      const success = await deleteBulkUser(data);

      if (success) {
        dispatch(getUsers(tableData));
        dispatch(setBulkDeleteButton(true));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Users deleted successfully
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
      title="Are you sure you want to delete this users? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default UsersBulkDeleteConfirmation;
