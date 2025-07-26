import React, { useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { FormItem, Upload, Dialog } from "@/components/ui";
import { Field } from "formik";
import { HiEye, HiTrash } from "react-icons/hi";

const UsersImages = (props) => {
  const { values, touched, errors } = props;
  const [selectedImg, setSelectedImg] = useState({});
  const [viewOpen, setViewOpen] = useState(false);
  let images = values.image;

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
    if (files.length == 1) {
      valid = "Max file allowed is 1";
    }
    const allowedFileType = ["image/jpeg", "image/png","application/pdf"];
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
      <h3 className="mb-4">Upload Documents</h3>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 ">
        <div className="col-span-1">
          {typeof values.aadhar_image == "string"  &&  values.aadhar_image?.length>0 && (
            <div className="flex items-center">
              <div className="group relative rounded border p-2 flex mt-8 ml-8">
                <img
                  className="rounded max-h-[200px] max-w-[200px] "
                  src={values.base_url + "/" + values.aadhar_image}
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                  <span
                    onClick={() =>
                      onViewOpen({
                        name: "Aadhar Card Image",
                        url: values.base_url + "/" + values.aadhar_image,
                      })
                    }
                    className="text-gray-100  hover:text-gray-300 cursor-pointer p-1.5 "
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
          )}
          <span className="font-semibold">Aadhar Card</span>
          <p className="mb-6">Add or change image for the Aadhar Card</p>

          <FormItem
            invalid={errors.aadhar_image && touched.aadhar_image}
            errorMessage={errors.aadhar_image}
          >
            <Field name="aadhar_image">
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
        </div>
        <div className="col-span-1">
          <div>
            {typeof values.pan_image == "string" &&  values.pan_image?.length>0 && (
              <div className="flex items-center">
                <div className="group relative rounded border p-2 flex mt-8 ml-8">
                  <img
                    className="rounded max-h-[200px] max-w-[200px] "
                    src={values.base_url + "/" + values.pan_image}
                  />
                  <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                      onClick={() =>
                        onViewOpen({
                          name: "PAN Card Image",
                          url: values.base_url + "/" + values.pan_image,
                        })
                      }
                      className="text-gray-100  hover:text-gray-300 cursor-pointer p-1.5 "
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
            )}
          </div>
          <span className="font-semibold">PAN Card</span>
          <p className="mb-6">Add or change image for the PAN Card</p>

          <FormItem
            invalid={errors.pan_image && touched.pan_image}
            errorMessage={errors.pan_image}
          >
            <Field name="pan_image">
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
        </div>
        <div className="col-span-1">
          {typeof values.wish_certificate_image == "string" &&  values.wish_certificate_image?.length>0 && (
            <div className="flex items-center">
              <div className="group relative rounded border p-2 flex mt-8 ml-8">
                <img
                  className="rounded max-h-[200px] max-w-[200px] "
                  src={values.base_url + "/" + values.wish_certificate_image}
                />
                <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                  <span
                    onClick={() =>
                      onViewOpen({
                        name: "WISH Certificate Image",
                        url: values.base_url + "/" + values.wish_certificate_image,
                      })
                    }
                    className="text-gray-100  hover:text-gray-300 cursor-pointer p-1.5 "
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
          )}
          <span className="font-semibold">WISH Certificate</span>
          <p className="mb-6">Add or change image for the WISH Certificate</p>

          <FormItem
            invalid={
              errors.wish_certificate_image && touched.wish_certificate_image
            }
            errorMessage={errors.wish_certificate_image}
          >
            <Field name="wish_certificate_image">
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
        </div>
      </div>
    </AdaptableCard>
  );
};

export default UsersImages;
