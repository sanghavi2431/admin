import { AdaptableCard } from "@/components/shared";
import BlogSubcategoryAddForm from "../blogSubCategoryAddNewForm";
import React, { useEffect } from "react";
import { toast, Notification } from "@/components/ui";
import reducer from "./store";
import { injectReducer } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { addBlogCategory } from "./store/dataSlice";
import { MdCategory } from "react-icons/md";

injectReducer("blogSubcategoryAdd", reducer);

const BlogsubcategoryAddnew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, setSubmitting) => {
    setSubmitting(true);
    let form = new FormData();
    form.append("icon", values.icon[0]);
    form.append("category_id", values.category.value);
    form.append("sub_category", values.subCategory.trim());

    try {
      const { success, results } = await addBlogCategory(form);

      if (success) {
        setSubmitting(false);

        toast.push(
          <Notification
            title={"New Blog Sub-category added"}
            type="success"
            duration={2500}
          >
            New Blog Sub-category added successfully
          </Notification>,
          {
            placement: "top-center",
          }
        );
        navigate("/blogSubCategory");
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
    navigate("/blogSubCategory");
  };

  return (
    <>
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="flex items-center mb-5">
          <MdCategory size={"30"} />
          <h3 className="ml-5 "> Blog Sub-category Add</h3>
        </div>
        <>
          <BlogSubcategoryAddForm
            type="add"
            onFormSubmit={handleFormSubmit}
            onDiscard={handleDiscard}
          />
        </>
      </AdaptableCard>
    </>
  );
};

export default BlogsubcategoryAddnew;
