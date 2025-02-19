import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const VoucherPOUploadFiles = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    if (files.length === 1) {
      valid = "Max file allowed is 1";
    }
    const allowedFileType = ["image/jpeg", "image/png", "application/pdf"];
    const maxFileSize = 2097152;
    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .jpeg or .png or .pdf file!";
      }
      if (f.size >= maxFileSize) {
        valid = "Upload image cannot more then 2 MB!";
      }
    }
    return valid;
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
    //form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
  };

  return (
    <AdaptableCard className="">
      <p className="font-bold">Add or change PO Image </p>
      <p className="mb-6">*only .jpeg, .png, .pdf formats are allowed</p>

      <FormItem
        invalid={errors.file && touched.file}
        errorMessage={errors.file}
      >
        <Field name="file">
          {({ field, form }) => {
            return (
              <Upload
                beforeUpload={beforeUpload}
                onChange={(files) => onSetFormFile(form, field, files)}
                onFileRemove={(files) => onSetFormFile(form, field, files)}
                showList={true}
                uploadLimit={1}
                text="Select"
              ></Upload>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default VoucherPOUploadFiles;
