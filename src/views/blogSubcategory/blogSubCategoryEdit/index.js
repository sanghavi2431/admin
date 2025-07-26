import { AdaptableCard } from "@/components/shared";
import BlogSubcategoryForm from "../blogSubCategoryEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getSubcategoryById, updateSubcategory } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { MdCategory } from "react-icons/md";

injectReducer("blogSubcategoryEdit", reducer);

const BlogSubCategoryEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const categoryData = useSelector(
    (state) => state.blogSubcategoryEdit.data.blogSubcategoryList
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.blogSubcategoryEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getSubcategoryById(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("id", Id);
    form.append("category_id", values.category_name.value);
    form.append("sub_category", values.sub_category.trim());
    form.append("status", values.status.value);
    if (values?.icon?.length) {
      form.append("icon", values.icon[0]);
    }

    try {
      const success = await updateSubcategory(form);
      if (success) {
        setSubmitting(false);
        toast.push(
          <Notification
            title={"Blog Sub Category Edited successfully"}
            type="success"
            duration={2500}
          >
            Blog Sub Category Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/blogSubCategory");
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
          <MdCategory size={"30"} />
          <h3 className="ml-5">Blog Sub Category Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(categoryData) && (
            <>
              <BlogSubcategoryForm
                type="edit"
                initialData={categoryData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(categoryData) && (
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

export default BlogSubCategoryEdit;
