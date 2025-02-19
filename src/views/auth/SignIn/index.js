import React, { useState } from "react";
import SignInForm from "./EmailSignInForm";
import SignInUsingMobileForm from "./MobileSignInForm";

const SignIn = () => {
  let [emailSignIn, SetEmailSignIn] = useState(true);

  return (
    <>
      {/* <div className="mb-8">
        <h3 className="mb-1">Welcome to Woloo Hygiene Management !</h3>
        <p>Please enter your credentials to sign in!</p>
      </div> */}
      <div className="">
        <img
        src="/img/logo/Woloo-SH.png"
        className="h-[72px] w-auto mx-auto my-4"
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

      {/* <VerifyOtp mobileNumber={99876543456} expireTime={200}/> */}
    </>
  );
};

export default SignIn;
