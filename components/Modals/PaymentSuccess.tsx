"use client";
import { Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CurrencyModals.module.scss";
import { CURRENCIES } from "@/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PaymentSuccessProps {
  open: boolean;
  onClose: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
    >
      <div className={styles.modalContentWrapper}>
        <div className={styles.successAnimation}>
          <svg
            className={styles.checkmark}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className={styles.checkmarkCircle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className={styles.checkmarkCheck}
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h3>Your payment was successful </h3>
        <p className={styles.modalDescription}>
          Thank you for your payment! Your transaction has been processed
          successfully. You can now enjoy our services without any
          interruptions.
        </p>
      </div>
    </Modal>
  );
};

export default PaymentSuccess;
