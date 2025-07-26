import { AdaptableCard } from "@/components/shared";
import TemplateForm from "../task_templateForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Task_temp } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setFacilityMappingData, setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../task_templateForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../task_templateForm/store/dataSlice";

injectReducer("taskAdd", reducer);

const TaskAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const initialData = {
    client_name: "",
    location_name: "",
    template_name: "",
    task_ids: "",
    description: "",
    estimated_time: "",
    days: "",
    shift_ids: "",
    status: ""
  }

  let newData = {}
  if (location?.state) {    
    newData = { ...location?.state, template_name: "", task_ids: "", description: "", estimated_time: "", days: "", shift_ids: "" }
  }
  if (loggedInClient && loggedInClient.label) {
    newData = { ...location?.state, template_name: "", task_ids: "", description: "", estimated_time: "", days: "", shift_ids: "" }
    newData.client_name = loggedInClient
  }
  // const newData=location?.state && {...location?.state,template_name:"",task_ids:"",description:"",estimated_time:"",days:"",shift_ids:""}
  const buttonType = useSelector((state) => state.taskAdd?.data?.buttonType);
  const facilityMappingData = useSelector((state) => state.auth.user.facilityMappingData);
  const handleFormSubmit = async (values, setSubmitting, resetForm) => {
    setSubmitting(true);
    let Data = {};
    // Data.client_id = values.client_name.value;
    // Data.location_id = values.location_name.value;
    Data.block_id = values.block_name.value;
    Data.template_name = values.template_name;
    Data.description = values.description;
    Data.task_ids = values.task_ids.map((task) => { return task.value });
    Data.estimated_time = values.estimated_time;
    Data.days = values?.days?.map((day) => { return day.label });
    Data.shift_ids = values?.shift_ids?.map((shift) => { return shift.value });

    try {
      const { results, success } = await insert_Task_temp(Data);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint) {
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Task Template Added successfully"}
            type="success"
            duration={2500}
          >
            Task Template Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(true));
        let data = results?.data;
        data = { ...data, ...location?.state }
        if (buttonType == "save") {
          navigate("/task_template")
        }
        else if (buttonType == "add_more") {
          setSubmitting(false);
          resetForm()
        }
        else {
          navigate("/supervisor-AddNew", { state: data })
        }
        buttonType == "next" && dispatch(setFacilityMappingData({ ...facilityMappingData, templates: results?.data?.template_name }))

      }
    } catch (err) {
      setSubmitting(false);
      let errorMessage = err?.response?.data?.error?.message;
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
    dispatch(toggleExitConfirmation(true))
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
          <h3 className="ml-3">Add Task Template</h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">
            Please define the template where task will be perform, along with Estimated time.
          </div>
        </div>
        {
          Object.keys(newData).length ? <TemplateForm
            initialData={newData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          /> : <TemplateForm
            initialData={initialData}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        }
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default TaskAdd;
