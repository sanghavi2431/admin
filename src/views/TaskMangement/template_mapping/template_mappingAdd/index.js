import { AdaptableCard } from "components/shared";
import TemplateMapForm from "../templateMapForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "components/shared";
import { toast, Notification } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_tempMaping } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "components/ui";
import {
  toggleAddConfirmation,
  toggleDeleteConfirmation,
} from "../template_mappingList/store/stateSlice";
import { getTemplate } from "../template_mappingList/store/dataSlice";
import { cloneDeep } from "lodash";
import { setProgressState } from "store/auth/userSlice";

injectReducer("tempAdd", reducer);

const TempMappingAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pageIndex, pageSize, sort, query, total, facility_id } = useSelector(
    (state) => state.templateMapList.data.tableData
  );
  const loggedInClient = useSelector((state) => state.auth.user?.clientId);
  const facilityMappingData = useSelector(
    (state) => state.auth.user.facilityMappingData
  );
  let newfacilityMappingData={}
  if (facilityMappingData) {
    newfacilityMappingData = cloneDeep(facilityMappingData);
    newfacilityMappingData.client_name = newfacilityMappingData?.clients;
    newfacilityMappingData.location_name = newfacilityMappingData?.location;
    newfacilityMappingData.block_name = newfacilityMappingData?.block;
    newfacilityMappingData.facility = newfacilityMappingData?.facility_name;
    newfacilityMappingData.janitor = "";
    newfacilityMappingData.end_time = "";
    newfacilityMappingData.start_time = "";
  }
  let data={}
  if(loggedInClient){
    newfacilityMappingData.client_name = loggedInClient;
    data.client_name=loggedInClient
  }
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);

    function getFormatedDate(inputDateStr) {
      const inputDate = new Date(inputDateStr);

      // Format the date into the desired output format
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");
      const hours = inputDate.getHours().toString().padStart(2, "0");
      const minutes = inputDate.getMinutes().toString().padStart(2, "0");
      const seconds = inputDate.getSeconds().toString().padStart(2, "0");

      const outputDateStr = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return outputDateStr;
    }

    let form = new FormData();
    form.append("janitor_id", values.janitor.value);
    form.append("task_template_id", values.templates.value);
    form.append("facility_id", values.facility.value);
    form.append("start_time", getFormatedDate(values.start_time));
    form.append("end_time", getFormatedDate(values.end_time));

    try {
      const {success, results} = await insert_tempMaping(form);
      if (success) {
        setSubmitting(false);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Template Facility Mapping Added successfully"}
            type="success"
            duration={5000}
          >
            Template Mapping is completed and further configuration has to be done from left side menu.

          </Notification>,
          {
            placement: "top-center",
          }
        );
        dispatch(toggleAddConfirmation(false));
        dispatch(
          getTemplate({ pageIndex, pageSize, sort, query, facility_id })
        );
      }
    } catch (err) {
      setSubmitting(false);
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

  const handleDiscard = () => {
    // navigate("/templateMap");
    dispatch(toggleAddConfirmation(false));
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="mb-2">
          <div className="font-bold">
            Please define the template where task will be perform, along with
            Estimated time.
          </div>
        </div>
        {newfacilityMappingData   ? (
          <TemplateMapForm
            initialData={location?.state ?newfacilityMappingData:data}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <TemplateMapForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        )}
      </AdaptableCard>
    </>
  );
};

export default TempMappingAdd;
