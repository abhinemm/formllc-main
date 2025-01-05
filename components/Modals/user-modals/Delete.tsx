import React from "react";
import { Modal } from "antd";
import styles from "./userModal.module.scss";
const Delete = ({ isModalOpen, handleCancel }) => {
  return (
    <>
      {" "}
      <Modal centered open={isModalOpen} onCancel={handleCancel}>
        <div className={styles.deleteWrapper}>
          <h6>Delete documents?</h6>

          <div>
            <button>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Delete;
