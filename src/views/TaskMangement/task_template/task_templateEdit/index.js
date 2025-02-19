import { AdaptableCard } from "@/components/shared";
import Template_Form from "../task_templateForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getTask_temp, update_temp } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import CancelConfirmation from "../task_templateForm/components/cancelConfirmation";
import { setFacilityMappingData, setSideBarDisabled } from "@/store/auth/userSlice";
import { toggleExitConfirmation } from "../task_templateForm/store/dataSlice";

injectReducer("tasktempEdit", reducer);

const TaskTempEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.taskAdd?.data?.buttonType);
  const facilityMappingData  = useSelector((state) => state.auth.user.facilityMappingData);
  const tempData = useSelector((state) => state.tasktempEdit?.data?.tempData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.tasktempEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getTask_temp(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.id=Id
    Data.status=values.status.value
    Data.template_name = values.template_name;
    Data.description = values.description;
    Data.task_ids = values.task_ids.map((task)=>{return task.value} );
    Data.estimated_time = values.estimated_time;
    Data.days = values?.days?.map((day)=>{return day.label});
    Data.shift_ids = values?.shift_ids?.map((shift)=>{return shift.value});


    try {
      const success = await update_temp(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Task Template Edited successfully"}
            type="success"
            duration={2500}
          >
            Task Template Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;
        let data={template_name:{label:values?.template_name,value:Id}}
        if( buttonType=="save"){
          navigate("/task_template")
        }
        else{
          if(location?.state?.supervisor?.page=="edit"){
            let isEdit=location?.state?.supervisor?.value
            navigate(`/supervisor-Edit/${isEdit}`,{state:location?.state})
          }
          else{
            navigate("/supervisor-AddNew",{state:data})
          }
        }
        buttonType == "next"  && dispatch(setFacilityMappingData({...facilityMappingData,templates:{label:values?.template_name,value:Id}}))

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
          <h3 className="">Task Template Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(tempData) && (
            <>
              <Template_Form
              id={Id}
                type="edit"
                initialData={tempData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(tempData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Task Template found!"
            />
            <h3 className="mt-8">No Task Template found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default TaskTempEdit;
