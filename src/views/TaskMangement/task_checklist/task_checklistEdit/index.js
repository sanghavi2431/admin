import { AdaptableCard } from "@/components/shared";
import LocationForm from "../task_checklistForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getTask_checklist, update_task_checklist } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import {IoLocationSharp} from 'react-icons/io5'
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "../task_checklistForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../task_checklistForm/store/dataSlice";

injectReducer("task_checklistEdit", reducer);

const TaskEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const task_checklistData = useSelector((state) => state.task_checklistEdit.data.task_checklistData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.task_checklistEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getTask_checklist(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("id", Id);
    form.append("task_name", values.task_name);
    if(values.image_url?.length){
      form.append("image",  values.image_url[0]);
    }
    form.append("status",  values.status.value);

    try {
      const success = await update_task_checklist(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Task Checklist Edited successfully"}
            type="success"
            duration={2500}
          >
            Task Checklist Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/task_checklist");
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

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };

    fetchData(rquestParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
          <h3 className="">Edit Task Checklist</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(task_checklistData) && (
            <>
              <LocationForm
                type="edit"
                initialData={task_checklistData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
                id={Id}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(task_checklistData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Task Checklist found!"
            />
            <h3 className="mt-8">No Task Checklist found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default TaskEdit;
