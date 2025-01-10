"use client";
import React, { Suspense } from "react";
import Loader from "../Loader";
import MainLayout from "./MainLayout/MainLayout";
import { AppProvider } from "../Context/AppContext";

type ChildProps = {
  children: React.ReactNode;
};

const InnerLayout = ({ children }: ChildProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <AppProvider>
        <MainLayout>{children}</MainLayout>
      </AppProvider>
    </Suspense>
  );
};

export default InnerLayout;
