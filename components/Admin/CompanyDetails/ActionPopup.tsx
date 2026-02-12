import { Modal, Select, Spin } from "antd";
import React, { useState } from "react";
import styles from "./CompanyDetails.module.scss";
import { COMPANYDETAILS } from "@/constants/constants";
import { Formik, Field, ErrorMessage } from "formik";
import { filedActionSchema } from "@/helpers/validationSchema";

const ActionPopup = ({ open, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    description: "",
    fields: "",
  };

  const onSubmit = (valuse: any) => {};

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
    >
      <div className={styles.modalContentWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={filedActionSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.selectWrapper}>
                <label
                  htmlFor="currency-select"
                  className={styles.currencyLabel}
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  value={values.description}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.selectWrapper}>
                <label
                  htmlFor="currency-select"
                  className={styles.currencyLabel}
                >
                  Select field
                </label>
                <Select
                  mode="multiple"
                  placeholder="Please select"
                  onChange={(e) => {
                    console.log("eeeeeeeeeeeeeeeeeee", e);
                  }}
                  style={{ width: "100%" }}
                  options={COMPANYDETAILS}
                />
                <ErrorMessage
                  name="fields"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.btnWrapper}>
                <button disabled={loading}>
                  {loading ? <Spin /> : "Proceed to payment"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ActionPopup;
