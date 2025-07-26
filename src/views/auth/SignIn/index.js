import React, { useState } from "react";
import SignInForm from "./EmailSignInForm";
import SignInUsingMobileForm from "./MobileSignInForm";

const SignIn = () => {
  const [emailSignIn, SetEmailSignIn] = useState(false);

  return (
    <div className="w-full px-4 sm:px-8 md:px-10">
      <div className="flex justify-center mb-6">
        <img
          src="/img/logo/Woloo-SH-2.png"
          alt="Woloo Logo"
          className="w-40 h-auto object-contain"
        />
      </div>

      {emailSignIn ? (
        <SignInForm
          disableSubmit={false}
          emailSignIn={emailSignIn}
          SetEmailSignIn={SetEmailSignIn}
        />
      ) : (
        <SignInUsingMobileForm
          disableSubmit={false}
          emailSignIn={emailSignIn}
          SetEmailSignIn={SetEmailSignIn}
        />
      )}
    </div>
  );
};

export default SignIn;
