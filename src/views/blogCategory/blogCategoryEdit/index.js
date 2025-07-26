import { AdaptableCard } from "@/components/shared";
import BlogCategoryForm from "../blogCategoryEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlogCategorybyId, updateBlogCategory } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BiCategory } from "react-icons/bi";

injectReducer("blogCategoryEdit", reducer);

const UsersEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const blogCategoryData = useSelector(
    (state) => state.blogCategoryEdit.data.blogcategoryData
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.blogCategoryEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getBlogCategorybyId(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("category_name", values.category_name);
    form.append("id", Id);
    form.append("status", values.status.value);
    if (values?.icon?.length) {
      form.append("icon", values.icon[0]);
    }

    //
    try {
      const success = await updateBlogCategory(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Blog Category Edited successfully"}
            type="success"
            duration={2500}
          >
            Blog Category Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/blogCategory");
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
    navigate("/blogCategory");
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
          <BiCategory size={"30"} />
          <h3 className="ml-5">Blog Category Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(blogCategoryData) && (
            <>
              <BlogCategoryForm
                type="edit"
                initialData={blogCategoryData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(blogCategoryData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Blog Category found!"
            />
            <h3 className="mt-8">No Blog Category found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default UsersEdit;
