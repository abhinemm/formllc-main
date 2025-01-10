"use client";
import React from "react";
import CreateAccount from "../../../../../components/CreateAccount/CreateAccount";

const page = () => {
  const haddleNewAccount = () => {};
  const handleSignIn = () => {};
  return (
    <div className="sign-up-wrapper">
      {" "}
      <div className={'authHeaderItem'}>
        <h2>Welcome to Firstbase</h2>
      </div>
      <CreateAccount
        onCreateAccount={haddleNewAccount}
        handleSignIn={handleSignIn}
      />
    </div>
  );
};

export default page;
