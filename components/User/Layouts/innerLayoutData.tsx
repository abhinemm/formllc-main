"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import UserHeader from "../Header/UserHeader";
const { Sider, Content } = Layout;

const InnerLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClickMenu = (key: any) => {
    if (key !== "company") {
      router.push(key);
    }
  };

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
          // defaultSelectedKeys={["0"]}
          selectedKeys={[pathName]}
          onClick={({ key }) => {
            handleClickMenu(key);
            // Navigate to corresponding route
          }}
          items={[
            {
              key: "/user",
              icon: <UserOutlined />,
              label: "Companies",
            },
            {
              key: "Contacts",
              icon: <VideoCameraOutlined />,
              label: "Contacts",
              children: [
                {
                  key: "/user/company/details",
                  label: "Details",
                },
                // {
                //   key: "/user/company/documents",
                //   label: "Documents",
                // },
              ],
            },
            {
              key: "/user",
              icon: <UserOutlined />,
              label: "Steps",
            },
            // {
            //   key: "/user/2",
            //   icon: <UploadOutlined />,
            //   label: "Products",
            // },
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
