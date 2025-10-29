"use client";
import React, { Suspense, useEffect } from "react";
import Loader from "../Loader";
import MainLayout from "./MainLayout/MainLayout";
import { AppProvider } from "../Context/AppContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { notification } from "antd";

type ChildProps = {
  children: React.ReactNode;
};

const InnerLayout = ({ children }: ChildProps) => {
  const pathName = usePathname();
  useEffect(() => {
    notification.config({
      duration: 1.5,
    });
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {!pathName.includes("/admin") && (
        <Link
          href="https://api.whatsapp.com/send?phone=447909729519"
          target="_blank"
          className="link-block"
        >
          <Image
            src="/images/download.png"
            width={50}
            height={50}
            alt="whatsapp"
            className="whatsapp"
          />
        </Link>
      )}
      <AppProvider>
        <MainLayout>{children}</MainLayout>
      </AppProvider>
    </Suspense>
  );
};

export default InnerLayout;
