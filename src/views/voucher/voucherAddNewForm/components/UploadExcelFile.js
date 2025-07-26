import React from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload } from "@/components/ui";
import { Field } from "formik";
import { Button } from "@/components/ui";
const VoucherExcelFile = (props) => {
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
    const maxFileSize = 2097152;
    for (let f of file) {
      if (!allowedFileType.includes(f.type)) {
        valid = "Please upload a .xls file!";
      }
      if (f.size >= maxFileSize) {
        valid = "Upload image cannot more then 2 MB!";
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
    let data = pathname + "/Mobile-template.xlsx";
    let fileLink = data.split("/").pop();
    let link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", fileLink);
    document.body.appendChild(link);
    link.click();
  };

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, file);
  };

  return (
    <AdaptableCard className="mt-4">
      <span className="font-semibold">
        Upload Excel Sheet to Associate Mobile Numbers
      </span>
      <p className="mb-6">Add or change Excel file </p>
      <FormItem
        invalid={errors.file && touched.file}
        errorMessage={errors.file}
      >
        <Field name="file">
          {({ field, form }) => {
            return (
              <div>
                <Button
                  className="my-2"
                  type="button"
                  onClick={onDownload}
                  variant="solid"
                >
                  Template
                </Button>
                <Upload
                  beforeUpload={beforeUpload}
                  onChange={(files) => onSetFormFile(form, field, files)}
                  onFileRemove={(files) => onSetFormFile(form, field, files)}
                  showList={true}
                  uploadLimit={1}
                  className="ml-2"
                ></Upload>
              </div>
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default VoucherExcelFile;
