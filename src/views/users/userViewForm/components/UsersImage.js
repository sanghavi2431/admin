import React, { useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Dialog } from "@/components/ui";
import { HiEye } from "react-icons/hi";

const UserImage = (props) => {
  const { values, touched, errors } = props;
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

  const beforeUpload = (file) => {
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

  return (
    <>
      <div className="col-span-1"></div>

      <AdaptableCard className="my-4">
        <span className="font-semibold ">Woloo Guest Image</span>
        {values.avatar !== null && values.avatar.length > 2 ? (
          <div className="flex items-center mt-4">
            <div className="group relative rounded border p-2 flex">
              <img
                className="rounded max-h-[200px] max-w-[200px]"
                src={values.base_url + values.avatar}
              />
              <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                <span
                  onClick={() =>
                    onViewOpen({
                      name: "Woloo Guest Image",
                      url: values.base_url + values.avatar,
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
      </AdaptableCard>
    </>
  );
};

export default UserImage;
