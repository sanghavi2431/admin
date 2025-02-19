import { AdaptableCard } from "@/components/shared";
import LocationForm from "../locationForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocation, update_Location } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import {IoLocationSharp} from 'react-icons/io5'
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../locationForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../locationForm/store/dataSlice";
import locationAddReducer from "../locationAdd/store";

injectReducer("locationEdit", reducer);
injectReducer("locationAdd", locationAddReducer);

const LocationEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.locationForm?.data?.buttonType);
  const locationData = useSelector((state) => state.locationEdit?.data?.locationData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.locationEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getLocation(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
   
    let form = new FormData();
    form.append("id", Id);
    form.append("location_name", values.location_name);
    form.append("address", values.address);
    form.append("pincode", values.pincode);
    form.append("city", values.city);
    form.append("client_id", values.client_name.value);
    form.append("lat", values.lat);
    form.append("lng",  values.lng);
    form.append("status",  values.status.value);
    if (typeof values.image_url != "string" && values.image_url != null) {
      form.append("image",  values.image_url[0]);
    }

    try {
      const success = await update_Location(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Location Edited successfully"}
            type="success"
            duration={2500}
          >
            Location Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        if( buttonType=="save"){
          navigate("/location");
          dispatch(setSideBarDisabled(false));
        }
        else{
          if(location?.state?.block?.page=="edit"){
            let isEdit=location?.state?.block?.id

            navigate(`/block-Edit/${isEdit}`,{state:location?.state})
          }
          else{
            let data={client_name:values?.client_name,location_name:{label:values?.location_name,value:Id}}
            navigate("/block-AddNew",{state:data})
          }
        }
        // buttonType=="save" ? navigate("/location"): navigate("/block-AddNew",{state:data});
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
          <h3 className="">Edit Location</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(locationData) && (
            <>
              <LocationForm
              id={Id}
                type="edit"
                initialData={locationData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
         {!loading && isEmpty(locationData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Location found!"
            />
            <h3 className="mt-8">No Location found!</h3>
          </div>
        )} 
      </AdaptableCard>
      <CancelConfirmation/>
    </>
  );
};

export default LocationEdit;
