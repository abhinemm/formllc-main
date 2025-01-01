"use client";
import React from "react";
import CreateAccount from "../../../../../components/CreateAccount/CreateAccount";

const page = () => {
  const haddleNewAccount = () => {};
  const handleSignIn = () => {};
  return (
    <CreateAccount
      onCreateAccount={haddleNewAccount}
      handleSignIn={handleSignIn}
    />
  );
};

export default page;
