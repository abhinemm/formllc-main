"use client";
import React, { useEffect, useState, useTransition } from "react";
import styles from "./PaymentSuccess.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { notification, Spin } from "antd";
import { verifyDataById } from "@/utils/dodopayVerify";
import { NotificationPlacement } from "antd/es/notification/interface";
type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const PaymentTemp = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState<any>(null);

  useEffect(() => {
    if (paymentId) {
      setSuccess(true);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [paymentId]);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  const handleSupport = () => {
    if (paymentId) {
      const phoneNumber = "447909729519";
      window.open(
        `https://api.whatsapp.com/send?phone=${phoneNumber}&text=I%20have%20completed%20the%20payment%20for%20my%20company.%20My%20Transaction%20ID%20is%20${paymentId}.%20Please%20continue%20with%20the%20registration.`,
        "_blank"
      );
      return;
    }
    window.open(`https://api.whatsapp.com/send?phone=447909729519`, "_blank");
    return;
  };

  const handleRedirection = () => {
    router.push(`/company-registration?id=${id}`);
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      {loading ? (
        <Spin />
      ) : (
        isSuccess !== null && (
          <>
            <div className={styles.successAnimation}>
              {isSuccess ? (
                <div className={styles.checkmark}></div>
              ) : (
                <div className={styles.failedMark}></div>
              )}
            </div>
            <h1 className={styles.title}>
              {isSuccess ? "Payment Successful!" : "Payment Failed!"}
            </h1>
            <p className={styles.message}>
              {isSuccess ? (
                <>
                  Thank you for your payment. Your transaction has been
                  successfully processed. Your Transaction ID is:{" "}
                  <b>{paymentId}</b>. Please contact our support team to proceed
                  with your registration.
                </>
              ) : (
                "Something went wrong while processing your payment. Please try again. If the issue persists, contact our support team for assistance."
              )}
            </p>
            {isSuccess ? (
              <div className={styles?.buttonWrapper}>
                <button
                  type="button"
                  onClick={handleSupport}
                  className={styles?.support}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z" />
                  </svg>
                  Contact Support
                </button>
              </div>
            ) : (
              <div className={styles?.buttonWrapper}>
                <button
                  type="button"
                  onClick={handleSupport}
                  className={styles?.support}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z" />
                  </svg>
                  Contact Support
                </button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default PaymentTemp;
