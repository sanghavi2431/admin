import { AdaptableCard } from "@/components/shared";
import BlockForm from "../blockForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Block } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../blockForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../blockForm/store/dataSlice";

injectReducer("blockAdd", reducer);

const BlockAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);

  const buttonType = useSelector((state) => state.blockAdd?.data?.buttonType);
  let data = {
    client_name: "",
    location_name: "",
    name: "",
    min_floor: "",
    max_floor: "",
    lat: "",
    lng: "",
    status: "",
  };
  if (location?.state) {
    data.client_name = location?.state?.client_name;
    data.location_name = location?.state?.location_name;
    data.lat = location?.state?.lat;
    data.lng = location?.state?.lng;
    data.name = "building1"

  }
  if (loggedInClient != null && loggedInClient && loggedInClient.label) {
    data["client_name"] = loggedInClient;
  }
  const handleFormSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    let Data = {};
    Data.client_id = values.client_name.value;
    Data.location_id = values.location_name.value;
    Data.name = values.name;
    if (values.lat) {
      Data.lat = values.lat;
    }
    if (values.lng) {
      Data.lng = values.lng;
    }
    if (values.min_floor) {
      Data.min_floor = values.min_floor;
    }
    if (values.max_floor) {
      Data.max_floor = values.max_floor;
    }

    try {
      const { success, results } = await insert_Block(Data);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Building Added successfully"}
            type="success"
            duration={2500}
          >
            Building Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        let data = results?.data?.data;
        if (buttonType == "save") {
          navigate("/block");
        } else if (buttonType == "add_more") {
          setSubmitting(false);
          resetForm();
        } else {
          navigate("/facility-AddNew", { state: data });
        }
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
    dispatch(toggleExitConfirmation(true));
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="ml-3">Add Building</h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">
            Please provide details of each and every Building.
          </div>
        </div>
        {data ? (
          <BlockForm
            initialData={data}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <BlockForm
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

export default BlockAdd;
