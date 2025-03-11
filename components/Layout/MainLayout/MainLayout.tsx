"use client";
import React, { useEffect } from "react";
import Header from "../../Header/Header";
import Foooter from "../../Footer/Foooter";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppContext } from "../../Context/AppContext";
type ChildProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: ChildProps) => {
  const pathName = usePathname();
  const session = useSession();
  const { setContextOptions, contextOptions } = useAppContext();
  const renderHeader = () => {
    if (pathName?.includes("/admin")) {
      return null;
    }
    if (pathName?.includes("/user")) {
      return null;
    }
    if (pathName?.includes("/api")) {
      return null;
    }
    return <Header />;
  };

  useEffect(() => {
    if (session?.data?.user) {
      setContextOptions((prev) => ({
        ...prev,
        userData: session?.data?.user,
      }));
    }
  }, [session]);

  console.log("contextOptionscontextOptionscontextOptions", contextOptions);

  const renderFooter = () => {
    if (pathName?.includes("/admin")) {
      return null;
    }
    if (pathName?.includes("/user")) {
      return null;
    }
    if (pathName?.includes("/api")) {
      return null;
    }
    return <Foooter />;
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
        <div> {children}</div>

        <div className="footerWrapper">{renderFooter()}</div>
      </div>
    </section>
  );
};

export default MainLayout;
