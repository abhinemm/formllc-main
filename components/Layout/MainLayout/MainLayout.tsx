"use client";
import React from "react";
import Header from "../../Header/Header";
import Foooter from "../../Footer/Foooter";
import { usePathname } from "next/navigation";
type ChildProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: ChildProps) => {
  const pathName = usePathname();
  return (
    <div>
      {!pathName?.includes("/admin") && <Header />}
      {children}
      {!pathName?.includes("/admin") && <Foooter />}
    </div>
  );
};

export default MainLayout;
