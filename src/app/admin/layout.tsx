"use client";
import React, { useLayoutEffect, useState } from "react";
import AdminInnerLayout from "../../../components/Admin/Layout/AdminInnerLayout";
import { useAppContext } from "../../../components/Context/AppContext";
import Loader from "../../../components/Loader";
import { UserTypesEnum } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const [userType, setUserType] = useState(null);

  const { contextOptions, setContextOptions } = useAppContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "unauthenticated") {
      setContextOptions((prev) => ({
        ...prev,
        isAuth: false,
        loading: false,
      }));
      router.push("/");
      return;
    }
    if (status === "authenticated") {
      const userInfo: any = session.user;
      if (
        userInfo?.type === UserTypesEnum.admin ||
        userInfo?.type === UserTypesEnum.manager ||
        userInfo?.type === UserTypesEnum.member
      ) {
        setUserType(userInfo?.type);
        setContextOptions((prev) => ({
          ...prev,
          isAuth: true,
          loading: false,
          userSession: session,
          userData: session?.user,
        }));
        if (userInfo?.type === UserTypesEnum.member) {
          router.push("/admin/myaffiliates");
        }
      } else {
        router.push("/");
      }
    }
  }, [session, status]);

  return (
    <>
      {contextOptions?.loading ? (
        <Loader />
      ) : (
        <>
          {userType && (
            <AdminInnerLayout userType={userType}>{children}</AdminInnerLayout>
          )}
        </>
      )}
    </>
  );
};

export default AdminLayout;
