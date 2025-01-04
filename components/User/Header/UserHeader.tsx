import React, { useLayoutEffect, useState } from "react";
import styles from "./UserHeader.module.scss";
import { Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAppContext } from "../../Context/AppContext";
import { useRouter } from "next/navigation";
const { Header } = Layout;

const UserHeader = () => {
  const router = useRouter();
  const { contextOptions, setContextOptions } = useAppContext();

  const [itemList, setItemList] = useState<MenuProps["items"]>([]);
  useLayoutEffect(() => {
    if (contextOptions?.allCompanies?.length) {
      const itemlist = contextOptions?.allCompanies?.map((el: any) => ({
        key: el.id,
        label: el?.companyName ?? el?.registrationState,
      }));
      setItemList([...itemlist, { key: "0", label: "+ Add new Company" }]);
    }
  }, [contextOptions?.allCompanies]);

  console.log("contextOptions", contextOptions);

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
    if (e.key == "0") {
      router.push("/start-buisness");
    } else {
      const selectedCompany = contextOptions?.allCompanies?.find(
        (el: any) => el.id == e.key
      );
      const obj = {
        id: selectedCompany?.id,
        name: selectedCompany?.companyName,
      };
      localStorage.setItem("company", selectedCompany?.id);
      setContextOptions((prev) => ({
        ...prev,
        selectedCompany: obj,
        selectedCompanyDetails: selectedCompany,
      }));
    }
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
          selectedKeys: [contextOptions?.selectedCompany?.id?.toString()],
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
              ? `${contextOptions?.userData?.firstName}`
              : "My account"}
          </span>
          <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
};

export default UserHeader;
