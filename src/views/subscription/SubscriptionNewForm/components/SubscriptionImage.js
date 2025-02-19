import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const SubscriptionImages = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    if (files.length == 1) {
      valid = "Max file allowed is 1";
    }
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
      <span className="font-semibold">Subscription Image *</span>
      <p className="mb-6">Add or change image for the Subscription</p>
      <FormItem
        invalid={errors.image && touched.image}
        errorMessage={errors.image}
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

export default SubscriptionImages;
