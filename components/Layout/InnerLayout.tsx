import React, { Suspense } from "react";
import Loader from "../Loader";
import MainLayout from "./MainLayout/MainLayout";

type ChildProps = {
  children: React.ReactNode;
};

const InnerLayout = ({ children }: ChildProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
};

export default InnerLayout;
