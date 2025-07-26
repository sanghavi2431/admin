import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";

const FacilityUploadFiles = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    if (files.length == 1) {
      valid = "Max file allowed is 1";
    }
    const allowedFileType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const maxFileSize = 3145728;

    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .xls file!";
      }
      if (f.size >= maxFileSize) {
        valid = "Upload file cannot more then 3 MB !";
      }
    }
    return valid;
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
    //form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
  };

  return (
    <AdaptableCard className="mt-4">
      <FormItem
        invalid={errors.file && touched.file}
        errorMessage={errors.file}
      >
        <Field name="file">
          {({ field, form }) => {
            return (
              <div>
                <FormItem
                  label="Upload Facility Data*"
                >
                  <Upload
                    beforeUpload={beforeUpload}
                    onChange={(files) => onSetFormFile(form, field, files)}
                    onFileRemove={(files) => onSetFormFile(form, field, files)}
                    showList={true}
                    uploadLimit={1}
                    text="Select"
                  ></Upload>
                </FormItem>
              </div>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default FacilityUploadFiles;
