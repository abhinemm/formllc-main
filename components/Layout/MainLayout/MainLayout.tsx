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
  const renderHeader = () => {
    if (pathName?.includes("/admin")) {
      return null;
    }
    if (pathName?.includes("/user")) {
      return null;
    }
    return <Header />;
  };

  const checkUserLayout = () => {
    if (pathName?.includes("/admin") || pathName?.includes("/user")) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <section className="siteLayout">
      <div className="headerDiv">{renderHeader()}</div>
      <div className={checkUserLayout() ? "" : "childrenWrapper"}>
        {children}
      </div>
      <div className="footerWrapper">
        {!pathName?.includes("/admin") && <Foooter />}
      </div>
    </section>
  );
};

export default MainLayout;
