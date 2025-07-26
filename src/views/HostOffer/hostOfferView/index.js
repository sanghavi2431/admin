import { AdaptableCard } from "@/components/shared";
import UsersForm from "../hostOfferViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getHostOffer } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiSolidOffer } from "react-icons/bi";

injectReducer("hostOfferListView", reducer);

const HostOfferEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const hostOfferData = useSelector((state) => state.hostOfferListView.data.hostOfferList);
  const loading = useSelector((state) => state.hostOfferListView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getHostOffer(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
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
          <h3 className="ml-5">Woloo Host Offer View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(hostOfferData) && (
            <>
              <UsersForm
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
              alt="No Host Offer found!"
            />
            <h3 className="mt-8">No Woloo Host Offer found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default HostOfferEdit;
