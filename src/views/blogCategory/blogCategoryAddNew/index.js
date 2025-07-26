import { AdaptableCard } from "@/components/shared";
import BlogCategoryForm from "../blogCategoryAddNewForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { add_blogCategory } from "./store/dataSlice";
import { BiCategory } from "react-icons/bi";

injectReducer("blogCategoryAdd", reducer);

const BlogCategoryNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(false);
    let form = new FormData();
    form.append("icon", values.icon[0]);
    form.append("category_name", values.name.trim());

    try {
      const { success, results } = await add_blogCategory(form);

      if (success) {
        setSubmitting(true);

        toast.push(
          <Notification
            title={"New Blog Category added"}
            type="success"
            duration={2500}
          >
            New Blog Category added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/blogCategory");
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
      setSubmitting(false);
    }
  };
  const handleDiscard = () => {
    navigate("/blogCategory");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-5">
          <BiCategory size={"30"} />
          <h3 className="ml-5 "> Blog Category Add</h3>
        </div>
        <>
          <BlogCategoryForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default BlogCategoryNew;
