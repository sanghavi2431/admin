import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const WoloosImages = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    if (files.length === 3) {
      valid = "Max file allowed is 3";
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
      if (f.name.indexOf(' ') >= 0) {
        valid = "The file name should not contain spaces";
      }
    }
    return valid;
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
    //form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
  };

  return (
    <AdaptableCard className="mb-4">
      <span className="font-semibold">Woloo Host Image*</span>
      <p className="mb-6">Add or change image for the Woloo Host</p>
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
                uploadLimit={3}
              ></Upload>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default WoloosImages;
