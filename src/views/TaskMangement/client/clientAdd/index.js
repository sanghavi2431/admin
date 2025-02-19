import { AdaptableCard } from "@/components/shared";
import ClientForm from "../clientForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Client } from "./store/dataSlice";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../clientForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../clientForm/store/dataSlice";

injectReducer("clientAdd", reducer);

const ClientAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buttonType = useSelector((state) => state.clientAdd?.data?.buttonType);
  const location = useLocation();
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.client_type_id = values.client_type.value;
    Data.client_name = values.client_name;

    try {
      const { success, results } = await insert_Client(Data);
      if (success) {
        setSubmitting(true);
        toast.push(
          <Notification
            title={"Client Added successfully"}
            type="success"
            duration={2500}
          >
            Client Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        let data = results?.client;
        buttonType == "save"
          ? navigate("/client")
          : navigate("/location-AddNew", { state: data });
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
    dispatch(toggleExitConfirmation(true));
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
          <h3 className="">Add Client</h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">
            In order to create the client data we need to setup details about
            the Location,Building,Facility to be managed along with booth
            details. We also need to know the shift at which Janitor's work.
            Also Janitor and Supervisors details needs to be added. System will
            allow you to do the setup at each step so please select Next and
            provide the required details.
          </div>
        </div>
        <ClientForm
          type="add"
          onFormSubmit={handleFormSubmit}
          onDiscard={handleDiscard}
        />
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default ClientAdd;
