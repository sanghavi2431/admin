import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDeleteConfirmation,
  deactivateVoucher,
  getVoucherUses,
  setTableData,
} from "../store/dataSlice";
import { cloneDeep } from "lodash";
const UsersDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total } = useSelector(
    (state) => state.voucherusesList.data.tableData
  );
  const dialogOpen = useSelector(
    (state) => state.voucherusesList.data.DeleteConfirmation
  );
  const selectedVoucherId = useSelector(
    (state) => state.voucherusesList.data.selectedVoucherId
  );
  const selectedUserId = useSelector(
    (state) => state.voucherusesList.data.selectedUserId
  );
  const tableData = useSelector(
    (state) => state.voucherusesList.data.tableData
  );

  let id = selectedVoucherId;
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
    let data = {};
    data.voucher_id = parseInt(selectedVoucherId);
    data.user_id = selectedUserId;

    try {
      const success = await deactivateVoucher(data);
      if (success) {
        dispatch(setTableData(newTableData));
        dispatch(getVoucherUses({ pageIndex, pageSize, sort, query, id }));
        toast.push(
          <Notification
            title={"Successfully Removed"}
            type="success"
            duration={2500}
          >
            User Removed successfully
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
      title="Are you sure you want to Remove this user? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Remove it!"
    ></ConfirmDialog>
  );
};

export default UsersDeleteConfirmation;
