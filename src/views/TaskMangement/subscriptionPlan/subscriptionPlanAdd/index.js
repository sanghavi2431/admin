import { AdaptableCard } from "@/components/shared";
import PlanForm from "../subscriptionPlanForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_plan } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";

injectReducer("planAdd", reducer);

const PlanAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.name = values.name;
    Data.amount = +values.amount;
    Data.no_of_logins = +values.no_of_logins;
    Data.no_of_facilities = +values.no_of_facilities;
    Data.no_of_locations = +values.no_of_locations;
    Data.description = values.description;



    try {
      const { success, results } = await insert_plan(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Plan Added successfully"}
            type="success"
            duration={2500}
          >
            Plan Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/plan")

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
    navigate("/plan")
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
          <h3 className="">Add Plan</h3>
        </div>
        <PlanForm
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />
      </AdaptableCard>
    </>
  );
};

export default PlanAdd;
