import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const BlogCategoryImages = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    const allowedFileType = ["image/jpeg", "image/png"];
    const maxFileSize = 2097152;
    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .jpeg or .png file!";
      }
      if (f.size >= maxFileSize) {
        valid = "Upload image cannot more then 2 MB!";
      }
    }
    return valid;
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
  };

  return (
    <AdaptableCard className="mb-4">
      <span className="font-semibold">Category Icon*</span>
      <p className="mb-6">Add or change icon for the Blog Category</p>
      <FormItem
        invalid={errors.icon && touched.icon}
        errorMessage={errors.icon}
      >
        <Field name="image">
          {({ field, form }) => {
            return (
              <Upload
                beforeUpload={beforeUpload}
                onChange={(files) => onSetFormFile(form, field, files)}
                onFileRemove={(files) => onSetFormFile(form, field, files)}
                showList={true}
                uploadLimit={1}
              ></Upload>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default BlogCategoryImages;
