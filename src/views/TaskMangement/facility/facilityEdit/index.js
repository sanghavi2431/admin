import { AdaptableCard } from "@/components/shared";
import FacilityForm from "../facilityForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getFacility, update_Facility } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { GrServices } from 'react-icons/gr'
import { BiLeftArrowAlt } from "react-icons/bi";
import { Button } from "@/components/ui";
import { setFacilityMappingData, setSideBarDisabled } from "@/store/auth/userSlice";
import CancelConfirmation from "../facilityForm/components/cancelConfirmation";
import { toggleExitConfirmation } from "../facilityForm/store/dataSlice";

injectReducer("facilityEdit", reducer);

const FacilityEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const buttonType = useSelector((state) => state.facilityAdd?.data?.buttonType);
  const facilityData = useSelector((state) => state.facilityEdit?.data?.facilityData);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.facilityEdit?.data?.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getFacility(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let Data = {};
    Data.id = Id
    Data.block_id = values.block_name.value
    Data.description = values.description
    Data.name = values.facility_name
    if (values.facility_type && values.facility_type.value === "other") {
      Data.facility_type = values.custom_facility_type;
      Data.isTypeOthers = true;
    } else {
      Data.facility_type = values.facility_type.value;
      Data.isTypeOthers = false;
    } 
    Data.no_of_booths = values?.booth && values?.booth[0]?.booth_name.length > 1 ? values.booth.length : 0
    Data.status = values.status.value
    Data.floor_number = Number(values.floor_no)
    Data.location_id = values.location_name.value
    // Data.client_id=values.client_name.value
    // Data.shift_ids=values.shift.map((s)=>{return s.value})
    Data.booths = values?.booth && values?.booth[0]?.booth_name.length > 1 ? values.booth : []

    try {
      const { success, results } = await update_Facility(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Facility Edited successfully"}
            type="success"
            duration={2500}
          >
            Facility Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        buttonType == "save" ? dispatch(setSideBarDisabled(false)) : dispatch(setSideBarDisabled(true));
        let data = { clients: values?.client_name, location: values?.location_name, block: values?.block_name, facility_name: { label: values?.facility_name, value: Id } }
        if (buttonType == "save") {
          navigate("/facility")
        }
        else {
          if (location?.state?.cluster?.page == "edit") {
            let isEdit = location?.state?.cluster?.id
            navigate("/cluster-AddNew", { state: data })
          }
          else {
            navigate("/cluster-AddNew", { state: data })
          }
        }
        // buttonType=="save" ? navigate("/facility"): navigate("/cluster-AddNew",{state:data});
        buttonType == "next" && dispatch(setFacilityMappingData(data))
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
    // navigate("/facility");
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
          <h3 className="">Edit Facility</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(facilityData) && (
            <>
              <FacilityForm
                id={Id}
                type="edit"
                initialData={facilityData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(facilityData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Facility found!"
            />
            <h3 className="mt-8">No Facility found!</h3>
          </div>
        )}
      </AdaptableCard>
      <CancelConfirmation />
    </>
  );
};

export default FacilityEdit;
