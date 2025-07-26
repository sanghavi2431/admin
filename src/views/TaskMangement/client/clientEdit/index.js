import { AdaptableCard } from "@/components/shared";
import ClientForm from "../clientForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getClient, update_Client } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../clientForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../clientForm/store/dataSlice";
import { setClientId } from "@/store/auth/userSlice";

injectReducer("clientEdit", reducer);

const ClientEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const buttonType = useSelector((state) => state?.clientAdd?.data?.buttonType);
  const navigate = useNavigate();
  const clientData = useSelector((state) => state?.clientEdit?.data?.clientData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state?.clientEdit?.data?.loading);
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getClient(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.client_type_id = values.client_type.value
    Data.id = Id
    Data.status = values.status.value
    Data.client_name = values.client_name

    try {
      const { success, results } = await update_Client(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Client Edited successfully"}
            type="success"
            duration={2500}
          >
            Client Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(true));
        if (loggedInClient) {
          dispatch(setClientId({ label: values.client_name, value: loggedInClient?.value }))
        }
        if (buttonType == "save") {
          navigate("/client")
        }
        else {
          if (location?.state?.location?.page == "edit") {
            let isEdit = location?.state?.location?.id
            navigate(`/location-Edit/${isEdit}`, { state: location?.state })
          }
          else {
            let data = { label: values?.client_name, value: Id }
            navigate("/location-AddNew", { state: data })
          }
        }
        // buttonType=="save" ? navigate("/client"): navigate("/location-AddNew",{state:data});
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
    dispatch(toggleExitConfirmation(true))
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
          <h3 className="ml-3">Edit Client</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(clientData) && (
            <>
              <ClientForm
                type="edit"
                initialData={clientData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(clientData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Client found!"
            />
            <h3 className="mt-8">No Client found!</h3>
          </div>
        )}
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default ClientEdit;
