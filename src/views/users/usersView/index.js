import { AdaptableCard } from "@/components/shared";
import UsersForm from "../userViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiUser } from "react-icons/hi";

injectReducer("userListView", reducer);

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userListView.data.usersList);
  const loading = useSelector((state) => state.userListView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getUser(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
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
          <h3 className="ml-5">Woloo Guest View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(userData) && (
            <>
              <UsersForm
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
              alt="No product found!"
            />
            <h3 className="mt-8">No Woloo Guest found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UserEdit;
