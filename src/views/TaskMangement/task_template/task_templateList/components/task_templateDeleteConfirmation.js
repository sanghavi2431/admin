import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation,delete_Temp } from "../store/stateSlice";
import { getTemplate } from "../store/dataSlice";

const TemplateDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.tempList.state.deleteConfirmation
  );
  const selectedBlock = useSelector(
    (state) => state.tempList.state.selectedBlock
  );
  const tableData = useSelector((state) => state.tempList.data.tableData);

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };

  const onDelete = async () => {
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = Number(selectedBlock);
    try {
      const success = await delete_Temp(data);
      if (success) {
        dispatch(getTemplate(tableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Template deleted successfully
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
      title="Are you sure you want to delete this Template? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default TemplateDeleteConfirmation;
