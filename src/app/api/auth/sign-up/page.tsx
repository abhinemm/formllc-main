"use client";
import React from "react";
import CreateAccount from "../../../../../components/CreateAccount/CreateAccount";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const page = () => {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };
  const haddleNewAccount = (res: any) => {
    if (res.data) {
      router.push("/user");
    }
  };
  const handleSignIn = () => {};
  return (
    <div className="sign-up-wrapper">
      {" "}
      <div className={"authHeaderItem"}>
        <h2>Welcome to Formllc</h2>
      </div>
      <CreateAccount
        onCreateAccount={haddleNewAccount}
        openNotification={openNotification}
      />
    </div>
  );
};

export default page;
