import React from "react";
import UploadDialog from "@/components/shared/uploadDialog";
import { useSelector, useDispatch } from "react-redux";
import { toggleUploadConfirmation } from "../store/stateSlice";
import Template_mapping_Upload from "../../template_mappingUpload";
import { Button } from "@/components/ui";
import { HiDownload } from "react-icons/hi";
import TemplateMappingDataDownloadFormTools from "../../template_mappingDownload/template_mappingFilterTools";

const TemplateUploadConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.templateMapList?.state?.uploadConfirmation
  );
  const onDialogClose = () => {
    dispatch(toggleUploadConfirmation(false));
  };
  const onTemplateDownload = () => {
    let pathname = window.location.href;
    pathname = pathname
      .split("/")
      .filter((e, index) => index < 3)
      .join("/");
    let data = pathname + "/autoTaskMapping-upload.xlsx";
    let fileLink = data.split("/").pop();
    let link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", fileLink);
    document.body.appendChild(link);
    link.click();
  };
  return (
    <UploadDialog
      isOpen={dialogOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
      type="none"
      title="Upload"
      confirmText="Upload"
    >
      {/* <div className="lg:flex justify-between ">
        <div>
          <p className="font-bold">Add or change Excel file </p>
          <p className="mb-6">*only .xls formats are allowed</p>
        </div>
        <Button
          type="button"
          onClick={onTemplateDownload}
          variant="solid"
          icon={<HiDownload />}
        >
          Template
        </Button>
      </div> */}
      {/* <TemplateMappingDataDownloadFormTools /> */}
      <Template_mapping_Upload />
    </UploadDialog>
  );
};

export default TemplateUploadConfirmation;
