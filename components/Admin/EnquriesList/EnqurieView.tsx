import { Modal } from "antd";
import React from "react";
import styles from "./EnquriesList.module.scss";
import { WhatsAppOutlined } from "@ant-design/icons";

const EnqurieView = ({ open, onClose, details }) => {
  const onClickWhatsapp = (phone) => {
    const number = phone.replace(/\s+/g, "").replace(/\+/g, "");
    const link = `https://wa.me/${number}`;
    window.open(link, "_blank");
  };
  return (
    <Modal centered open={open} onCancel={onClose}>
      <div className={styles.detailsWrapper}>
        <h2>Enquiry Details</h2>
        <div>
          <h3>
            <span>Name: </span> {details?.name}
          </h3>
          <h3>
            <span>Email: </span> {details?.email}
          </h3>
          <h3>
            <span>Phone: </span> {details?.phno}
          </h3>
          <h3>
            <span>Date: </span> {details?.date}
          </h3>
          <div>
            <h3>Subject</h3>
            <p>{details?.des}</p>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              type="button"
              onClick={() => onClickWhatsapp(details?.phno)}
            >
              <WhatsAppOutlined /> Chat on Whatsapp
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EnqurieView;
