import React, { forwardRef } from "react";
import { FormContainer, Button } from "@/components/ui";
import { StickyFooter } from "@/components/shared";
import { Form, Formik } from "formik";
import cloneDeep from "lodash/cloneDeep";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import ActiveBlogInformationFields from "./components/activeBlogInformationFields";
import { injectReducer } from "@/store";
import store from "./store"
import ActiveBlogImages from "./components/activeBlogImage";
injectReducer("activeBlogEditForm", store)
const validationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Blog Title is required"),
  blog_sub_category: Yup.array().required("Please select Sub category").typeError("Choose Sub category"),
  blog_category: Yup.array().required("Please select category").typeError("Choose category"),
  content: Yup.string().trim().required("Blog Content is required"),
  status: Yup.object().required("Choose Status").typeError("Choose status"),
  shop_map_id: Yup.string().trim().optional().typeError(""),
  shop_category_id: Yup.string().trim().optional().typeError(""),
});

const ActiveBlogForm = forwardRef((props, ref) => {
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
                  <ActiveBlogInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
                <div className="lg:col-span-1">
                  <ActiveBlogImages
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

ActiveBlogForm.defaultProps = {
  type: "edit",
  initialData: {
    title: "",
    blog_sub_category: "",
    blog_category: "",
    content: "",
    main_image: "",
    status: "",
    shop_map_id: "",
    shop_category_id: ""
  },
};

export default ActiveBlogForm;
