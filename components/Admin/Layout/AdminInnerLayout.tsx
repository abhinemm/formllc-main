"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AdminHeader from "./Header/AdminHeader";
import { USERMANUES } from "@/constants/constants";

const { Header, Sider, Content } = Layout;

const AdminInnerLayout = ({ userType, children }) => {
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
            textAlign: "center",
            lineHeight: "32px",
            fontSize: "1.5rem",
            fontWeight: 700,
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
          items={USERMANUES[userType!]}
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
