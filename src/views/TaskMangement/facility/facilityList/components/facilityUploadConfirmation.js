import React from "react";
import UploadDialog from "@/components/shared/uploadDialog";
import { useSelector, useDispatch } from "react-redux";
import { toggleUploadConfirmation } from "../store/stateSlice";
import FacilityUpload from "../../facilityUpload";
import IotFilterTools from "../../facilityDownload/facilityFilterTools";
import { Button } from "@/components/ui";
import { HiDownload } from "react-icons/hi";

const FacilityUploadConfirmation = () => {
  const dispatch = useDispatch();
  const dialogOpen = useSelector(
    (state) => state.facilityList?.state?.uploadConfirmation
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
    let data = pathname + "/facility-upload.xlsx";
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
      title="Facily Bulk Upload"
      confirmText="Upload"
      width={500}
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
      </div>
      <div className="my-4">
        <p className="font-bold">Please note while creating Upload File *</p>
        <ol className="flex flex-col gap-2">
          <li><span className="font-bold">1.location_id: </span> You can find the Location ID in the Location Table. Make sure the Location ID belongs to the same client as the Block ID you're selecting.</li>
          <li><span className="font-bold">2.block_id: </span> Similarly, you can find the Block ID in the Building Table. Ensure the Block ID also corresponds to the same client as the Location ID you've chosen.</li>
          <li><span className="font-bold">3.name: </span> The name represents the Facility Name .</li>
          <li><span className="font-bold">4.booth_1,2,3 : </span> It indicates Booth name .</li>
        </ol>
      </div> */}
      {/* <IotFilterTools /> */}
      <FacilityUpload />
    </UploadDialog>
  );
};

export default FacilityUploadConfirmation;
