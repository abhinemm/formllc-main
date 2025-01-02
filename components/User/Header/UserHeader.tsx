import React, { useLayoutEffect, useState } from "react";
import styles from "./UserHeader.module.scss";
import { Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAppContext } from "../../Context/AppContext";
const { Header } = Layout;

const UserHeader = () => {
  const { contextOptions, setContextOptions } = useAppContext();
  const [itemList, setItemList] = useState<MenuProps["items"]>([]);
  useLayoutEffect(() => {
    if (contextOptions?.allCompanies?.length) {
      const itemlist = contextOptions?.allCompanies?.map((el: any) => ({
        key: el.id,
        label: el?.campanyName ?? el?.registrationState,
      }));
      setItemList(itemlist);
    }
  }, [contextOptions?.allCompanies]);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
    },
    {
      key: "2",
      label: "Profile",
    },
  ];

  const handleMenuClick = (e: any) => {
    const selectedCompany = contextOptions?.allCompanies?.find(
      (el: any) => el.id == e.key
    );
    const obj = {
      id: selectedCompany?.id,
      name: selectedCompany?.campanyName,
    };
    setContextOptions((prev) => ({
      ...prev,
      selectedCompany: obj,
    }));
    console.log("e.keye.keye.key", e.key);
  };

  // const itemList: MenuProps["items"] = [
  //   {
  //     key: "Option 1",
  //     label: "Option 1",
  //   },
  //   {
  //     key: "Option 2",
  //     label: "Option 2",
  //   },
  //   {
  //     key: "Option 3",
  //     label: "Option 3",
  //   },
  // ];

  return (
    <Header className={styles?.headerStyle}>
      <Dropdown
        menu={{
          items: itemList,
          onClick: handleMenuClick,
        }}
        trigger={["click"]}
      >
        <a onClick={(e) => e.preventDefault()} className={styles.profileName}>
          <span>{contextOptions?.selectedCompany?.name ?? "No Company"}</span>
          <DownOutlined />
        </a>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()} className={styles.profileName}>
          <Image
            src="/images/avathar.jpg"
            width={30}
            height={30}
            alt="Description of the image"
          />
          <span>Hover me</span>
          <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
};

export default UserHeader;
