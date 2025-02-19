import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation,delete_cluster } from "../store/stateSlice";
import { getCluster } from "../store/dataSlice";

const ClusterDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.clusterList.state.deleteConfirmation
  );
  const selectedCluster = useSelector(
    (state) => state.clusterList.state.selectedCluster
  );
  const tableData = useSelector((state) => state.clusterList.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedCluster;
    try {
      const success = await delete_cluster(data);
      if (success) {
        dispatch(getCluster(tableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Cluster deleted successfully
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
      title="Are you sure you want to delete this Cluster? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default ClusterDeleteConfirmation;
