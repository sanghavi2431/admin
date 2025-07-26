import { AdaptableCard } from "@/components/shared";
import Task_checklistForm from "../task_checklistForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_task_checklist } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "../task_checklistForm/components/cancelConfirmation";
import { setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../task_checklistForm/store/dataSlice";

injectReducer("task_checklistAdd", reducer);

const Task_checklistAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const buttonType = useSelector((state) => state.task_checklistAdd?.data?.buttonType);

  let data = {
    client_name: "",
    task_name: "",
  };

  if (location?.state) {    
    data.client_name = location?.state?.client_name
  }
  if (loggedInClient) {
    data.client_name = loggedInClient
  }
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("task_name", values?.task_name);
    form.append("category", values?.task_category?.value)
    form.append("required_time", values?.estimated_time)
    if (values?.client_name) {
      form.append("client_id", values?.client_name?.value);
    }
    if (values.image_url?.length) {
      form.append("image", values.image_url[0]);
    }

    try {
      const { success, results } = await insert_task_checklist(form);
      if (success) {
        setSubmitting(true);
        // dispatch(setProgressState(results.checkpoint));
        toast.push(
          <Notification
            title={"Task Added successfully"}
            type="success"
            duration={2500}
          >
            Task Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        if (buttonType == "save") {
          navigate("/task_checklist")
        }
        else if (location?.state?.task_template?.page == "edit") {
          navigate(`/task_template-Edit/${location?.state?.task_template?.id}`, { state: location?.state })

        }
        else {
          navigate("/task_template-AddNew", { state: location?.state })
        }
        buttonType == "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(true));

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
          <h3 className="ml-3">Add Task Checklist </h3>

        </div>
        <div className="mb-8">
          <div className="font-bold">
            Please specify the different task which janitors are going to perform.
          </div>
        </div>
        <Task_checklistForm
          initialData={data}
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />

      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default Task_checklistAdd;
