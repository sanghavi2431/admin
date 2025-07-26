import { AdaptableCard } from "@/components/shared";
import ActiveBlogForm from "../activeBlogEditForm";
import React, { useEffect } from "react";
import { Loading, DoubleSidedImage } from "@/components/shared";
import { toast, Notification } from "@/components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useLocation, useNavigate } from "react-router-dom";
import { getActiveBlogById, updateActiveblog } from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import { BsFileEarmarkCheckFill } from "react-icons/bs";

injectReducer("activeBlogEdit", reducer);

const ActiveBlogEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const activeBlogData = useSelector(
    (state) => state.activeBlogEdit.data.activeBlogData
  );
  const Id = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const loading = useSelector((state) => state.activeBlogEdit.data.loading);
  const fetchData = (data) => {
    if (loading) return;
    dispatch(getActiveBlogById(data));
  };
  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let blog_category = values.blog_category?.map((cat) => { return +cat.value })
    let blog_Sub_Category = values.blog_sub_category?.map((cat) => { return +cat.value })
    let form = new FormData();
    form.append("id", Id);
    if (values?.main_image?.length) {
      values.main_image.forEach((file) => {
        form.append("main_image", file);
      });
    }

    form.append("status", values.status.value);
    form.append("blog_category", blog_category);
    form.append("blog_sub_category", blog_Sub_Category);
    form.append("title", values.title);
    form.append("content", values.content);
    form.append("shop_map_id", values.shop_map_id);
    form.append("shop_category_id", values.shop_category_id);
    //
    try {
      const success = await updateActiveblog(form);
      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"Active Blog Edited successfully"}
            type="success"
            duration={2500}
          >
            Active Blog Edited successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/activeBlogs");
      }
    } catch (err) {
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
    setSubmitting(false);
  };
  const handleDiscard = () => {
    navigate("/activeBlogs");
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
          <BsFileEarmarkCheckFill size={"30"} />
          <h3 className="ml-5">Active Blog Edit</h3>
        </div>
        <Loading loading={loading}>
          {!isEmpty(activeBlogData) && (
            <>
              <ActiveBlogForm
                type="edit"
                initialData={activeBlogData}
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
              />
            </>
          )}
        </Loading>
        {!loading && isEmpty(activeBlogData) && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No Active Blog found!"
            />
            <h3 className="mt-8">No Active Blog found!</h3>
          </div>
        )}
      </AdaptableCard>
    </>
  );
};

export default ActiveBlogEdit;
