import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Confirmation.module.scss";

const ComfirmationModal = ({ open, onClose, onConfirm, value }) => {
  const [status, setStatus] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  useEffect(() => {
    const splitted: any = value?.split("-");
    setStatus(Number(splitted[1]));
    setId(Number(splitted[0]));
  }, []);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="userModal"
      maskClosable={false}
    >
      <div className={styles.formWrapper}>
        <h3>Confirmation</h3>
        <div className={styles.confirmWrapper}>
          <p>Are you sure you want to permanently delete this user?</p>
          <div className={styles.btnWrapper}>
            <button type="submit" onClick={() => onConfirm(id, status)}>
              Yes,{" "}
              {status === 1
                ? "Activate"
                : status === 2
                ? "Delete"
                : "In Activate"}
            </button>
            <button type="submit" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ComfirmationModal;
