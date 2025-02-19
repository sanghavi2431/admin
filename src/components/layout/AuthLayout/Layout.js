import React, { cloneElement } from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen bg-[#00C3DE] flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/others/auth-bg.jpg')",
      }}>
        <div className="h-4/5 w-4/5 px-8 py-12 bg-white rounded-lg shadow-2xl flex items-center justify-center gap-6">
          <div className="w-1/2">
            <img src={"/img/others/auth-img.png"} className="" />
          </div>
          <div className="h-full border border-[#231F20]"></div>
          <div className="w-1/2">{children ? cloneElement(children) : null}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
