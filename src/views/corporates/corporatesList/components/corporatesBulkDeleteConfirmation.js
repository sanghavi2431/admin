import React from "react";
import { toast, Notification } from "components/ui";
import { ConfirmDialog } from "components/shared";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleBulkDeleteConfirmation,
  deleteBulkCorporate,
  getCorporates,
  setTableData,
  setBulkDeleteButton,
} from "../store/dataSlice";
import { setSelectedRows, setSelectedRow } from "../store/stateSlice";
import { cloneDeep } from "lodash";

const CorporatesBulkDeleteConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.corporatesList.data.bulkdeleteConfirmation
  );
  const selectedRows = useSelector(
    (state) => state.corporatesList.state.selectedRows
  );
  const tableData = useSelector((state) => state.corporatesList.data.tableData);
  let selectedCorporate = [];
  for (let row of selectedRows) {
    if (row.isSelected == 1) {
      selectedCorporate.push(row.id);
    }
  }

  const onDialogClose = () => {
    dispatch(toggleBulkDeleteConfirmation(false));
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

    dispatch(toggleBulkDeleteConfirmation(false));
    let data = {};
    data.id = selectedCorporate;
    dispatch(setSelectedRows([]));

    try {
      const success = await deleteBulkCorporate(data);
      if (success) {
        dispatch(setBulkDeleteButton(true));
        dispatch(setTableData(newTableData));
        dispatch(getCorporates(newTableData));

        toast.push(
          <Notification
            title={"Successfully Deleted"}
            type="success"
            duration={2500}
          >
            Corporate deleted successfully
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
      title="Are you sure you want to delete this Corporate? "
      onCancel={onDialogClose}
      onConfirm={onDelete}
      confirmButtonColor="red-600"
      confirmText="Yes,Delete it!"
    ></ConfirmDialog>
  );
};

export default CorporatesBulkDeleteConfirmation;