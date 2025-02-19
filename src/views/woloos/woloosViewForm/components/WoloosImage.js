import React, { useState } from "react";
import { AdaptableCard } from "@/components/shared";
import { Dialog } from "@/components/ui";
import { HiEye } from "react-icons/hi";

const WolooImages = (props) => {
  const { values } = props;
  const [selectedImg, setSelectedImg] = useState({});
  const [viewOpen, setViewOpen] = useState(false);
  let additionSlash=values.base_url.includes("public")?"/":""

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

  return (
    <>
      <div className="col-span-1">
        <AdaptableCard className="mt-4">
          <span className="font-semibold ml-8">Woloo Host Image * </span>

          {images.map((i) => {
            return (
              <div className="flex items-center">
                <div className="group relative rounded border p-2 flex mt-8 ml-8">
                  <img
                    className="rounded max-h-[200px] max-w-[200px] "
                    src={values.base_url +additionSlash+ i}
                    alt=""
                  />
                  <div className="absolute inset-2 bg-gray-900/[.7] group-hover:flex hidden text-xl items-center justify-center">
                    <span
                      onClick={() =>
                        onViewOpen({
                          name: "Woloo Host Image",
                          url: values.base_url+additionSlash + i,
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
            );
          })}
        </AdaptableCard>
      </div>
    </>
  );
};

export default WolooImages;
