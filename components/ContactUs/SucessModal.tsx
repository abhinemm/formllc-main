import { Button, Modal } from "antd";
import React from "react";
import styles from "./ContactUs.module.scss";

const SucessModal = ({ show, onClose, email }) => {
  return (
    <Modal
      open={show}
      onCancel={onClose}
      closable={true}
      footer={[
        <Button
          key="ok"
          type="primary"
          onClick={onClose}
          className={styles.modalButton}
        >
          OK
        </Button>
      ]}
      className={`${styles.modal} currencyModal`}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalTitle}>🎉 Success!</div>
        <p>
          Thank you for reaching out! Your message has been received, and our
          team will get back to you shortly.
        </p>
        <p>
          We’ve also sent a confirmation to your email: <b>{email}</b>.
        </p>
        <p>📧 Keep an eye on your inbox for our response!</p>
      </div>
    </Modal>
  );
};

export default SucessModal;
