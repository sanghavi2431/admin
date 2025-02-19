import { AdaptableCard } from "@/components/shared";
import UserOfferForm from "../userOfferEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserOfferbyId, updateUserOffer } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { MdLocalOffer } from "react-icons/md";

injectReducer("userOfferEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userOfferData = useSelector(
    (state) => state.userOfferEdit.data.userOfferList
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.userOfferEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getUserOfferbyId(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var Data = {};
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
     Data.expiry_date = date;
    Data.status = values.status.value;
    Data.id = Id;


    //
    try {
      const success = await updateUserOffer(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"User Offer Edited successfully"}
            type="success"
            duration={2500}
          >
            User Offer Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/userOffer");
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
    navigate("/userOffer");
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
        <div className="flex items-center mb-5">
          <MdLocalOffer size={"30"} />
          <h3 className="ml-5">User Offer Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(userOfferData) && (
            <>
              <UserOfferForm
                type="edit"
                initialData={userOfferData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(userOfferData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No User Offer found!"
            />
            <h3 className="mt-8">No User Offer found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UsersEdit;
