import { AdaptableCard } from "@/components/shared";
import SubscriptionIOTAddonForm from "../subscriptionIOTAddonForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_iotdevice } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";

injectReducer("subscriptionIOTAdd", reducer);

const SubscriptionIOTAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    if(values.plan_id.value) {
      Data.plan_id=values.plan_id.value
     };
    Data.amount = values.amount;
    Data.name = values.name;

    try {
      const { success, results } = await insert_iotdevice(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={" Added successfully"}
            type="success"
            duration={2500}
          >
            Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/addon")

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
    navigate("/addon")
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-2">
          <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="">Add on</h3>
        </div>
        <SubscriptionIOTAddonForm
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />
      </AdaptableCard>
    </>
  );
};

export default SubscriptionIOTAdd;
