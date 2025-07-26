import React, { useEffect, useState } from "react";
import { AdaptableCard, RichTextEditor } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetch_All__Categories, fetch_All__SubCategories } from "../store/dataSlice";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const ActiveBlogInformationFields = (props) => {
  const { values, touched, errors } = props;
  const [selectedCategories, setSelectedCategories] = useState(values.blog_category ? values.blog_category : [])
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.activeBlogEditForm.data.categoryList);
  function getIds(data) {
    let ids = data?.map((cat) => +cat.value)
    return ids
  }
  useEffect(() => {
    let data = { "pageIndex": 1, "pageSize": 10, "query": "", "sort": { "key": "", "order": "" }, "isAll": true }
    dispatch(fetch_All__Categories(data))
  }, []);
  const subCategoryData = useSelector((state) => state.activeBlogEditForm.data.subCategoryData);

  useEffect(() => {
    let data = { "pageIndex": 1, "pageSize": 10, "query": "", "sort": { "key": "", "order": "" }, "isAll": true, "id": getIds(selectedCategories) }
    dispatch(fetch_All__SubCategories(data))
  }, [selectedCategories]);

  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          <FormItem
            label="Blog Category*"
            invalid={errors.blog_category && touched.blog_category}
            errorMessage={errors.blog_category}
          >
            <Field name="blog_category">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={categoryList}
                  isMulti
                  isSearchable={true}
                  value={values.blog_category}
                  onChange={(option) =>
                    option
                      ? (form.setFieldValue(field.name, option), setSelectedCategories(option))
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Blog Sub-Category*"
            invalid={errors.blog_sub_category && touched.blog_sub_category}
            errorMessage={errors.blog_sub_category}
          >
            <Field name="blog_sub_category">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={subCategoryData}
                  isMulti
                  isSearchable={true}
                  value={values.blog_sub_category}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, option)
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>

        <div className="col-span-1">
          <FormItem
            label="Blog Title*"
            invalid={errors.title && touched.title}
            errorMessage={errors.title}
          >
            <Field
              type="text"
              autoComplete="off"
              name="title"
              value={values.title || ""}
              component={Input}
              placeholder="Blog Title"
            />
          </FormItem>
        </div>
        <div className="col-span-3">
          <FormItem
            label="Blog Content*"
            invalid={errors.content && touched.content}
            errorMessage={errors.content}
          >
            <Field name="content">
              {({ field, form }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={val => form.setFieldValue(field.name, val)}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Status*"
            invalid={errors.status && touched.status}
            errorMessage={errors.status}
          >
            <Field name="status">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  options={status}
                  value={values.status}
                  onChange={(option) =>
                    option
                      ? form.setFieldValue(field.name, {
                        label: option.label,
                        value: option.value,
                      })
                      : form.setFieldValue(field.name, {})
                  }
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-2 text-lg font-bold">
          Product Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormItem
            label="Product Id"
            invalid={errors.shop_map_id && touched.shop_map_id}
            errorMessage={errors.shop_map_id}
          >
            <Field
              type="text"
              autoComplete="off"
              name="shop_map_id"
              value={values.shop_map_id || ""}
              component={Input}
              placeholder="Product Id"
            />
          </FormItem>
          <FormItem
            label="Category Id"
            invalid={errors.shop_category_id && touched.shop_category_id}
            errorMessage={errors.shop_category_id}
          >
            <Field
              type="text"
              autoComplete="off"
              name="shop_category_id"
              value={values.shop_category_id || ""}
              component={Input}
              placeholder="Category Id"
            />
          </FormItem>
        </div>
      </div>
    </AdaptableCard>
  );
};

export default ActiveBlogInformationFields;
