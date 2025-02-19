import { AdaptableCard } from "@/components/shared";
import CorporateForm from "../corporateAddNewForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newCorporate } from "./store/dataSlice";
import { HiBuildingOffice2 } from "react-icons/hi2";

injectReducer("corporateAdd", reducer);

const CorporateNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(false);
    var Data = {};
    Data.name = values.name.trim();
    Data.contact_name = values.contact_name.trim();
    Data.mobile = values.mobile;
    Data.email = values.email.trim();
    Data.mobile2 = values.mobile2;
    Data.city = values.city;
    Data.address = values.address.trim();
    Data.type = values.type.label;

    try {
      const { success, results } = await newCorporate(Data);

      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New corporates added"}
            type="success"
            duration={2500}
          >
            New corporate added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/corporates");
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
    navigate("/corporates");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-5">
          <HiBuildingOffice2 size={"30"} />
          <h3 className="ml-5 "> Corporates Add</h3>
        </div>
        <>
          <CorporateForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default CorporateNew;
