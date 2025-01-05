import { Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./MyAccountModal.module.scss";
import { Formik } from "formik";
import Image from "next/image";
import { profileSchema } from "@/helpers/validationSchema";

interface IMyAccountModal {
  open: boolean;
  onClose: () => void;
  userData?: any; //make title optional
}

const MyAccountModal: React.FC<IMyAccountModal> = ({
  onClose,
  open,
  userData,
}) => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const initialValues = {
    firstName: userData?.firstName ?? "",
    lastName: userData?.lastName ?? "",
    email: userData?.email ?? "",
  };

  const onSubmit = (values: any) => {
    console.log("valuesvaluesvalues", values);
  };
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="userModal"
    >
      <div className={styles.formWrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={onSubmit}
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
                <div className={styles.profileImageWrapper}>
                  <Image
                    src={
                      userData?.profilePic
                        ? userData?.profilePic
                        : "/images/avathar.jpg"
                    }
                    width={100}
                    height={100}
                    alt="profile imag"
                  />
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>First Name</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Type your first name here"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    readOnly={!isEdit}
                  />
                  {errors?.firstName && touched?.firstName && (
                    <p className={styles.errorWarning}>
                      {errors?.firstName as string}
                    </p>
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
                    placeholder="Type your first name here"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    readOnly={!isEdit}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className={styles.errorWarning}>
                      {errors?.lastName as string}
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.doubleFlex}>
                <div className={styles.fbformitem}>
                  <label className={styles.fblabel}>Email</label>
                  <input
                    className={styles.fbinput}
                    id="first-name"
                    type="text"
                    placeholder="Type your first name here"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    disabled={true}
                  />
                  {errors.email && touched.email && (
                    <p className={styles.errorWarning}>
                      {errors?.email as string}
                    </p>
                  )}
                </div>
              </div>
              {isEdit && (
                <div className={styles.signUpOptions}>
                  <ul>
                    <li>
                      <button
                        type="submit"
                        className={styles.signInBtn}
                        disabled={updateLoading}
                      >
                        {"Update"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default MyAccountModal;
