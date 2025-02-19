import { AdaptableCard } from "@/components/shared";
import BlogSubCategoryForm from "../blogSubCategoryViewForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getblogSubCategory } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { HiBuildingOffice2 } from "react-icons/hi2";

injectReducer("blogSubCategoryView", reducer);

const UserEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const blogSubcategoryData = useSelector(
    (state) => state.blogSubCategoryView.data.corporatesList
  );
  const loading = useSelector((state) => state.blogSubCategoryView.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getblogSubCategory(data));
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
  };

  const handleDiscard = () => {
    navigate("/blogSubCategory");
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
          <h3 className="ml-5">Blog Sub Category View</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(blogSubcategoryData) && (
            <>
              <BlogSubCategoryForm
                type="edit"
                initialData={blogSubcategoryData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(blogSubcategoryData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Blog Sub Category found!"
            />
            <h3 className="mt-8">No Blog Sub Category found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UserEdit;
