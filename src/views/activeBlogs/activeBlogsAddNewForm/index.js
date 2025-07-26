import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import BlogInformationFields from "./components/BlogInformationFields";
import BlogImages from "./components/BlogImage";
import reducer from "./store";
import { injectReducer } from "@/store/index";

injectReducer("blogAddForm", reducer);
const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Blog Title is required"),
  blog_sub_category: Yup.array().required("Please select Sub category").typeError("Choose Sub category"),
  blog_category: Yup.array().required("Please select category").typeError("Choose category"),
  content: Yup.string().trim().required("Blog Content is required"),
  main_image: Yup.array().min(1, "Main Image is required").required("Main Image is required").typeError("Main Image is required"),
  shop_map_id: Yup.string().trim().optional().typeError(""),
  shop_category_id: Yup.string().trim().optional().typeError(""),
});
const BlogCategoryForm = forwardRef((props, ref) => {
  const { initialData, onFormSubmit, onDiscard } = props;

  return (
    <>
      <Formik
        innerRef={ref}
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const formData = cloneDeep(values);
          
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <BlogInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <BlogImages
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="md:flex items-center">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave />}
                    className="text-gray-800"
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </>
  );
});

BlogCategoryForm.defaultProps = {
  type: "add",
  initialData: {
    title: "",
    blog_sub_category: "",
    blog_category: "",
    content: "",
    main_image: "",
    shop_map_id: "",
    shop_category_id: ""
  },
};

export default BlogCategoryForm;
