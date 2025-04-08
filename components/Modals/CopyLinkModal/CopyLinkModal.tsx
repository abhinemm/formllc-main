import { Modal } from "antd";
import React, { useEffect, useRef } from "react";
import styles from "./CopyLinkModal.module.scss";
interface ICopyLinkModal {
  open: boolean;
  onClose: () => void;
  link?: any; //make title optional
}

const CopyLinkModal: React.FC<ICopyLinkModal> = ({ onClose, open, link }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (link) {
      if (inputRef.current) {
        inputRef.current.value = link;
      }
    }
  }, [link]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="userModal"
    >
      <div className={styles.headerWrapper}>
        <h2>Share Refer Link</h2>
      </div>
      <div className={styles.linkWrapper}>
        <input type="text" name="" id="" ref={inputRef} readOnly/>
        <button type="button" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </Modal>
  );
};

export default CopyLinkModal;
