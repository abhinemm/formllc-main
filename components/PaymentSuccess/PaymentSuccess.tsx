"use client";
import React, { useEffect, useState, useTransition } from "react";
import styles from "./PaymentSuccess.module.scss";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { verifyDataById } from "@/utils/dodopayVerify";
import { Spin } from "antd";

const PaymentSuccess = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  const [isPending, startTransition] = useTransition();
  const [isSuccess, setSuccess] = useState<any>(null);


  const handleRedirection = () => {
    debugger;
    if (!isSuccess) {
      window.open("https://api.whatsapp.com/send?phone=447909729519", "_blank");
      return;
    }
    router.push(`/company-registration?id=${id}`);
  };


  useEffect(() => {
    if (id && paymentId) {
      startTransition(async () => {
        try {
          const resp = await verifyDataById(
            Number(id),
            paymentId.toString()
          );
          setSuccess(resp.isVerified);
        } catch (err) {
          console.log(err);
          setSuccess(false)
        }
      });
    }
  }, [id]);


  return (
    <div className={styles.container}>
      {isPending && !isSuccess ? (
        <Spin/>
      ) : (
        isSuccess!== null && (
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
              {isSuccess
                ? "Thank you for your payment. Your transaction has been successfully processed."
                : "Something went wrong while processing your payment. Please try again. If the issue persists, contact our support team for assistance."}
            </p>
            <button className={styles.button} onClick={handleRedirection}>
              {isSuccess ? "Continue" : "Contact Support"}
            </button>
          </>
        )
      )}
    </div>
  );
};

export default PaymentSuccess;
