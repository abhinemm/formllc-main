"use client";
import React from "react";
import AdminInnerLayout from "../../../components/Admin/Layout/AdminInnerLayout";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminInnerLayout>{children}</AdminInnerLayout>;
};

export default AdminLayout;
