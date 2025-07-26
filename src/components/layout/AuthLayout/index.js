import React from "react";
import View from "@/views";
import Layout from "./Layout";

const AuthLayout = (props) => {
  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      <Layout>
        <View {...props} />
      </Layout>
    </div>
  );
};

export default AuthLayout;
