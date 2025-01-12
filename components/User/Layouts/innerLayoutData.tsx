"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";

import { usePathname, useRouter } from "next/navigation";
import UserHeader from "../Header/UserHeader";
import Link from "next/link";
const { Sider, Content } = Layout;
interface IInnerLayout {
  children: React.ReactNode;
  menues: any;
}

const InnerLayout: React.FC<IInnerLayout> = ({ children, menues }) => {
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
          items={menues}
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
