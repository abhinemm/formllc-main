import React, { useEffect, useState } from "react";
import styles from "./Webhooks.module.scss";
import { Modal, Spin, Tooltip } from "antd";
import { Formik } from "formik";
import Image from "next/image";
import { createUserAccountSchema } from "@/helpers/validationSchema";
import axios from "axios";
import { UserTypesEnum } from "@/utils/constants";

const CreateWebHook = ({ onClose, open, onSubmit, openNotification }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({
    url: "",
  });

  const onCreateUser = async (values: any) => {
    setLoading(true);
    let requestValue: any = {
      url: values?.url,
    };

    try {
      await axios
        .post(`/api/webhook/create`, requestValue)
        .then((res: any) => {
          setLoading(false);
          if (res?.data?.result) {
            openNotification({
              type: "success",
              message: "Webhook created successfully",
              placement: "topRight",
            });
          }
          onSubmit();
        })
        .catch((err: any) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err?.response?.data?.message ?? "Something went wrong",
            placement: "topRight",
          });
          console.log("the error is", err);
        });
    } catch (error) {
      console.log("the error", error);
      setLoading(false);
    }
  };
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
        <h3>Create Webhook</h3>
        <Formik
          initialValues={initialValues}
        //   validationSchema={createUserAccountSchema}
          onSubmit={onCreateUser}
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
                  <label className={styles.fblabel}>Url</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Type your first name here"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                  />
                  {errors.url && touched.url && (
                    <p className={styles.errorWarning}>{errors.url}</p>
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
      </div>
    </Modal>
  );
};

export default CreateWebHook;
