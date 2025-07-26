import { AdaptableCard } from "@/components/shared";
import LocationForm from "../locationForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { insert_Location } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setFirstTime, setProgressState, setSideBarDisabled } from "@/store/auth/userSlice";
import MapConfirmation from "./components/MapConfirmation";
import CancelConfirmation from "../locationForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../locationForm/store/dataSlice";
import PaymentPlansConfirmation from "@/views/TaskMangement/payment/paymentOnToggle";

injectReducer("locationAdd", reducer);

const LocationAdd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loggedInClient = useSelector((state) => state.auth.user.clientId);
  const checkpoints = useSelector((state) => state.auth.user.progressState);
  const buttonType = useSelector(
    (state) => state.locationForm?.data?.buttonType
  );
  let client;
  client = location?.state && location?.state;
  
  if (loggedInClient && loggedInClient.label) {
    client = loggedInClient;
  }

  let data = {
    client_name: client,
    location_name: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    pincode: "",
  };

  useEffect(() => {
    return () => {
      dispatch(setFirstTime(false));
    };
  }, []);
  
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("location_name", values.location_name);
    form.append("address", values.address);
    form.append("pincode", values.pincode);
    form.append("city", values.city);
    form.append("client_id", values.client_name.value);
    form.append("lat", values.lat);
    form.append("lng", values.lng);
    if (values?.image_url?.length) {
      form.append("image", values.image_url[0]);
    }

    try {
      const { success, results } = await insert_Location(form);
      if (success) {
        setSubmitting(true);
        if (results?.checkpoint){
          dispatch(setProgressState(results.checkpoint));
        }
        toast.push(
          <Notification
            title={"Location Added successfully"}
            type="success"
            duration={2500}
          >
            Location Added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save"
          ? dispatch(setSideBarDisabled(false))
          : dispatch(setSideBarDisabled(true));
        let data = results?.data;
        data.lat = values.lat;
        data.lng = values.lng;
        buttonType == "save"
          ? navigate("/location")
          : navigate("/block-AddNew", { state: data });
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
        <div className="flex items-center mb-4">
          <Button
            shape="circle"
            variant="plain"
            size="lg"
            icon={<BiLeftArrowAlt />}
            onClick={() => handleDiscard()}
          />
          <h3 className="ml-3">Add Location </h3>
        </div>
        <div className="mb-8">
          <div className="font-bold">Please specify the exact location.</div>
        </div>
        {data ? (
          <LocationForm
            initialData={data}
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        ) : (
          <LocationForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        )}
      </AdaptableCard>
      <CancelConfirmation />
      <PaymentPlansConfirmation/>
    </>
  );
};

export default LocationAdd;
