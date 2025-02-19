import { AdaptableCard } from "@/components/shared";
import IOTDeviceForm from "../iotDeviceForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_iotDevice } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setProgressState } from "@/store/auth/userSlice";

injectReducer("iotDeviceAdd", reducer);

const IotDeviceAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  let data={
    client:"",
    location:"",
    block:"",
    facility:"",
    booth:"",
    deviceType:"",
    device_id:"",
    templates:"",
    trigger_value:"",
    healthy_min: 0,
    healthy_max: 225,
    moderate_min:225,
    moderate_max: 750,
    unhealthy_min: 750,
    unhealthy_max: 6000,
  }
  
  if(loggedInClient ){
    data["client"]=loggedInClient
  }
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.device_id = values.device_id;
    Data.mapping_id = values.booth.value;
    Data.mapping_type = values.booth?"booth":"facility";
    Data.location_id = values.location.value;
    Data.block_id = values.block.value;
    Data.device_type = values.deviceType.label;
    Data.mapping_template_id = values.templates.value;
    Data.trigger_value = values.trigger_value;
    Data.facility_id=values.facility.value
    Data.healthy={"min":values?.healthy_min,"max":values?.healthy_max};
    Data.moderate={"min":values?.moderate_min,"max":values?.moderate_max};
    Data.unhealthy={"min":values?.unhealthy_min,"max":values?.unhealthy_max};

    try {
      const {success} = await insert_iotDevice(Data);
      if (success) {
        setSubmitting(true);
        toast.push(
          <Notification
            title={"IOT Device Added successfully"}
            type="success"
            duration={2500}
          >
            IOT Device Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/iotDevice");
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
    navigate("/iotDevice");
  };

  return (
    <>
      <AdaptableCard className="h-full">
        <div className="flex items-center mb-4">
          <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="">Add IOT Device</h3>
        </div>
        <IOTDeviceForm
        initialData={data}
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />
      </AdaptableCard>
    </>
  );
};

export default IotDeviceAdd;
