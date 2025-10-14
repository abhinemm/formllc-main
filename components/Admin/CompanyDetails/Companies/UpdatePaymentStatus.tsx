import React, { useState } from "react";
import { Modal, Spin } from "antd";
import styles from "./Companies.module.scss";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import axios from "axios";

const UpdatePaymentStatus = ({
  open,
  onClose,
  companyDetails,
  openNotification,
  onSuccess,
}) => {
  console.log("companyDetailscompanyDetails", companyDetails);

  const [loading, setloading] = useState<boolean>(false);
  const initialValues = {
    isPaid: companyDetails?.regPaymentStatus ? "yes" : "no",
    isSubscribed: companyDetails?.subsriptionPaymentStatus ? "yes" : "no",
  };

  const onSubmit = async (values) => {
    let obj: any = {
      subsriptionPaymentStatus: values?.isSubscribed == "yes" ? true : false,
      regPaymentStatus: values?.isPaid == "yes" ? true : false,
    };
    try {
      setloading(true);
      await axios
        .patch(`/api/company/create?id=${companyDetails?.id}`, obj)
        .then((res: any) => {
          setloading(false);
          openNotification({
            type: "success",
            message: "Payment Updated Successfully",
            placement: "topRight",
          });
          onSuccess();
        })
        .catch((err: any) => {
          setloading(false);
          const message = err?.response?.data?.error || "Something went wrong!";
          openNotification({
            type: "error",
            message: message,
            placement: "topRight",
          });
          console.log("the error is ", err);
        });
    } catch (error) {
      console.log("the error is ", error);
      setloading(false);
    }
  };
  return (
    <Modal centered open={open} onCancel={onClose}>
      <div className={styles.updatePaymentWrapper}>
        <h2>Update Payment Status</h2>
        <Formik
          initialValues={initialValues}
          //   validationSchema={uploadDocumentSchems}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <form className={styles.fbform} onSubmit={handleSubmit}>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Is Paid</label>
                  <select
                    id="mySelect"
                    name="isPaid"
                    onChange={handleChange}
                    value={values.isPaid}
                  >
                    <option value={""}>Select</option>
                    <option value={"yes"}>Yes</option>
                    <option value={"no"}>No</option>
                  </select>
                  {errors.isPaid && touched.isPaid && (
                    <p className={styles.errorWarning}>{errors.isPaid}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Is Subscribed</label>
                  <select
                    id="mySelect"
                    name="isSubscribed"
                    onChange={handleChange}
                    value={values.isSubscribed}
                  >
                    <option value={""}>Select</option>
                    <option value={"yes"}>Yes</option>
                    <option value={"no"}>No</option>
                  </select>
                  {errors.isSubscribed && touched.isSubscribed && (
                    <p className={styles.errorWarning}>{errors.isSubscribed}</p>
                  )}
                </div>
              </div>

              <div className={styles.btnWrapper}>
                <button disabled={loading}>
                  <span>{loading ? <Spin /> : "Continue"} </span>
                  <span></span>
                </button>
              </div>
            </form>
          )}
        </Formik>
        {/* <div>
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
        </div> */}
      </div>
    </Modal>
  );
};

export default UpdatePaymentStatus;
