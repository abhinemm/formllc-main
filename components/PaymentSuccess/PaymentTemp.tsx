"use client";
import React, { useEffect, useState, useTransition } from "react";
import styles from "./PaymentSuccess.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { notification, Spin } from "antd";
import { verifyDataById } from "@/utils/dodopayVerify";
import { NotificationPlacement } from "antd/es/notification/interface";
import { decryptURL } from "@/helpers/CryptoHelper";
import axios from "axios";
type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};
export enum paymentType {
  oneTime = "oneTime",
  sub = "sub",
}
type companyDetails = {
  companyId: number;
  type: paymentType;
};

const PaymentTemp = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const userId = searchParams.get("uid");
  const name = searchParams.get("name");
  const amount = searchParams.get("product_price");
  const [loading, setLoading] = useState(true);
  const [isSuccess, setSuccess] = useState<any>(null);
  const [companyDetails, setCompanyDetails] = useState<null | companyDetails>(
    null
  );

  

  const [retryLoading, setRetryLoading] = useState<boolean>(false);
  useEffect(() => {
    if (userId) {
      const decode = decryptURL(userId);
      if (decode) {
        try {
          const obj: companyDetails = JSON.parse(decode);
          if (obj?.companyId) {
            setCompanyDetails(obj);
          }
        } catch (error) {
          setCompanyDetails(null);
        }
      }
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      if (companyDetails?.companyId && paymentId) {
        const body = {
          companyId: companyDetails?.companyId,
          paymentId: paymentId,
          name: name ?? "",
          type: companyDetails.type,
          amount: amount ? Number(amount) : null,
        };
        try {
          await axios
            .post(`/api/company/payment`, body)
            .then((res: any) => {
              setLoading(false);
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
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, [companyDetails]);

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
    router.push(`/company-registration?id=${companyDetails?.companyId}`);
  };

  const handleRedirectionDash = () => {
    router.push(`/user`);
  };

  const handleRetryPayment = async () => {
    if (companyDetails?.companyId) {
      setRetryLoading(true);
      await axios
        .get(`/api/company?id=${companyDetails?.companyId}`)
        .then((res: any) => {
          if (res?.data?.length) {
            const company = res?.data[0];
            handlePayment(company?.id, company?.plan);
          }
        })
        .catch((err: any) => {
          setRetryLoading(false);
        });
    }
  }
  const handlePayment = async (companyId: number, plan: string) => {
    const body = {
      plan: plan,
      companyId: companyId,
      register: true,
      type: paymentType?.oneTime,
    };
    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          if (res?.data?.url) {
            router.push(res?.data?.url);
            setRetryLoading(false);
          }
        })
        .catch((err) => {
          setRetryLoading(false);
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
      setRetryLoading(false);
    }
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
            {companyDetails ? (
              <>
                <p className={styles.message}>
                  {isSuccess ? (
                    <>
                      Thank you for your payment. Your transaction has been
                      successfully processed. Your Transaction ID is:{" "}
                      <b>{paymentId}</b>.
                    </>
                  ) : (
                    "Something went wrong while processing your payment. Please try again. If the issue persists, contact our support team for assistance."
                  )}
                </p>
                {isSuccess ? (
                  <>
                    {companyDetails.type === "sub" ? (
                      <button
                        className={styles.button}
                        onClick={handleRedirectionDash}
                      >
                        Go to Dashboard
                      </button>
                    ) : (
                      <button
                        className={styles.button}
                        onClick={handleRedirection}
                      >
                        {isSuccess ? "Continue" : ""}
                      </button>
                    )}
                  </>
                ) : (
                  <div className={styles?.buttonWrapper}>
                    <button
                      type="button"
                      onClick={handleSupport}
                      className={styles?.support}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z" />
                      </svg>
                      Contact Support
                    </button>
                    <button
                      type="button"
                      className={styles?.retry}
                      onClick={handleRetryPayment}
                      disabled={retryLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path d="M552 256L408 256C398.3 256 389.5 250.2 385.8 241.2C382.1 232.2 384.1 221.9 391 215L437.7 168.3C362.4 109.7 253.4 115 184.2 184.2C109.2 259.2 109.2 380.7 184.2 455.7C259.2 530.7 380.7 530.7 455.7 455.7C463.9 447.5 471.2 438.8 477.6 429.6C487.7 415.1 507.7 411.6 522.2 421.7C536.7 431.8 540.2 451.8 530.1 466.3C521.6 478.5 511.9 490.1 501 501C401 601 238.9 601 139 501C39.1 401 39 239 139 139C233.3 44.7 382.7 39.4 483.3 122.8L535 71C541.9 64.1 552.2 62.1 561.2 65.8C570.2 69.5 576 78.3 576 88L576 232C576 245.3 565.3 256 552 256z" />
                      </svg>

                      {retryLoading ? <Spin /> : "Retry Payment"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className={styles.message}>
                  {isSuccess ? (
                    <>
                      Thank you for your payment. Your transaction has been
                      successfully processed. Your Transaction ID is:{" "}
                      <b>{paymentId}</b>. Please contact our support team to
                      proceed with your registration.
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                      >
                        <path d="M320 128C241 128 175.3 185.3 162.3 260.7C171.6 257.7 181.6 256 192 256L208 256C234.5 256 256 277.5 256 304L256 400C256 426.5 234.5 448 208 448L192 448C139 448 96 405 96 352L96 288C96 164.3 196.3 64 320 64C443.7 64 544 164.3 544 288L544 456.1C544 522.4 490.2 576.1 423.9 576.1L336 576L304 576C277.5 576 256 554.5 256 528C256 501.5 277.5 480 304 480L336 480C362.5 480 384 501.5 384 528L384 528L424 528C463.8 528 496 495.8 496 456L496 435.1C481.9 443.3 465.5 447.9 448 447.9L432 447.9C405.5 447.9 384 426.4 384 399.9L384 303.9C384 277.4 405.5 255.9 432 255.9L448 255.9C458.4 255.9 468.3 257.5 477.7 260.6C464.7 185.3 399.1 127.9 320 127.9z" />
                      </svg>
                      Contact Support
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )
      )}
    </div>
  );
};

export default PaymentTemp;
