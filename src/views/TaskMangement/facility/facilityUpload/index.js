import { AdaptableCard } from "@/components/shared";
import FacilityUploadFileForm from "../facilityUploadForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { upload_Facility } from "./store/dataSlice";
import { toggleUploadConfirmation } from "../facilityList/store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFacility } from "../facilityList/store/dataSlice";
import { setProgressState } from "@/store/auth/userSlice";

injectReducer("facilityUpload", reducer);

const FacilityUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.facilityList.data.tableData);
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var formData = new FormData();
    formData.append("sheet", values.file[0]);

    try {
      const { success, results } = await upload_Facility(formData);

      if (success) {
        dispatch(getFacility(tableData));
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
        errorMessage = "Facility dosen't exits";
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
          <FacilityUploadFileForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default FacilityUpload;
