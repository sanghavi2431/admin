import { AdaptableCard } from "@/components/shared";
import UserForm from "../hostOfferEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getHostOfferById, updateHostOffer } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiSolidOffer } from "react-icons/bi";

import dayjs from "dayjs";
injectReducer("hostOfferEdit", reducer);

const HostOfferEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const hostOfferData = useSelector((state) => state.hostOfferEdit.data.hostOfferList);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.hostOfferEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getHostOfferById(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    let start_date = dayjs(values.start_date).format("YYYY-MM-DD")+" 00:00:00";
    let end_date = dayjs(values.end_date).format("YYYY-MM-DD")+" 00:00:00";
    let formData = new FormData();

    formData.append("id", Id);
    formData.append("title", values.title.trim());
    formData.append("description", values.description);
    formData.append("woloo_code", values.woloo_id);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("status", values.status.value);
    if(typeof (values?.image)=="object"){
    formData.append("image", values.image?.[0]);

    }

    try {
      const success = await updateHostOffer(formData);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Woloo Host Offer Edited successfully"}
            type="success"
            duration={2500}
          >
            Woloo Host Offer Edited successfully
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
          <BiSolidOffer size={"30"} />
          <h3 className="ml-5">Woloo Host Offer Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(hostOfferData) && (
            <>
              <UserForm
                type="edit"
                initialData={hostOfferData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(hostOfferData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Woloo Host Offer found!"
            />
            <h3 className="mt-8">No Woloo Host Offer found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default HostOfferEdit;
