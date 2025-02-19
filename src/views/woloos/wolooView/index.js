import { AdaptableCard } from "@/components/shared";
import { HiMenu } from "react-icons/hi";
import WoloosViewForm from "../woloosViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getWoloo } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("wolooListView", reducer);

const WolooEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const wolooData = useSelector((state) => state.wolooListView.data.woloosList);

  const loading = useSelector((state) => state.wolooListView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getWoloo(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
  };

  const handleDiscard = () => {
    navigate("/woloos");
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
          <HiMenu size={"30"} />
          <h3 className="ml-5">Woloo Host View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(wolooData) && (
            <>
              <WoloosViewForm
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
            <h3 className="mt-8">No Woloo Host found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default WolooEdit;
