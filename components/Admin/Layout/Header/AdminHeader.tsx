import { Layout } from "antd";
import React from "react";
const { Header } = Layout;
import styles from "./AdminHeader.module.scss";
import Image from "next/image";
import { useAppContext } from "../../../Context/AppContext";

const AdminHeader = () => {
  const { contextOptions } = useAppContext();
  return (
    <Header className={styles?.headerStyle}>
      <div className={styles.profileWrapper}>
        <Image
          src={
            contextOptions?.userData?.profilePic
              ? contextOptions?.userData?.profilePic
              : "/images/avathar.jpg"
          }
          width={30}
          height={30}
          alt="Description of the image"
        />
        <span>
          {contextOptions?.userData
            ? `${contextOptions?.userData?.firstName} ${contextOptions?.userData?.lastName}`
            : "My account"}
        </span>
      </div>
    </Header>
  );
};

export default AdminHeader;
