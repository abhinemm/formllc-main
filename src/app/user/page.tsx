"use client";
import React from "react";
import { useAppContext } from "../../../components/Context/AppContext";
import DashBoard from "../../../components/User/Dashboard/DashBoard";
import CommonAction from "../../../components/CommonActionPage/CommonAction";

const page = () => {
  const { contextOptions } = useAppContext();

  const renderPage = () => {
    if (!contextOptions?.selectedCompanyDetails) {
      return (
        <CommonAction
          title="No Company Registered"
          description="Please register a company to continue using the dashboard."
          btnText="Register company"
          redirectUrl="/start-buisness"
        />
      );
    } else if (contextOptions?.selectedCompanyDetails?.paymentStatus === 0) {
      return (
        <CommonAction
          title="Payment Incomplete"
          description="Please complete the payment to proceed."
          btnText="Go to Payment"
          redirectUrl="payment"
        />
      );
    } else if (contextOptions?.selectedCompanyDetails.paymentStatus === 2) {
      return (
        <CommonAction
          title="Payment Failed"
          description="Please try again or continue using the dashboard."
          btnText="Go to Payment"
          redirectUrl="payment"
        />
      );
    } else if (contextOptions?.selectedCompanyDetails.status === 0) {
      return (
        <CommonAction
          title="Incomplete Company Details"
          description="Please complete the registration process to continue."
          btnText="Continue Register"
          redirectUrl={`/company-registration?id=${contextOptions?.selectedCompanyDetails.id}`}
        />
      );
    } else {
      return <DashBoard />;
    }
  };

  return <>{renderPage()}</>;
};

export default page;
