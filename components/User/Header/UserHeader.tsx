import React, { useLayoutEffect, useState } from "react";
import styles from "./UserHeader.module.scss";
import { Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAppContext } from "../../Context/AppContext";
import { useRouter } from "next/navigation";
import MyAccountModal from "../../Modals/ProfileModal/MyAccountModal";
import { SideMenuHelper } from "@/helpers/helper";
const { Header } = Layout;

const UserHeader = () => {
  const router = useRouter();
  const { contextOptions, setContextOptions } = useAppContext();
  const [accountShow, setAccountShow] = useState<boolean>(false);
  const [accountKey, setAccountKey] = useState<any>();

  const [itemList, setItemList] = useState<MenuProps["items"]>([]);
  useLayoutEffect(() => {
    if (contextOptions?.allCompanies?.length) {
      const itemlist = contextOptions?.allCompanies?.map((el: any) => ({
        key: el.id,
        label: `${el?.companyName ?? "Company"} ${el?.type}`,
      }));
      setItemList([...itemlist, { key: "0", label: "+ Add new Company" }]);
    }
  }, [contextOptions?.allCompanies]);

  const items: MenuProps["items"] = [
    {
      key: "1",
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
      const menu = SideMenuHelper(selectedCompany);
      const obj = {
        id: selectedCompany?.id,
        name: `${selectedCompany?.companyName ?? ""} ${selectedCompany?.type}`,
      };

      localStorage.setItem("company", selectedCompany?.id);
      setContextOptions((prev) => ({
        ...prev,
        selectedCompany: obj,
        selectedCompanyDetails: selectedCompany,
        sideMenus: menu,
      }));
    }
  };

  const handleAccountClick = (e: any) => {
    setAccountKey(e.key);
    if (e.key === "1") {
      setAccountShow(true);
    }
  };

  return (
    <>
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
        <Dropdown menu={{ items, onClick: handleAccountClick }}>
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
      <MyAccountModal
        onClose={() => setAccountShow(false)}
        open={accountShow}
        userData={contextOptions.userData}
      />
    </>
  );
};

export default UserHeader;
