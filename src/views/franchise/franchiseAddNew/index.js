import { AdaptableCard } from "components/shared";
import { FaHandshake } from "react-icons/fa";
import FranchiseForm from "../franchiseAddNewForm";
import React from "react";
import { toast, Notification } from "components/ui";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getFranchise, updateFranchise } from "./store/dataSlice";

const FranchiseAdd = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const handleFormSubmit = async (values, setSubmitting) => {
    let newOpeningHour = [];
    if (values.opening_hours.length > 0) {
      for (let hour of values.opening_hours) {
        const hourObj = {
          start_time: new Date(hour.time[0]).toLocaleTimeString("it-IT"),
          end_time: new Date(hour.time[1]).toLocaleTimeString("it-IT"),
        };
        newOpeningHour.push(hourObj);
      }
    }

    let images = values.image;
    let fImage = {};
    for (let i of images) {
      fImage = { ...fImage, i };
    }

    newOpeningHour = JSON.stringify(newOpeningHour);
    setSubmitting(false);
    var formData = new FormData();

    formData.append("name", values.name.trim());
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    formData.append("address", values.address.trim());
    formData.append("city", values.city);
    formData.append("lat", values.lat);
    formData.append("lng", values.lng);
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
    formData.append("user_id", 15);
    formData.append("pincode", values.pincode);
    formData.append("is_franchise", 1);
    formData.append("restaurant", values.restaurant.value);
    formData.append("rating", values.rating);

    if (images.length > 1) {
      for (let i = 1; i <= images.length; i++) {
        formData.append("image", images[i - 1], images[i - 1].name);
      }
    }
    if (images.length == 1) {
      formData.append("image", images[0]);
    }
    try {
      const success = await updateFranchise(formData);

      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New Franchise added successfully"}
            type="success"
            duration={2500}
          >
            New Franchise added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/franchise");
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
    navigate("/franchise");
  };
  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <FaHandshake size={"30"} />
          <h3 className="ml-5">Franchise Add</h3>
        </div>

        <>
          <FranchiseForm
            type="edit"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default FranchiseAdd;