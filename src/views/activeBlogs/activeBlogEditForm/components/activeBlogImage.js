import React, { useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload, Dialog } from "@/components/ui";
import { HiEye, HiTrash } from "react-icons/hi";
import { Field } from "formik";

const ActiveBlogImages = (props) => {
  const { values, touched, errors } = props;
  const [selectedImg, setSelectedImg] = useState({});
  const [viewOpen, setViewOpen] = useState(false);
  const existingMediaList = values.main_image;

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
    const allowedFileTypes = ["image/jpeg", "image/png", "video/mp4", "video/webm"];
    const maxFileSize = 5242880; // 5 MB

    for (let f of file) {
      if (!allowedFileTypes.includes(f.type)) {
        valid = "Please upload a .jpeg, .png, .mp4, or .webm file!";
      }
      if (f.size >= maxFileSize) {
        valid = "Upload file cannot be more than 5 MB!";
      }
    }
    return valid;
  };

  const onSetFormFile = (form, field, files) => {
    form.setFieldValue(field.name, files);
  };

  const onRemoveFile = (form, field, index) => {
    const updatedFiles = existingMediaList.filter((_, i) => i !== index);
    form.setFieldValue(field.name, updatedFiles);
  };

  return (
    <AdaptableCard className="mb-4">
      <span className="font-semibold">Media Upload*</span>
      <p className="mb-2">Add or change images/videos for the Blog</p>
      <p className="text-sm text-gray-500 mb-6">
        Allowed file types: .jpeg, .png, .mp4, .webm | Max file size: 5MB
      </p>
      {Array.isArray(existingMediaList) && existingMediaList.length > 0 && (
        <Field name="main_image">
          {({ field, form }) => (
            <div className="flex flex-wrap gap-2 mt-4">
              {existingMediaList.map((file, index) => {
                const isVideo =
                  (typeof file === "object" && file.type?.startsWith("video/")) ||
                  (typeof file === "string" && (file.endsWith(".mp4") || file.endsWith(".webm")));

                const fileUrl = typeof file === "object" ? URL.createObjectURL(file) : file;

                return (
                  <div key={index} className="group relative rounded border p-2 flex">
                    {isVideo ? (
                      <video className="rounded max-h-[200px] max-w-[200px]" controls>
                        <source src={fileUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img className="rounded max-h-[200px] max-w-[200px]" src={fileUrl} alt="Blog Media" />
                    )}
                    <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center gap-2">
                      <span
                        onClick={() => onViewOpen({ name: "Blog Media", url: fileUrl })}
                        className="text-gray-100 hover:text-gray-300 cursor-pointer p-1.5"
                      >
                        <HiEye />
                      </span>
                      <span
                        onClick={() => onRemoveFile(form, field, index)}
                        className="text-red-400 hover:text-red-600 cursor-pointer p-1.5"
                      >
                        <HiTrash />
                      </span>
                    </div>
                  </div>
                );
              })}

              <Dialog
                className="max-w-[400px] max-h-[400px]"
                isOpen={viewOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
              >
                <h5 className="mb-4">{selectedImg.name}</h5>
                {selectedImg.url?.includes(".mp4") || selectedImg.url?.includes(".webm") ? (
                  <video className="max-h-full max-w-full" controls>
                    <source src={selectedImg.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="max-h-full max-w-full" src={selectedImg.url} alt={selectedImg.name} />
                )}
              </Dialog>
            </div>
          )}
        </Field>
      )}
      <FormItem invalid={errors.main_image && touched.main_image} errorMessage={errors.main_image}>
        <Field name="main_image">
          {({ field, form }) => {
            return (
              <Upload
                beforeUpload={beforeUpload}
                onChange={(files) => onSetFormFile(form, field, files)}
                onFileRemove={(files) => onSetFormFile(form, field, files)}
                fileList={existingMediaList}
                showList={false}
                multiple={true}
                accept="image/jpeg,image/png,video/mp4,video/webm"
              />
            );
          }}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default ActiveBlogImages;
