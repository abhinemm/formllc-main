"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AdminHeader from "./Header/AdminHeader";

const { Header, Sider, Content } = Layout;

const AdminInnerLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        breakpoint="lg"
        collapsedWidth="80"
        style={{
          background: "#161618",
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            color: "#fff",
            fontSize: "20px",
            textAlign: "center",
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
              key: "/admin",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "/admin/buisness-request",
              icon: <VideoCameraOutlined />,
              label: "Orders",
            },
            {
              key: "/admin/products",
              icon: <UploadOutlined />,
              label: "Products",
            },
          ]}
        />
      </Sider>

      {/* Main Content */}
      <Layout>
        <AdminHeader />
        <Content
          style={{
         
            padding: 24,
            background: "#fff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminInnerLayout;
