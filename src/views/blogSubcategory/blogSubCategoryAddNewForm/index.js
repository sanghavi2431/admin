import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik, yupToFormErrors } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import reducer from "./store";
import { injectReducer } from "@/store";
import BlogsubCategoryInformationFields from "./components/BlogsubCategoryInformationFields";
import BlogsubCategoryImages from "./components/BlogsubCategoryImage";
injectReducer("blogsubcatAdd", reducer);
const validationSchema = Yup.object().shape({
  subCategory: Yup.string().trim().required("Sub Category is required"),
  category: Yup.object().required("Please select category").typeError("Choose category"),
  icon: Yup.array().min(1, "Icon is required").required("Icon is required").typeError("Icon is required")
 
});
const BlogSubCategoryForm = forwardRef((props, ref) => {
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <div className="">
                  <BlogsubCategoryInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="">
                  <BlogsubCategoryImages
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <Button
                    size="sm"
                    className=""
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

BlogSubCategoryForm.defaultProps = {
  type: "add",
  initialData: {
    subCategory: "",
    category: "",
    icon: "",
  },
};

export default BlogSubCategoryForm;
