"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import UserHeader from "../Header/UserHeader";
import Link from "next/link";
import { useAppContext } from "../../Context/AppContext";
import PaymentSuccess from "../../Modals/PaymentSuccess";
import PaymentError from "../../Modals/PaymentError";
import { signOut } from "next-auth/react";
import { DashboardOutlined } from "@ant-design/icons";
const { Sider, Content } = Layout;
interface IInnerLayout {
  children: React.ReactNode;
  menues: any;
}

const InnerLayout: React.FC<IInnerLayout> = ({ children, menues }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { contextOptions, setContextOptions } = useAppContext();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  useEffect(() => {
    if (paymentStatus === "success") {
      setPaymentSuccess(true);
    }
    if (paymentStatus === "failed") {
      setPaymentError(true);
    }
  }, [paymentStatus]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClickMenu = (key: any) => {
    if (key == "logout") {
      setContextOptions((prev) => ({
        ...prev,
        userData: null,
        selectedCompany: {
          name: "No Company",
        },
        allCompanies: [],
        campanyName: null,
        selectedCompanyDetails: null,
        userSession: {},
        loading: true,
        isAuth: false,
        sideMenus: [
          {
            key: "/user",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
        ],
      }));
      signOut({ callbackUrl: "/" });
    } else {
      if (key !== "company") {
        router.push(key);
      }
    }
  };

  const handleClosePayment = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Delete the "status" parameter
    params.delete("status");
    // Update the URL without refreshing the page
    router.replace(`?${params.toString()}`);
    setPaymentSuccess(false);
    setPaymentError(false);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggle}
          breakpoint="lg"
          collapsedWidth="100"
          style={{
            background: "#161618",
          }}
        >
          <div
            style={{
              margin: 16,
              color: "#fff",
              fontSize: "18px",
              textAlign: "left",
              lineHeight: "32px",
            }}
          >
            <Link href="/">Formllc</Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["0"]}
            selectedKeys={[pathName]}
            onClick={({ key }) => {
              handleClickMenu(key);
              // Navigate to corresponding route
            }}
            items={contextOptions?.sideMenus}
          />
        </Sider>

        {/* Main Content */}
        <Layout>
          <UserHeader />
          <Content
            style={{
              padding: " 30px 20px 20px 20px",
              background: "#161618",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      {paymentSuccess && (
        <PaymentSuccess onClose={handleClosePayment} open={paymentSuccess} />
      )}
      {paymentError && (
        <PaymentError onClose={handleClosePayment} open={paymentError} />
      )}
    </>
  );
};

export default InnerLayout;
