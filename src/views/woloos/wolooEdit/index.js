import { AdaptableCard } from "@/components/shared";
import { HiMenu } from "react-icons/hi";
import WoloosForm from "../woloosEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getWoloo, updateWoloo } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("wolooListEdit", reducer);

const WolooEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const wolooData = useSelector((state) => state.wolooListEdit.data.woloosList);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  const loading = useSelector((state) => state.wolooListEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getWoloo(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    let newOpeningHour = [];
    for (let hour of values.opening_hours) {
      const hourObj = {
        start_time: hour.time[0].toLocaleTimeString("it-IT"),
        end_time: hour.time[1].toLocaleTimeString("it-IT"),
      };
      newOpeningHour.push(hourObj);
    }
    let images = values.image;
    newOpeningHour = JSON.stringify(newOpeningHour);

    setSubmitting(true);

    var formData = new FormData();
    formData.append("name", values.name.trim());
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    formData.append("status", values.status.value);
    formData.append("address", values.address.trim());
    formData.append("city", values.city);
    formData.append("lat", values.lat);
    formData.append("lng", values.lng);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);
    formData.append("opening_hours", newOpeningHour);
    formData.append("segregated", values.segregated.value);
    formData.append("is_covid_free", values.is_covid_free.value);
    formData.append("is_safe_space", values.is_safe_space.value);
    formData.append("is_clean_and_hygiene", values.is_clean_and_hygiene.value);
    formData.append(
      "is_sanitary_pads_available",
      values.is_sanitary_pads_available.value
    );
    formData.append(
      "is_makeup_room_available",
      values.is_makeup_room_available.value
    );
    formData.append("is_coffee_available", values.is_coffee_available.value);
    formData.append(
      "is_sanitizer_available",
      values.is_sanitizer_available.value
    );
    formData.append("is_feeding_room", values.is_feeding_room.value);
    formData.append(
      "is_wheelchair_accessible",
      values.is_wheelchair_accessible.value
    );
    formData.append("is_washroom", values.is_washroom.value);
    formData.append("is_premium", values.is_premium.value);
    formData.append("recommended_by", values.recommended_by);
    formData.append("recommended_mobile", values.recommended_mobile);
    formData.append("code", values.code);
    formData.append("pincode", values.pincode);
    formData.append("is_franchise", values.is_franchise.value);
    formData.append("restaurant", values.restaurant.value);
    formData.append("rating", values.rating);

    formData.append("id", Id);
    if (typeof images[0] == "object") {
      for (let i = 1; i <= images.length; i++) {
        formData.append("image", images[i - 1], images[i - 1].name);
      }
    }
    try {
      const success = await updateWoloo(formData);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Woloo Edited successfully"}
            type="success"
            duration={2500}
          >
            Woloo Host Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/woloos");
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
    navigate("/woloos");
  };

  // const popNotification = (keyword) => {
  //   toast.push(
  //     <Notification
  //       title={`Successfully ${keyword}`}
  //       type="success"
  //       duration={2500}
  //     >
  //       Woloo Host successfully {keyword}
  //     </Notification>,
  //     {
  //       placement: "top-center",
  //     }
  //   );
  //   navigate("/woloos");
  // };

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
          <HiMenu size={"30"} />
          <h3 className="ml-5">Woloo Host Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(wolooData) && (
            <>
              <WoloosForm
                type="edit"
                initialData={wolooData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(wolooData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Woloo Host found!"
            />
            <h3 className="mt-8">No woloo found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default WolooEdit;
