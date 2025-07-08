"use client";
import { Modal } from "antd";
import React from "react";
import styles from "./CurrencyModals.module.scss";

interface PaymentErrorProps {
  open: boolean;
  onClose: () => void;
}

const PaymentError: React.FC<PaymentErrorProps> = ({ open, onClose }) => {
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
          <div className="o-circle c-container__circle o-circle__sign--failure">
            <div className="o-circle__sign"></div>
          </div>
        </div>
        <h3>Payment Failed </h3>
        <p className={styles.modalDescription}>
          Something went wrong with your transaction. Please try again or
          contact support if the issue persists.
        </p>
      </div>
    </Modal>
  );
};

export default PaymentError;
