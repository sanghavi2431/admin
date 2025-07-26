import React from "react";
import { toast, Notification } from "@/components/ui";
import { ConfirmDialog } from "@/components/shared";
import { useSelector, useDispatch } from "react-redux";
import { toggleExportConfirmation, exportExcel } from "../store/dataSlice";
import { cloneDeep } from "lodash";

const ExportConfirmation = () => {
  const dispatch = useDispatch();
  let tableData = useSelector((state) => state.ownerHistoryList.data.tableData);
  let newTableData = cloneDeep(tableData);
  newTableData.report = "ownerHistory";
  const dialogOpen = useSelector(
    (state) => state.ownerHistoryList.data.exportConfirmation
  );
  const onDialogClose = () => {
    dispatch(toggleExportConfirmation(false));
  };
  const onExport = async () => {
    dispatch(toggleExportConfirmation(false));
    try {
      const { success, results } = await exportExcel(newTableData);
      if (success) {
        let downloadLink = results.uploadPath;
        toast.push(
          <Notification
            title={"Exported Successfully "}
            type="success"
            duration={2500}
          >
            Exported successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        const link = document.createElement("a");
        link.href = downloadLink;
        link.setAttribute("download", "ownerHistory_report.xlsx");
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
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
      type="none"
      title="Are you sure you want to Export this ?"
      confirmText="Confirm"
      onConfirm={onExport}
      onCancel={onDialogClose}
    ></ConfirmDialog>
  );
};

export default ExportConfirmation;
