import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteConfirmation } from "../store/dataSlice";
import {
  getUserOffer,
  delete_UserOffer,
  setTableData,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";

const UserOfferDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.userOfferList.data.deleteConfirmation
  );
  const selectedUserOffer = useSelector(
    (state) => state.userOfferList.data.selectedUserOffer
  );
  const tableData = useSelector((state) => state.userOfferList.data.tableData);
  const selectedRows = useSelector(
    (state) => state.userOfferList.state.selectedRows
  );

  const onDialogClose = () => {
    dispatch(toggleDeleteConfirmation(false));
  };
  const onDelete = async () => {
    const newTableData = cloneDeep(tableData);
    let index = newTableData.pageIndex;
    let total = newTableData.total;
    let size = newTableData.pageSize;
    let newPageIndex = Math.ceil(total / size);
    if (newPageIndex == index) {
      if (total % size == 1) {
        newTableData.pageIndex = index - 1;
      }
    }
    dispatch(toggleDeleteConfirmation(false));
    var data = {};

    data.id = selectedUserOffer;

    try {
      const success = await delete_UserOffer(data);
      if (success) {
        dispatch(setTableData(newTableData));
        dispatch(getUserOffer(newTableData));
        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            User Offer deleted successfully
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
      title="Are you sure you want to delete this User Offer? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default UserOfferDeleteConfirmation;
