import React from "react";
import { AdaptableCard } from "components/shared";
import { FormItem, Input, Upload, Dialog } from "components/ui";
import { HiEye, HiTrash } from "react-icons/hi";
import { Field } from "formik";
import { useState } from "react";

const BlogsubCategoryImages = (props) => {
  const { values,touched, errors } = props;
  const [selectedImg, setSelectedImg] = useState({});
  const [viewOpen, setViewOpen] = useState(false);
  const onDialogClose = () => {
    setViewOpen(false);
    setTimeout(() => {
      setSelectedImg({});
    }, 300);
  };

  const onViewOpen = (img) => {
    setSelectedImg(img);
    setViewOpen(true);
  };
  
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
      <span className="font-semibold">Sub-Category Icon*</span>
      <p className="mb-6">Add or change icon for the Blog Sub-Category</p>
      {values.icon != "" && typeof(values.icon)=="string"  ? (
            <div className="flex items-center mt-4">
              <div className="group relative rounded border p-2 flex">
                <img
                  className="rounded max-h-[200px] max-w-[200px]"
                  src={  values.icon}
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                  <span
                    onClick={() =>
                      onViewOpen({
                        name: "Category Icon",
                        url:  values.icon,
                      })
                    }
                    className="text-gray-100  hover:text-gray-300 cursor-pointer p-1.5"
                  >
                    <HiEye />
                  </span>
                </div>
              </div>
              <Dialog
                className="max-w-[400px] max-h-[400px]"
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
              >
                <h5 className="mb-4">{selectedImg.name}</h5>
                <img
                  className="max-h-full max-w-full"
                  src={selectedImg.url}
                  alt={selectedImg.name}
                />
              </Dialog>
            </div>
          ) : (
            <div></div>
          )}
      <FormItem
        invalid={errors.icon && touched.icon}
        errorMessage={errors.icon}
      >
        <Field name="icon">
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

export default BlogsubCategoryImages;