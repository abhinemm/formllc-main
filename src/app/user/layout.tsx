"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InnerLayout from "../../../components/User/Layouts/innerLayoutData";
import Loader from "../../../components/Loader";
import axios from "axios";
import { useAppContext } from "../../../components/Context/AppContext";
import {
  DashboardOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { SideMenuHelper } from "@/helpers/helper";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session: any = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>();
  const { contextOptions, setContextOptions } = useAppContext();
  const [menues, setMenues] = useState<any>([
    {
      key: "/user",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
  ]);

  useLayoutEffect(() => {
    if (contextOptions?.selectedCompanyDetails) {
      const menu = SideMenuHelper(contextOptions?.selectedCompanyDetails);
      setContextOptions((prev) => ({
        ...prev,
        sideMenus: menu,
      }));
    }
  }, [contextOptions?.selectedCompanyDetails]);

  useLayoutEffect(() => {
    if (session?.status == "loading") {
      setLoading(true);
    } else {
      if (session?.data?.user) {
        if (!userData) {
          setUserData(session?.data?.user);
          setContextOptions((prev) => ({
            ...prev,
            userData: session?.data?.user,
          }));
          handleGetAllbuisness(session?.data?.user?.id);
        }
      } else {
        setLoading(false);
        router.push("/");
      }
    }
  }, [session]);

  useEffect(() => {
    if (contextOptions.campanyName) {
      setLoading(true);
    }
  }, [contextOptions.campanyName]);

  const handleGetAllbuisness = async (id: number) => {
    await axios
      .get(`/api/company?userId=${id}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const selected = localStorage.getItem("company");
          let values: any;
          let filterOne: any;
          if (selected) {
            filterOne = res?.data?.find((el: any) => el.id == Number(selected));
            values = {
              id: filterOne?.id,
              name: `${filterOne?.companyName ?? ""} ${
                filterOne?.type ?? "No type"
              }`,
            };
          } else {
            filterOne = res?.data[0];
            values = {
              id: filterOne?.id,
              name: `${filterOne?.companyName ?? ""} ${
                filterOne?.type ?? "No type"
              } `,
            };
          }
          setContextOptions((prev) => ({
            ...prev,
            allCompanies: res?.data,
            selectedCompany: values,
            selectedCompanyDetails: filterOne,
          }));
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        router.push("/");
        console.log("the error is ", err);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <InnerLayout menues={menues}>{children}</InnerLayout>
      )}
    </>
  );
};

export default UserLayout;
