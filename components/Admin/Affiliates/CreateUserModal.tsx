import React, { useState } from "react";
import styles from "./Affiliates.module.scss";
import { Modal, Spin } from "antd";
import { Formik } from "formik";
import Image from "next/image";
import { createUserAccountSchema } from "@/helpers/validationSchema";
import axios from "axios";
import { UserTypesEnum } from "@/utils/constants";

const CreateUserModal = ({
  onClose,
  open,
  onSubmit,
  openNotification,
  userType,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const onCreateUser = async (values: any) => {
    setLoading(true);
    const requestValue = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
      type: userType,
    };
    try {
      await axios
        .post(`/api/users`, requestValue)
        .then((res: any) => {
          setLoading(false);
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
        <h3>Create {userType}</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={createUserAccountSchema}
          onSubmit={onCreateUser}
          //   enableReinitialize={true}
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
                  <label className={styles.fblabel}>First Name</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Type your first name here"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className={styles.errorWarning}>{errors.firstName}</p>
                  )}
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Last Name</label>
                  <input
                    className={styles.fbinput}
                    id="last-name"
                    type="text"
                    placeholder="Type your last name here"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className={styles.errorWarning}>{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                {" "}
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Email</label>
                  <input
                    className={styles.fbinput}
                    id="email"
                    type="text"
                    placeholder="john.doe@mail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <p className={styles.errorWarning}>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Password</label>
                  <input
                    className={styles.fbinput}
                    id="password"
                    type="text"
                    placeholder="●●●●●●●●●"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <p className={styles.errorWarning}>{errors.password}</p>
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

export default CreateUserModal;
