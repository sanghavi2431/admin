import { AdaptableCard } from "@/components/shared";
import { GiMoneyStack } from "react-icons/gi";
import SubscriptionForm from "../subscriptionEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getEditSubscription, updateSubscription } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
injectReducer("subscriptionEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionata = useSelector(
    (state) => state.subscriptionEdit.data.subscriptionList
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.subscriptionEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getEditSubscription(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let price_with_gst = _.round(values.price * 1.18, 2);
    let strike_out_price = _.round(values.price * 1.18, 2);
    let discounted_price = _.round(
      values.price * (1 - values.discount / 100) * 1.18,
      2
    );
    var formData = new FormData();
    formData.append("id", Id);

    formData.append("name", values.name.trim());
    formData.append("days", values.days.label);
    formData.append("discount", values.discount);
    formData.append("backgroud_color", values.backgroud_color);
    formData.append("shield_color", values.shield_color);
    formData.append("is_recommended", values.is_recommended.value);
    formData.append("description", values.description.trim());
    formData.append("is_voucher", values.is_voucher.value);
    formData.append("price_with_gst", price_with_gst);
    formData.append("price", values.price);
    if (values.discount == 0) {
      formData.append("strike_out_price", values.price);
      formData.append("before_discount_price", values.price);
    }
    if (values.discount > 0) {
      formData.append("strike_out_price", strike_out_price);
      formData.append("before_discount_price", strike_out_price);
    }

    formData.append("image", values.image[0]);
    formData.append(
      "is_insurance_available",
      values.is_insurance_available.value
    );
    if (values.is_insurance_available.value == "1") {
      formData.append("insurance_desc", values.insurance_desc);
    }

    formData.append("status", values.status.value);

    //
    try {
      setSubmitting(true);

      const success = await updateSubscription(formData);
      if (success) {
        toast.push(
          <Notification
            title={"subscription Edited successfully"}
            type="success"
            duration={2500}
          >
            Subscription Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/subscription");
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
          <h3 className="ml-5">Subscription Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(subscriptionata) && (
            <>
              <SubscriptionForm
                type="edit"
                initialData={subscriptionata}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(subscriptionata) && (
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

export default UsersEdit;
