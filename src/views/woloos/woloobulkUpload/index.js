import { AdaptableCard } from "@/components/shared";
import WoloosUploadFileForm from "../wolooBulkUploadForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import {  useNavigate } from "react-router-dom";
import { uploadWolooData } from "./store/dataSlice";
import { toggleBulkUploadConfirmation } from "../woloosList/store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { getWoloos } from "../woloosList/store/dataSlice";

injectReducer("wolooBulkUpload", reducer);

const WolooBulkUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.woloosList.data.tableData);

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var formData = new FormData();
    formData.append("file", values.file[0]);

    try {
      const success = await uploadWolooData(formData);

      if (success) {
        dispatch(getWoloos(tableData));
        setSubmitting(true);
        dispatch(toggleBulkUploadConfirmation(false));
        toast.push(
          <Notification
            title={"New File uploaded successfully"}
            type="success"
            duration={2500}
          >
            New File uploaded successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/woloos");
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err?.response?.data?.message;
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

  const handleDiscard = () => {
    dispatch(toggleBulkUploadConfirmation(false));
  };

  return (
    <>
      <AdaptableCard>
        <>
          <WoloosUploadFileForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default WolooBulkUpload;
