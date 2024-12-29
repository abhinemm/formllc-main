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
    <section className="siteLayout">
      <div className="headerDiv">
        {!pathName?.includes("/admin") && <Header />}
      </div>
      <div className="childrenWrapper">
        {children}
        <div className="footerWrapper">
          {!pathName?.includes("/admin") && <Foooter />}
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
