import { AdaptableCard } from "@/components/shared";
import UserOfferForm from "../userOfferViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserOffer } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { MdLocalOffer } from "react-icons/md";

injectReducer("userOfferView", reducer);

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userOfferData = useSelector(
    (state) => state.userOfferView.data.userOfferViewList
  );
  const loading = useSelector((state) => state.userOfferView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getUserOffer(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
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
          <h3 className="ml-5">User Offer View</h3>
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

export default UserEdit;
