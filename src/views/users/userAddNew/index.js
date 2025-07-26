import { AdaptableCard } from "@/components/shared";
import { HiUser } from "react-icons/hi";
import UsersForm from "../usersAddNewForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import { useDispatch } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { newUser } from "./store/dataSlice";
import dayjs from "dayjs";

injectReducer("usersListAdd", reducer);

const UserNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    let DOB = dayjs(values.dob).format("YYYY-MM-DD");
    var formData = new FormData();

    formData.append("name", values.name.trim());
    formData.append("mobile", values.mobile);
    formData.append("email", values.email.trim());
    formData.append("password", 12);
    formData.append("city", values.city);
    formData.append("pincode", values.pincode);
    formData.append("address", values.address.trim());
    formData.append("lat", values.lat);
    formData.append("lng", values.lng);
    formData.append("gender", values.gender.label);
    formData.append("dob", DOB);
    formData.append("avatar", values.avatar[0]);
    formData.append("role_id", values.role.value);

    try {
      const { success } = await newUser(formData);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New Woloo Guest added successfully"}
            type="success"
            duration={2500}
          >
            New Woloo Guest added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/users");
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
    navigate("/users");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-4">
          <HiUser size={"30"} />
          <h3 className="ml-5"> Woloo Guest Add</h3>
        </div>

        <>
          <UsersForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default UserNew;
