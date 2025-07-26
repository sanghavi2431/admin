import { AdaptableCard } from "@/components/shared";
import BlogForm from "../activeBlogsAddNewForm";
import React from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { add_blog } from "./store/dataSlice";
import { BsFileEarmarkCheckFill } from "react-icons/bs";

injectReducer("blogAdd", reducer);

const BlogNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let blog_category = values.blog_category?.map((cat) => { return +cat.value })
    let blog_Sub_Category = values.blog_sub_category?.map((cat) => { return +cat.value })
    let form = new FormData();
    if (values?.main_image?.length) {
      values.main_image.forEach((file) => {
        form.append("main_image", file);
      });
    }
    form.append("blog_category", blog_category);
    form.append("blog_sub_category", blog_Sub_Category);
    form.append("title", values.title);
    form.append("content", values.content);
    form.append("shop_map_id", values.shop_map_id);
    form.append("shop_category_id", values.shop_category_id);

    try {
      const { success } = await add_blog(form);

      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New Blog added"}
            type="success"
            duration={2500}
          >
            New Blog added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/activeBlogs");
      }
    } catch (error) {
      toast.push(
        <Notification type="warning" duration={2500}>
          {error.response.data.error.message}
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

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-5">
          <BsFileEarmarkCheckFill size={"30"} />
          <h3 className="ml-5 "> Blog Add</h3>
        </div>
        <>
          <BlogForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default BlogNew;
