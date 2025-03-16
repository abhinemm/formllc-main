import React from "react";

import { Modal, Select } from "antd";
import styles from "./userModal.module.scss";

const AddDocument = ({ isAddModalOpen, handleAddCancel }) => {
  return (
    <>
      {" "}
      <Modal centered open={isAddModalOpen} onCancel={handleAddCancel}>
        <div className={styles.deleteWrapper}>
          <h6>Select documents</h6>

          <div>
            <div className={styles.fbformitem}>
              <label className={styles.fblabel}>Document</label>
              <Select
                defaultValue="lucy"
                options={[
                  { value: "jack", label: "Jack" },
                ]}
              />
            </div>

            <div className={styles.fileUpload}>
                <input type="file" />
            </div>
          </div>

          <div>
            <button>Confirm</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddDocument;
