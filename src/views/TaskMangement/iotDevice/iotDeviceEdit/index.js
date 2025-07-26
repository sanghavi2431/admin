import { AdaptableCard } from "@/components/shared";
import BlockForm from "../iotDeviceForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getIOTDevice, update_IOTDevice } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";

injectReducer("iotDeviceEdit", reducer);

const IotDeviceEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const iotDeviceData = useSelector((state) => state.iotDeviceEdit.data.iotDeviceData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.iotDeviceEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getIOTDevice(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.status=values.status.value
    Data.device_id = Id;
    Data.trigger_value = values.trigger_value;
    Data.healthy={"min":values?.healthy_min,"max":values?.healthy_max};
    Data.moderate={"min":values?.moderate_min,"max":values?.moderate_max};
    Data.unhealthy={"min":values?.unhealthy_min,"max":values?.unhealthy_max};

    try {
      const success = await update_IOTDevice(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"IOT Device Edited successfully"}
            type="success"
            duration={2500}
          >
            IOT Device Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/iotDevice");
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
    navigate("/iotDevice");
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
          <h3 className="">IOT Device Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(iotDeviceData) && (
            <>
              <BlockForm
                type="edit"
                initialData={iotDeviceData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(iotDeviceData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No IOT Device found!"
            />
            <h3 className="mt-8">No IOT Device found!</h3>
          </div>
        )} 
      </AdaptableCard>
    </>
  );
};

export default IotDeviceEdit;
