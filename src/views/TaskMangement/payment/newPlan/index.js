import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsChevronLeft } from "react-icons/bs";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import {
  getdisplay_Addons,
  getdisplay_plans,
  setSelectedPlan
} from "./store/dataSlice";
import PlanSelection from "./PlanSelection";
import PurchasePremiumPlan from "./PurchasePremiumPlan";

injectReducer("paymentcards", reducer);
export default function Payment_cards() {
  const dispatch = useDispatch();
  const [cardsVisible, setCardsVisible] = useState(true);
  const selectedPlanId = useSelector((state) => state.paymentcards.data.selectedPlan?.id);

  useEffect(() => {
    dispatch(getdisplay_plans());
  }, []);

  useEffect(() => {    
    if(selectedPlanId) dispatch(getdisplay_Addons({ id: selectedPlanId }));
  }, [selectedPlanId]);

  const handlePlanSelect = (plan) => {
    dispatch(setSelectedPlan(plan));
    setCardsVisible(false);
  }

  return (
    <>
      {
        cardsVisible ?
          <PlanSelection handlePlanSelect={handlePlanSelect} /> :
          <div>
            <BsChevronLeft
              className="cursor-pointer"
              size={"24"}
              onClick={() => setCardsVisible(!cardsVisible)}
            />
            <PurchasePremiumPlan />
          </div>
      }
    </>
  );
}
