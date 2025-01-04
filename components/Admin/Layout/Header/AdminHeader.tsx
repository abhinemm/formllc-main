import { Layout } from "antd";
import React from "react";
const { Header } = Layout;
import styles from "./AdminHeader.module.scss";

const AdminHeader = () => {
  return <Header className={styles?.headerStyle}>Admin Panel</Header>;
};

export default AdminHeader;
