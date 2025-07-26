import { AdaptableCard } from "@/components/shared";
import ShiftForm from "../shiftForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Shift } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "../shiftForm/components/cancelConfirmation";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../shiftForm/store/dataSlice";

injectReducer("shiftAdd", reducer);

const ShiftAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const buttonType = useSelector((state) => state?.shiftAdd?.data?.buttonType);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  let newData = {
    client_name:"",
    location_name:"",
    shift_name:"",
   start_time:"",
   end_time:"",
  };
  if (location?.state) {
    newData = {
      ...location?.state,
      shift_name: "",
      start_time: "",
      end_time: "",
    };
  }
  if (loggedInClient != null && loggedInClient && loggedInClient.label) {
    newData["client_name"] = loggedInClient;
  }
  const handleFormSubmit = async (values, setSubmitting,resetForm) => {
    setSubmitting(true);
    let Data = {};
    Data.shift_name = values.shift_name;
    Data.location_id = values.location_name.value;
    Data.start_time =
      new Date(values.start_time).getHours() +
      ":" +
      new Date(values.start_time).getMinutes() +
      ":" +
      "00";
    Data.end_time =
      new Date(values.end_time).getHours() +
      ":" +
      new Date(values.end_time).getMinutes() +
      ":" +
      "00";
    Data.client_id = values.client_name.value;
    try {
      const { success, results } = await insert_Shift(Data);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Shift Added successfully"}
            type="success"
            duration={2500}
          >
            Shift Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        let data = results?.data;
        if(buttonType == "save"){
          navigate("/shift")
        }
        else if(buttonType == "add_more"){
          setSubmitting(false);
          resetForm()
        }
        else{
          navigate("/task_template-AddNew", { state: data})
        }
        // buttonType == "save"
        //   ? navigate("/shift")
        //   : navigate("/task_template-AddNew", { state: data });
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
          <h3 className="ml-3">Add Shift</h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">
            Please define the shift in which the janitors are working.
          </div>
        </div>
        {newData ? (
          <ShiftForm
            initialData={newData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <ShiftForm
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

export default ShiftAdd;
