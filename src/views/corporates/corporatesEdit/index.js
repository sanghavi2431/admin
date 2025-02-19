import { AdaptableCard } from "@/components/shared";
import CorporateForm from "../corporatesEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getEditCorporate, updateCorporate } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiBuildingOffice2 } from "react-icons/hi2";

injectReducer("corporatesEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const corporateData = useSelector(
    (state) => state.corporatesEdit.data.corporateList
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.corporatesEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getEditCorporate(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    var Data = {};
    Data.id = Id;
    Data.name = values.name.trim();
    Data.contact_name = values.contact_name.trim();
    Data.mobile = values.mobile;
    Data.email = values.email.trim();
    Data.mobile2 = values.mobile2;
    Data.city = values.city;
    Data.address = values.address.trim();
    Data.type = values.type.label;
    Data.status = values.status.value;

    //
    try {
      const success = await updateCorporate(Data);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Corporates Edited successfully"}
            type="success"
            duration={2500}
          >
            Corporates Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/corporates");
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
    navigate("/corporates");
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
          <HiBuildingOffice2 size={"30"} />
          <h3 className="ml-5">Corporates Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(corporateData) && (
            <>
              <CorporateForm
                type="edit"
                initialData={corporateData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(corporateData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Corporates found!"
            />
            <h3 className="mt-8">No Corporates found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UsersEdit;
