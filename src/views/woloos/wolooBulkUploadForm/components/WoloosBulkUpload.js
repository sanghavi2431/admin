import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";
import { Button } from "@/components/ui";
import { HiDownload } from "react-icons/hi";

const WoloosBulkUploadFiles = (props) => {
  const { touched, errors } = props;

  const beforeUpload = (file, files) => {
    let valid = true;
    if (files.length === 1) {
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

  const onDownload = () => {
    let pathname = window.location.href;
    pathname = pathname
      .split("/")
      .filter((e, index) => index < 3)
      .join("/");
    let data = pathname + "/Woloo-Test-Bulk-Upload.xlsx";
    let fileLink = data.split("/").pop();
    let link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", fileLink);
    document.body.appendChild(link);
    link.click();
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
    //form.setFieldValue(field.name, {label : option.label, value : option.value}) : form.setFieldValue(field.name, '')}
  };

  return (
    <AdaptableCard className="mb-4">
      <div className="flex">
        <div>
          <p className="font-bold">Add or change Excel file </p>
          <p className="mb-6">*only .xls formats are allowed</p>
        </div>
        <Button
          className="ml-8"
          type="button"
          onClick={onDownload}
          variant="solid"
          icon={<HiDownload />}
        >
          Template
        </Button>
      </div>

      <FormItem
        invalid={errors.file && touched.file}
        errorMessage={errors.file}
      >
        <Field name="file">
          {({ field, form }) => {
            return (
              <div>
                <Upload
                  beforeUpload={beforeUpload}
                  onChange={(files) => onSetFormFile(form, field, files)}
                  onFileRemove={(files) => onSetFormFile(form, field, files)}
                  showList={true}
                  uploadLimit={1}
                  text="Select"
                ></Upload>
              </div>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default WoloosBulkUploadFiles;
