import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleBulkDeleteConfirmation,
  deleteBulkSubscription,
  getSubscription,
  setBulkDeleteButton,
} from "../store/dataSlice";
import { setSelectedRows, setSelectedRow } from "../store/stateSlice";

const SubscriptionBulkDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.subscriptionList.data.bulkdeleteConfirmation
  );
  const selectedRows = useSelector(
    (state) => state.subscriptionList.state.selectedRows
  );
  const tableData = useSelector(
    (state) => state.subscriptionList.data.tableData
  );
  let selectedSubscription = [];
  for (let row of selectedRows) {
    if (row.isSelected == 1) {
      selectedSubscription.push(row.id);
    }
  }

  const onDialogClose = () => {
    dispatch(toggleBulkDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleBulkDeleteConfirmation(false));
    let data = {};
    data.id = selectedSubscription;
    dispatch(setSelectedRows([]));
    dispatch(setSelectedRow([]));

    try {
      const success = await deleteBulkSubscription(data);
      if (success) {
        dispatch(getSubscription(tableData));
        dispatch(setBulkDeleteButton(true));

        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Subscription deleted successfully
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
      title="Are you sure you want to delete this Subscription? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default SubscriptionBulkDeleteConfirmation;
