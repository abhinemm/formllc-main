import React from "react";
import ContactUsComponent from "../../../components/ContactUs/ContactUs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get Expert Support for Your Business Registration",
  description:
    "Start your US company with FormLLC in minutes. Expert guidance for LLC and Corporation formation. Trusted by thousands of entrepreneurs. Get started today at https://formllc.io!",
};

const page = () => {
  return <ContactUsComponent />;
};

export default page;
