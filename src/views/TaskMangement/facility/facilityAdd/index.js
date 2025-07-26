import { AdaptableCard } from "@/components/shared";
import FacilityForm from "../facilityForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Facility } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { GrServices } from "react-icons/gr";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import {
  setFacilityMappingData,
  setProgressState,
  setSideBarDisabled,
} from "@/store/auth/userSlice";
import CancelConfirmation from "../facilityForm/components/cancelConfirmation";
import FacilityUploadConfirmation from "../facilityList/components/facilityUploadConfirmation";
import {
  setblock,
  setclient,
  setlocation,
  toggleExitConfirmation,
} from "../facilityForm/store/dataSlice";

injectReducer("facilityAdd", reducer);

const FacilityAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  // const selectedClient = useSelector(
  //   (state) => state.facilityaddForm.data.client
  // );
  // const selectedLocation = useSelector(
  //   (state) => state.facilityaddForm.data.location
  // );
  // const selectedBlock = useSelector(
  //   (state) => state.facilityaddForm.data.block
  // );

  let newData = {
    client_name: "",
    location_name: "",
    block_name: "",
    floor_no: "",
    facility_type: "",
    facility_name: "",
    description: "",
    status: "",
    booth: [{ booth_name: "" }],
  };
  if (location?.state) {
    newData = {
      ...location?.state,
      floor_no: "",
      facility_name: "",
      description: "",
      booth: [{ booth_name: "" }],
    };
  }
  if (loggedInClient != null && loggedInClient && loggedInClient.label) {
    newData["client_name"] = loggedInClient;
    dispatch(setclient(loggedInClient))
  }
  const buttonType = useSelector(
    (state) => state.facilityAdd?.data?.buttonType
  );
  const handleFormSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    let Data = {};

    Data.block_id = values.block_name.value;
    Data.description = values.description;
    Data.name = values.facility_name;
    // Facility type logic
    if (values.facility_type && values.facility_type.value === "other") {
      Data.facility_type = values.custom_facility_type;
      Data.isTypeOthers = true;
    } else {
      Data.facility_type = values.facility_type.value;
      Data.isTypeOthers = false;
    }
    Data.no_of_booths =
      values?.booth && values?.booth[0]?.booth_name.length > 1
        ? values.booth.length
        : 0;

    Data.floor_number = Number(values.floor_no);
    Data.location_id = values.location_name.value;
    // Data.client_id=values.client_name.value
    // Data.shift_ids=values.shift.map((s)=>{return s.value})

    Data.booths =
      values?.booth && values?.booth[0]?.booth_name.length > 1
        ? values.booth
        : [];
    Data.booths = values?.booth.filter((booth) => booth.booth_name.trim() !== "");
    try {
      const { success, results } = await insert_Facility(Data);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Facility Added successfully"}
            type="success"
            duration={2500}
          >
            Facility Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        // buttonType == "save"
        //   ? navigate("/facility")
        //   : navigate("/cluster-AddNew", { state: results?.data });
        if (buttonType == "save") {
          navigate("/facility");
        } else if (buttonType == "add_more") {
          setSubmitting(false);
          resetForm();
        } else {
          navigate("/cluster-AddNew", { state: results?.data?.data });
        }
        buttonType == "next" && dispatch(setFacilityMappingData(results?.data));
      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err.response.data.message;
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
    dispatch(setclient(""));
    dispatch(setlocation(""));
    dispatch(setblock(""));
    dispatch(toggleExitConfirmation(true));
    // navigate("/facility");
  };
 

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <Button
              shape="circle"
              variant="plain"
              size="lg"
              icon={<BiLeftArrowAlt />}
              onClick={() => handleDiscard()}
            />
            <h3 className="ml-3">Add Facility</h3>
          </div>
         
        </div>
        <div className="mb-8">
          <div className="font-bold">
            Please provide detail of facility and booth which needs to be
            monitored.
          </div>
        </div>
        {newData ? (
          <FacilityForm
            initialData={newData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <FacilityForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        )}
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default FacilityAdd;
