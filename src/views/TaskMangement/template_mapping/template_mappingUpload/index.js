import { AdaptableCard } from "@/components/shared";
import TemplateMappingUploadFileForm from "../template_mappingUploadForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import {  useNavigate } from "react-router-dom";
import { toggleUploadConfirmation } from "../template_mappingList/store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTemplate } from "../template_mappingList/store/dataSlice";
import { upload_task_mapping_file } from "./store/dataSlice";
import { setProgressState } from "@/store/auth/userSlice";

injectReducer("Template_mapping_Upload", reducer);

const Template_mapping_Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.templateMapList.data.tableData);
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var formData = new FormData();
    formData.append("autoTaskMappingSheet", values.file[0]);    

    try {
      // const { success, results } = await upload_Facility(formData);
      const { success, results } = await upload_task_mapping_file(formData);
      if (success) {
        dispatch(getTemplate(tableData));
        dispatch(setProgressState(results.checkpoint));
        setSubmitting(true);
        dispatch(toggleUploadConfirmation(false));
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
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = "";
      if (err.response && err.response.data && err.response.data.error && err.response.data.error.message) {
        errorMessage = err.response.data.error.message;
      } else {
        errorMessage = "Task Mapping Dosen't exits";
      }
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
    dispatch(toggleUploadConfirmation(false));
  };

  return (
    <>
      <AdaptableCard>
        <>
          <TemplateMappingUploadFileForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default Template_mapping_Upload;
