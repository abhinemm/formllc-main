"use client";
import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import UserHeader from "../Header/UserHeader";
const { Sider, Content } = Layout;

const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
    },
    {
      key: "2",
      label: "Profile",
      extra: "⌘P",
    },
  ];
  return (
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
          Formllc
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            router.push(key); // Navigate to corresponding route
          }}
          items={[
            {
              key: "/user",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "",
              icon: <VideoCameraOutlined />,
              label: "Company",
              children: [
                {
                  key: "/user/company/details",
                  label: "Details",
                },
                {
                  key: "/user/company/documents",
                  label: "Documents",
                },
              ],
            },
            {
              key: "/user/2",
              icon: <UploadOutlined />,
              label: "Products",
            },
          ]}
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
  );
};

export default InnerLayout;
