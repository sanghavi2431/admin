import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Dialog } from "@/components/ui";
import VerticalMenuIcon from "@/components/template/VerticalMenuContent/VerticalMenuIcon";

const NavigationPopup = ({ isOpen, onClose, nav, onLinkClick }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleLinkClick = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      width="70vw"
      height="auto"
      className="bg-white rounded-custom shadow-custom"
      overlayClassName="bg-black bg-opacity-50"
      closeTimeoutMS={300}
    >
      <div>
        <div className="flex gap-4 items-center">
          <div className="h-20 w-20 rounded-full bg-[#ffeb00] flex justify-center items-center">
            <VerticalMenuIcon icon={nav.icon} />
          </div>
          <h2>{nav.title}</h2>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {nav?.subMenu?.map((item, i) => (
            <div key={i} className="px-6 py-4 rounded-custom shadow-custom">
              <div className="flex items-center gap-2">
                <div
                  className={`text-black h-12 w-12 bg-[#02c3de] rounded-xl flex items-center justify-center`}
                >
                  <VerticalMenuIcon icon={item.icon} />
                </div>
                <p className="text-black text-xl font-bold">{item.title}</p>
              </div>
              <div className="mt-3">
                <Link
                  to={item.path}
                  onClick={() => {
                    onLinkClick?.({
                      key: item.key,
                      title: item.title,
                      path: item.path,
                    });
                    handleLinkClick();
                  }}
                >
                  <Button
                    size="sm"
                    className="flex items-center justify-center gap-2 mx-auto px-6 text-base"
                  >
                    <div>
                      <img src="/img/icons/edit.png" />
                    </div>
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default NavigationPopup;
