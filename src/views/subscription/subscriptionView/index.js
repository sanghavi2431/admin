import { AdaptableCard } from "@/components/shared";
import { GiMoneyStack } from "react-icons/gi";
import SubscriptionForm from "../subscriptionViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getSubscription } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("subscriptionListView", reducer);

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionData = useSelector(
    (state) => state.subscriptionListView.data.subscriptionList
  );
  const loading = useSelector(
    (state) => state.subscriptionListView.data.loading
  );
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getSubscription(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
  };

  const handleDiscard = () => {
    navigate("/subscription");
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
          <GiMoneyStack size={"30"} />
          <h3 className="ml-5">Subscription View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(subscriptionData) && (
            <>
              <SubscriptionForm
                type="edit"
                initialData={subscriptionData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(subscriptionData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Subscription found!"
            />
            <h3 className="mt-8">No Subscription found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UserEdit;
