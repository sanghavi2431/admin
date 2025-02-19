import React, { useEffect } from "react";
import { AdaptableCard } from "@/components/shared";
import { Input, FormItem, Select } from "@/components/ui";
import { Field } from "formik";
import { fetch_All_Categories } from "../store/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const BlogsubCategoryInformationFields = (props) => {
  const { values, touched, errors } = props;
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.blogsubcatAdd.data.categoryList);
  useEffect(() => {
    let data={ "pageIndex":1,"pageSize" :10,"query": "","sort" : {"key" : "","order" : ""},"isAll":true}
    dispatch(fetch_All_Categories(data))
  }, []);
  return (
    <AdaptableCard className="mb-4" divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="">
          <FormItem
            label="Category *"
            invalid={errors.category && touched.category}
            errorMessage={errors.category}
          >
             <Field name="category">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  required
                  // isDisabled={loggedInClient?true:false}
                  options={categoryList}
                  // loadOptions={categoryList}
                  // defaultOptions
                  isSearchable={true}
                  // cacheOptions={false}
                  value={values.category}
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
        <div className="">
          <FormItem
            label="Sub-Category*"
            invalid={errors.subCategory && touched.subCategory}
            errorMessage={errors.subCategory}
          >
            <Field
              type="text"
              autoComplete="off"
              name="subCategory"
              value={values.subCategory || ""}
              component={Input}
              placeholder="Sub-Category"
            />
          </FormItem>
        </div>

      </div>
    </AdaptableCard>
  );
};

export default BlogsubCategoryInformationFields;
