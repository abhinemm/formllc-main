import { Formik } from "formik";
import React, { useState } from "react";
import styles from "./CreateAccount.module.scss";
import axios from "axios";
import * as yup from "yup";
import { Spin } from "antd";
import { signIn } from "next-auth/react";
import { ApiStatus } from "@/utils/constants";

const SignIn = ({ onCreateAccount, handleSignIn, openNotification }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
      .then((res: any) => {
        if (res?.error) {
          openNotification({
            type: "error",
            message: res?.error,
            placement: "topRight",
          });
          setLoading(false);
        } else {
          if (res.status === ApiStatus.success) {
            onCreateAccount();
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("the error", err);
      });
  };

  const onSignInWithGoogle = async () => {
    signIn("google", {
      redirect: false,
    })
      .then((res: any) => {
        console.log("the response is", res);
      })
      .catch((error) => {
        console.log("the error is ", error);
      });
  };

  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <form className={styles.fbform} onSubmit={handleSubmit}>
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
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Password</label>
                <input
                  className={styles.fbinput}
                  id="password"
                  type="password"
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

      <div className={styles.signUpOptions}>
        <button onClick={() => onSignInWithGoogle()}>
          <div className={styles.bButtonContent}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              className={`${styles.svgInline} ${styles.faGoogle} ${styles.faW16} ${styles.baseIcon}`}
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign In with Google
          </div>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
