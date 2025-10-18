'use client'
import React, { useState } from "react";
import styles from "./CommonAction.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";
import { useAppContext } from "../Context/AppContext";
interface ICommonAction {
  title: string;
  btnText: string;
  redirectUrl: string;
  description: string;
}
type NotificationType = "success" | "info" | "warning" | "error";

const plans = {
  basic: "BASIC",
  pro: "PRO",
};

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const CommonAction: React.FC<ICommonAction> = ({
  title,
  btnText,
  redirectUrl,
  description,
}) => {
  const router = useRouter();
  const [isLoading,setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification();
  const { contextOptions, setContextOptions } = useAppContext();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const redirectToPayment = () => {
    if (redirectUrl === "payment") {
      handlePayment(contextOptions?.selectedCompanyDetails.id,contextOptions?.selectedCompanyDetails.plan)
    } else {
      router.push(redirectUrl); // Replace with your actual payment page route
    }
  };


  const handlePayment = async (companyId: number, plan: string) => {
    const body = {
      plan,
      companyId: companyId,
      register: true,
    };
    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          if (res?.data?.url) {
            router.push(res?.data?.url);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err?.response?.data?.message ?? "Something went wrong",
            placement: "topRight",
          });
        });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.data?.message ?? "Something went wrong",
        placement: "topRight",
      });
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.message}>{description}</p>
      <button className={styles.button} onClick={redirectToPayment}>
        {btnText}
      </button>
    </div>
  );
};

export default CommonAction;
