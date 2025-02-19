import { AdaptableCard } from "@/components/shared";
import { FaHandshake } from "react-icons/fa";
import FranchiseViewForm from "../franchiseViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getFranchise } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";

injectReducer("FranchiseListView", reducer);

const FranchiseEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const wolooData = useSelector(
    (state) => state.FranchiseListView.data.woloosList
  );

  const loading = useSelector((state) => state.FranchiseListView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getFranchise(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
  };

  const handleDiscard = () => {
    navigate("/franchise");
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
          <FaHandshake size={"30"} />
          <h3 className="ml-5">Franchise View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(wolooData) && (
            <>
              <FranchiseViewForm
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
              alt="No Franchise found!"
            />
            <h3 className="mt-8">No Franchise found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default FranchiseEdit;
