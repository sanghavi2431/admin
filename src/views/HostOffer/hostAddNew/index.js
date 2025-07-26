import { AdaptableCard } from "@/components/shared";
import { BiSolidOffer } from "react-icons/bi";
import HostOfferForm from "../hostOfferAddNewForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newHostOffer } from "./store/dataSlice";
import dayjs from "dayjs";

injectReducer("hostOfferAdd", reducer);

const HostOfferNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    let start_date = dayjs(values.start_date).format("YYYY-MM-DD")+" 00:00:00";
    let end_date = dayjs(values.end_date).format("YYYY-MM-DD")+" 00:00:00";
    let formData = new FormData();

    formData.append("title", values.title.trim());
    formData.append("description", values.description);
    formData.append("woloo_code", values.woloo.trim());
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    if(values?.img[0]){
    formData.append("image", values.img[0]);

    }

    try {
      const { success } = await newHostOffer(formData);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New Host Offer added successfully"}
            type="success"
            duration={2500}
          >
            New Host Offer added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/hostOffer");
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
    navigate("/hostOffer");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <BiSolidOffer size={"30"} />
          <h3 className="ml-5"> Host Offer Add</h3>
        </div>

        <>
          <HostOfferForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default HostOfferNew;
