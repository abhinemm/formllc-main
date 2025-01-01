"use client";
import React, { useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InnerLayout from "../../../components/User/Layouts/innerLayoutData";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useAppContext } from "../../../components/Context/AppContext";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session: any = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>();
  const { setContextOptions } = useAppContext();

  useLayoutEffect(() => {
    if (session?.status == "loading") {
      setLoading(true);
    } else {
      if (session?.data?.user) {
        setUserData(session?.data?.user);
        setContextOptions((prev) => ({
          ...prev,
          userData: session?.data?.user,
        }));
        handleGetAllbuisness(session?.data?.user?.id);
      } else {
        setLoading(false);
        router.push("/");
      }
    }
  }, [session]);

  const handleGetAllbuisness = async (id: number) => {
    await axios
      .get(`/api/company?userId=${id}`)
      .then((res: any) => {
        setLoading(false);
        console.log("the response", res);
        setContextOptions((prev) => ({
          ...prev,
          allCompanies: res?.data,
        }));
      })
      .catch((err: any) => {
        setLoading(false);
        router.push("/");
        console.log("the error is ", err);
      });
  };
  return <>{loading ? <Loader /> : <InnerLayout>{children}</InnerLayout>}</>;
};

export default UserLayout;
