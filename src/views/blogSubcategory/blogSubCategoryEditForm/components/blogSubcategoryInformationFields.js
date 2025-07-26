import React, { useEffect } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll___Categories } from "../store/dataSlice";

export const status = [
  { label: "ACTIVE", value: 1 },
  { label: "INACTIVE", value: 0 },
];
const BlogSubcategoryInformationFields = (props) => {
  const { values, touched, errors } = props;
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.blogSubCategoryEdit.data.categoryList);

  useEffect(() => {
    let data={ "pageIndex":1,"pageSize" :10,"query": "","sort" : {"key" : "","order" : ""},"isAll":true}
    dispatch(fetchAll___Categories(data))
  }, []);
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
      <div className="col-span-1">
          <FormItem
            label="Category *"
            invalid={errors.category_name && touched.category_name}
            errorMessage={errors.category_name}
          >
             <Field name="category_name">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  // isDisabled={loggedInClient?true:false}
                  options={categoryList}
                  // loadOptions={loadClients}
                  // defaultOptions
                  isSearchable={true}
                  // cacheOptions={false}
                  value={values.category_name}
                  // componentAs={AsyncSelect}
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
        <div className="col-span-1">
          <FormItem
            label="Sub-Category*"
            invalid={errors.sub_category && touched.sub_category}
            errorMessage={errors.sub_category}
          >
            <Field
              type="text"
              autoComplete="off"
              name="sub_category"
              value={values.sub_category || ""}
              component={Input}
              placeholder="Sub-Category"
            />
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
    </AdaptableCard>
  );
};

export default BlogSubcategoryInformationFields;
