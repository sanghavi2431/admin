import { AdaptableCard } from "@/components/shared";
import ShiftForm from "../shiftForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getShift, update_Shift } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../shiftForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../shiftForm/store/dataSlice";

injectReducer("shiftEdit", reducer);

const ShiftEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.shiftAdd?.data?.buttonType);
  const shiftData = useSelector((state) => state.shiftEdit?.data?.shiftData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state?.shiftEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getShift(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.id=Id
    Data.shift_name = values.shift_name;
    Data.location_id = values.location_name.value;
    Data.start_time = new Date(values.start_time).getHours()+":"+new Date(values.start_time).getMinutes()+":"+"00";
    Data.end_time = new Date(values.end_time).getHours()+":"+new Date(values.end_time).getMinutes()+":"+"00";
    Data.client_id = values.client_name.value;
    Data.status = values.status.value;

    // Data.start_time=

    try {
      const success = await update_Shift(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Shift Edited successfully"}
            type="success"
            duration={2500}
          >
            Shift Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)):dispatch(setSideBarDisabled(true)) ;
        let data={client_name:values?.client_name,location_name:values?.location_name,shift:{label:values?.shift_name,value:Id}}
        if( buttonType=="save"){
          navigate("/shift")
        }
        else{
          if(location?.state?.task_temp?.page=="edit"){
            let isEdit=location?.state?.task_temp?.id
            navigate(`/task_template-Edit/${isEdit}`,{state:location?.state})
          }
          else{
            navigate("/task_template-AddNew",{state:data})
          }
        }
        // buttonType=="save" ? navigate("/shift"): navigate("/task_template-AddNew",{state:data});
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
          <h3 className="">Shift Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(shiftData) && (
            <>
              <ShiftForm
                type="edit"
                initialData={shiftData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(shiftData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              Shift="/img/others/img-2-dark.png"
              alt="No Shift found!"
            />
            <h3 className="mt-8">No Shift found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default ShiftEdit;
