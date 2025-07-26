import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const BlogImages = (props) => {
  const { values, touched, errors } = props;

  const allowedFileTypes = ["image/jpeg", "image/png", "video/mp4", "video/webm"];
  const maxFileSize = 5242880; // 5 MB

  const beforeUpload = (file) => {
    for (let f of file) {
      if (!allowedFileTypes.includes(f.type)) {
        return "Please upload a .jpeg, .png, .mp4, or .webm file!";
      }
      if (f.size >= maxFileSize) {
        return "Upload file cannot be more than 5 MB!";
      }
    }
    return true;
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
  };

  return (
    <AdaptableCard className="mb-4">
      <span className="font-semibold">Media Upload*</span>
      <p className="mb-2">Add or change images/videos for the Blog</p>
      <p className="text-sm text-gray-500 mb-4">
        Allowed file types: .jpeg, .png, .mp4, .webm | Max file size: 5MB
      </p>
      <FormItem
        invalid={errors.main_image && touched.main_image}
        errorMessage={errors.main_image}
      >
        <Field name="main_image">
          {({ field, form }) => {
            return (
              <Upload
                beforeUpload={beforeUpload}
                onChange={(files) => onSetFormFile(form, field, files)}
                onFileRemove={(files) => onSetFormFile(form, field, files)}
                showList={true}
                multiple={true}
                accept={allowedFileTypes.join(",")}
              />
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default BlogImages;
