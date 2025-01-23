"use client";
import { Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CurrencyModals.module.scss";
import { CURRENCIES } from "@/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SubscriptionRenewProps {
  open: boolean;
  onClose: () => void;
  companyId: number;
  openNotification: any;
}

const SubscriptionRenew: React.FC<SubscriptionRenewProps> = ({
  open,
  onClose,
  companyId,
  openNotification,
}) => {
  const router = useRouter();
  const plans = {
    basic: "BASIC",
    pro: "PRO",
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async (companyId: number, plan: string) => {
    const body = {
      plan: plans[plan],
      companyId: companyId,
      register: true,
    };
    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          console.log("the response is", res);
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
          console.log("the error in payment", err);
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
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
    >
      <div className={styles.modalContentWrapper}>
        <h3>Activate Your Mailroom Address</h3>
        <p className={styles.modalDescription}>
          To receive your dedicated mailroom address, please subscribe to the
          Mailroom Service for <b>$25</b>. This ensures seamless handling of
          your correspondence.
        </p>
        <div className={styles.btnWrapper}>
          <button
            disabled={loading}
            onClick={() => handlePayment(companyId, "pro")}
          >
            {loading ? <Spin /> : "Subscribe"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionRenew;
