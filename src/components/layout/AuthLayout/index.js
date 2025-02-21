import React from "react";
import { useSelector } from "react-redux";
import View from "@/views";
import { LAYOUT_TYPE_BLANK } from "@/constants/theme.constant";
import Layout from "./Layout";

const AuthLayout = (props) => {
  const layoutType = useSelector((state) => state.theme.layout.type);

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      {layoutType === LAYOUT_TYPE_BLANK ? (
        <View {...props} />
      ) : (
        // <Side>
        // 	<View {...props}/>
        // </Side>
        <Layout>
          <View {...props} />
        </Layout>
      )}
    </div>
  );
};

export default AuthLayout;
