import { AdaptableCard } from "@/components/shared";
import UserForm from "../usersEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getEditUser, updateUser } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiUser } from "react-icons/hi";

import dayjs from "dayjs";
injectReducer("userEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userEdit.data.usersList);
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.userEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getEditUser(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    let DOB = dayjs(values.dob).format("YYYY-MM-DD");

    setSubmitting(true);
    var formData = new FormData();
    formData.append("id", Id);
    formData.append("role_id", values.role.value);
    formData.append("name", values.name.trim());
    formData.append("mobile", values.mobile);
    formData.append("email", values.email.trim());
    formData.append("city", values.city);
    formData.append("pincode", values.pincode);
    formData.append("address", values.address.trim());
    formData.append("lat", values.lat);
    formData.append("lng", values.lng);
    formData.append("gender", values.gender.label);
    formData.append("status", values.status.value);
    formData.append("dob", DOB);
    if (values.avatar !== null) {
      formData.append("avatar", values.avatar[0]);
    }

    try {
      const success = await updateUser(formData);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Woloo Guest Edited successfully"}
            type="success"
            duration={2500}
          >
            Woloo Guest Edited successfully
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
          <HiUser size={"30"} />
          <h3 className="ml-5">Woloo Guest Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(userData) && (
            <>
              <UserForm
                type="edit"
                initialData={userData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(userData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Woloo Guest found!"
            />
            <h3 className="mt-8">No Woloo Guest found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UsersEdit;
