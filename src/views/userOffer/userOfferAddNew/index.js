import { AdaptableCard } from "@/components/shared";
import UserOfferForm from "../userOfferAddNewForm";
import dayjs from "dayjs";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newUserOffer } from "./store/dataSlice";
import { MdLocalOffer } from "react-icons/md";

injectReducer("UserOfferAdd", reducer);

const UserOfferNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(false);
    let Data = {};
    let pad = function(num) { return ('00'+num).slice(-2) };
   let date = new Date(values.expiry_date);
       date = date.getUTCFullYear()         + '-' +
        pad(date.getUTCMonth() + 1)  + '-' +
        pad(date.getUTCDate())       + ' ' +
        pad(date.getHours())      + ':' +
        pad(date.getUTCMinutes())    + ':' +
        pad(date.getUTCSeconds());

    Data.mobile = values.mobile;
    Data.offer_id = values.offer.value;
    Data.expiry_date = date

    try {
      const { success, results } = await newUserOffer(Data);

      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New User Offer added"}
            type="success"
            duration={2500}
          >
            New User Offer added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/userOffer");
      }
    } catch (error) {
      toast.push(
        <Notification type="warning" duration={2500}>
          {error.response.data.error.message}
        </Notification>,
        {
          placement: "top-center",
        }
      );
      setSubmitting(false);
    }
  };
  const handleDiscard = () => {
    navigate("/userOffer");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-5">
          <MdLocalOffer size={"30"} />
          <h3 className="ml-5 "> User Offer Add</h3>
        </div>
        <>
          <UserOfferForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default UserOfferNew;
