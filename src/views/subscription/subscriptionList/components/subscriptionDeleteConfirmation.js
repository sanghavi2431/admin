import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/dataSlice";
import { getSubscription, deleteSubscription } from "../store/dataSlice";

const SubscriptionDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.subscriptionList.data.deleteConfirmation
  );
  const selectedSubscription = useSelector(
    (state) => state.subscriptionList.data.selectedSubscription
  );
  const tableData = useSelector(
    (state) => state.subscriptionList.data.tableData
  );
  const selectedRows = useSelector(
    (state) => state.subscriptionList.state.selectedRows
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };
  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedSubscription;
    try {
      const success = await deleteSubscription(data);

      if (success) {
        dispatch(getSubscription(tableData));
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

export default SubscriptionDeleteConfirmation;
