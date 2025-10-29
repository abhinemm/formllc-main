"use client";

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./Forgotpassword.module.scss";
import {
  emailOnlySchema,
  withPasswordSchema,
} from "@/helpers/validationSchema";
import { notification, Spin } from "antd";
import axios from "axios";
import { decryptURL, encryptURL } from "@/helpers/CryptoHelper";
import OtpVerificationModal from "./OtpVerificationModal";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";
import { useAppContext } from "../Context/AppContext";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const ForgotPassword = () => {
  const initialValues = {
    emailData: "",
    password: "",
    cpassword: "",
  };
  const router = useRouter();
  const { contextOptions } = useAppContext();
  const [loading, setLoading] = useState<any>(false);
  const [userEmail, setUserEmail] = useState<any>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [eyeShow, setEyeShow] = useState<boolean>(false);
  const [cEyeShow, setcEyeShow] = useState<boolean>(false);

  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useEffect(() => {
    if (contextOptions?.userData) {
      openNotification({
        type: "error",
        message:
          "You’re already logged in. Please log out to use the forgot password option.",
        placement: "topRight",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [contextOptions]);

  useEffect(() => {
    const userDataEnc = localStorage.getItem("sndurp");

    if (userDataEnc) {
      const decryptData = decryptURL(userDataEnc);
      if (decryptData) {
        setUserEmail(userEmail);
      }
    }
  }, []);

  const onSubmit = async (values) => {
    if (!isVerified) {
      const body = {
        email: values.emailData,
      };
      setUserEmail(values.emailData);
      const encryptData = encryptURL(values.emailData);
      if (encryptData) {
        localStorage.setItem("sndurp", encryptData);
      }

      setLoading(true);
      await axios
        .post(`/api/otp`, body)
        .then((res: any) => {
          setLoading(false);
          setShow(true);
        })
        .catch((err: any) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err.response?.data?.error ?? "Something went wrong",
            placement: "topRight",
          });
        });
    } else if (values.password) {
      const body = {
        email: values.emailData,
        password: values.password,
      };
      const token = localStorage.getItem("token");
      if (!token) {
        setIsVerified(false);
        openNotification({
          type: "error",
          message: "Session expired. Please request a new OTP.",
          placement: "topRight",
        });
        return;
      }
      localStorage.removeItem("sndurp");
      setLoading(true);
      await axios
        .post(`/api/forgot-password`, body, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res: any) => {
          setLoading(false);
          if (res?.data?.success) {
            openNotification({
              type: "success",
              message: res?.data?.message ?? "Password reset successfully",
              placement: "topRight",
            });
            localStorage.removeItem("token");
            router.push("/api/auth/signin");
          }
        })
        .catch((err: any) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err.response?.data?.error ?? "Something went wrong",
            placement: "topRight",
          });
        });
    }
  };

  const onSuccessVerify = () => {
    setIsVerified(true);
    setShow(false);
  };
  return (
    <div className={styles.forgotWrapper}>
      {contextHolder}
      <div>
        <div className={styles.signinWithGoogleWrapper}>
          {" "}
          <div className={styles.authHeaderItem}>
            <h2>Forgot your password</h2>
            <p>
              Please verify your email address to continue resetting your
              password.
            </p>
          </div>
        </div>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={isVerified ? withPasswordSchema : emailOnlySchema}
            enableReinitialize={true}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className={styles.formContent}>
                  {/* Email Input */}
                  <div className={`${styles.authFormItem}`}>
                    <label htmlFor="inputemaildata">
                      <span>Enter your email</span>
                    </label>
                    <input
                      id="inputemaildata"
                      type="email"
                      name="emailData"
                      placeholder="john.doe@mail.com"
                      autoComplete="off"
                      value={values.emailData}
                      onChange={handleChange}
                      disabled={isVerified}
                    />
                    {errors.emailData && touched.emailData && (
                      <p className={styles.errorWarning}>{errors.emailData}</p>
                    )}
                  </div>
                  {isVerified && (
                    <>
                      <div className={`${styles.authFormItem} `}>
                        <label
                          htmlFor="inputgjwhqew"
                          className={styles.baseTextFieldLabel}
                        >
                          <span>Password</span>
                        </label>
                        <input
                          id="inputgjwhqew"
                          type={eyeShow ? "text" : "password"}
                          name="password"
                          placeholder="●●●●●●●●●"
                          autoComplete="off"
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password && (
                          <p className={styles.errorWarning}>
                            {errors.password}
                          </p>
                        )}
                        {eyeShow ? (
                          <div
                            className={styles.eyeIconWrapper}
                            onClick={() => setEyeShow(false)}
                          >
                            <EyeInvisibleOutlined />
                          </div>
                        ) : (
                          <div
                            className={styles.eyeIconWrapper}
                            onClick={() => setEyeShow(true)}
                          >
                            <EyeOutlined />
                          </div>
                        )}
                      </div>

                      <div className={`${styles.authFormItem} `}>
                        <label
                          htmlFor="input655"
                          className={styles.baseTextFieldLabel}
                        >
                          <span>Conform Password</span>
                        </label>
                        <input
                          id="input655"
                          type={cEyeShow ? "text" : "password"}
                          name="cpassword"
                          placeholder="●●●●●●●●●"
                          autoComplete="off"
                          value={values.cpassword}
                          onChange={handleChange}
                        />
                        {errors.cpassword && touched.cpassword && (
                          <p className={styles.errorWarning}>
                            {errors.cpassword}
                          </p>
                        )}
                        {cEyeShow ? (
                          <div
                            className={styles.eyeIconWrapper}
                            onClick={() => setcEyeShow(false)}
                          >
                            <EyeInvisibleOutlined />
                          </div>
                        ) : (
                          <div
                            className={styles.eyeIconWrapper}
                            onClick={() => setcEyeShow(true)}
                          >
                            <EyeOutlined />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className={styles.formActions}>
                    <button type="submit" disabled={loading}>
                      {loading ? (
                        <Spin />
                      ) : isVerified ? (
                        "Reset Password"
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
      {show && (
        <OtpVerificationModal
          email={userEmail}
          open={show}
          onClose={() => setShow(false)}
          onVerify={onSuccessVerify}
          openNotification={openNotification}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
