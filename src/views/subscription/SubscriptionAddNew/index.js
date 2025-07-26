import { AdaptableCard } from "@/components/shared";
import SubscriptionForm from "../SubscriptionNewForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newSubscription } from "./store/dataSlice";
import { GiMoneyStack } from "react-icons/gi";

injectReducer("subscriptionAdd", reducer);

const SubscriptionNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(false);
    let price_with_gst = _.round(values.price * 1.18, 2);
    let strike_out_price = _.round(values.price * 1.18, 2);
    let discounted_price = _.round(
      values.price * (1 - values.discount / 100) * 1.18,
      2
    );
    var formData = new FormData();

    formData.append("name", values.name.trim());
    formData.append("days", values.days.label);
    formData.append("discount", values.discount);
    formData.append("backgroud_color", values.backgroud_color);
    formData.append("shield_color", values.shield_color);
    formData.append("is_recommended", values.is_recommended.value);
    formData.append("description", values.description.trim());
    formData.append("is_voucher", values.is_voucher.value);
    formData.append("price_with_gst", price_with_gst);
    formData.append("price", values.price);
    if (values.discount == 0) {
      formData.append("strike_out_price", values.price);
      formData.append("before_discount_price", values.price);
    }
    if (values.discount > 0) {
      formData.append("strike_out_price", strike_out_price);
      formData.append("before_discount_price", strike_out_price);
    }

    formData.append("image", values.image[0]);
    formData.append(
      "is_insurance_available",
      values.is_insurance_available.value
    );
    if (values.is_insurance_available.value == "1") {
      formData.append("insurance_desc", values.insurance_desc);
    }
    try {
      setSubmitting(true);
      const success = await newSubscription(formData);
      if (success) {
        toast.push(
          <Notification
            title={"New Subscription added successfully"}
            type="success"
            duration={2500}
          >
            New Subscription added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/subscription");
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
    navigate("/subscription");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center ">
          <GiMoneyStack size={"30"} />
          <h3 className="ml-5"> Subscription Add</h3>
        </div>
        <>
          <SubscriptionForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default SubscriptionNew;
