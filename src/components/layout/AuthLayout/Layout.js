import React, { cloneElement } from "react";
import useDynamicBorderRadius from "@/utils/hooks/useDynamicBorderRadius";

const Layout = ({ children }) => {
  const { elementRef, borderRadius } = useDynamicBorderRadius();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#00C3DE] p-2 sm:p-4">
      <div
        ref={elementRef}
        style={{ borderRadius: `${borderRadius}px` }}
        className="w-full max-w-[75vw] h-[65vh] md:h-[80vh] bg-white shadow-custom flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6 p-4 sm:p-6 md:p-12"
      >
        {/* Left Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img src={"/img/others/auth-img.png"} alt="Auth" className="w-full max-w-80" />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-auto w-px bg-[#231F20]"></div>

        {/* Right Content Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {children ? cloneElement(children) : null}
        </div>
      </div>
    </div>
  );
};

export default Layout;
