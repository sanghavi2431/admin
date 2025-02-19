import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import BlogSubcategoryInformationFields from "./components/blogSubcategoryInformationFields";
import BlogsubCategoryImages from "./components/BlogsubCategoryImage";
import { injectReducer } from "@/store";
import store from "./store"

injectReducer("blogSubCategoryEdit",store)
const validationSchema = Yup.object().shape({
  sub_category: Yup.string().trim().required("Sub Category is required"),
  category_name: Yup.object().required("Please select category").typeError("Choose category"),
  status: Yup.object().required("Choose Status").typeError("Choose status"),
});

const BlogSubcategoryForm = forwardRef((props, ref) => {
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
                  <BlogSubcategoryInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <BlogsubCategoryImages
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

BlogSubcategoryForm.defaultProps = {
  type: "edit",
  initialData: {
    sub_category: "",
    category_name: "",
    icon: "",
    status: "",
  },
};

export default BlogSubcategoryForm;
