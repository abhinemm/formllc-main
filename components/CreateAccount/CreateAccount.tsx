import React, { useState } from "react";
import styles from "./CreateAccount.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Spin } from "antd";
import { createAccountSchema } from "@/helpers/validationSchema";

const CreateAccount = ({ onCreateAccount, handleSignIn }) => {
  const [loading, setLoading] = useState<boolean>(false);


  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  };

  
  const onSubmit = async (values: any) => {
    console.log("the valuses are", values);
    setLoading(true);
    const requestValue = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
      type: "customer",
    };
    try {
      await axios
        .post(`/api/users`, requestValue)
        .then((res: any) => {
          setLoading(false);
          console.log("the response", res);
          onCreateAccount();
        })
        .catch((err: any) => {
          setLoading(false);
          console.log("the error is ", err);
        });
    } catch (error) {
      console.log("the error", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createAccountSchema}
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
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Confirm Email</label>
                <input
                  className={styles.fbinput}
                  id="confirm-email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="confirmEmail"
                  value={values.confirmEmail}
                  onChange={handleChange}
                />
                {errors.confirmEmail && touched.confirmEmail && (
                  <p className={styles.errorWarning}>{errors.confirmEmail}</p>
                )}
              </div>
            </div>

            <div className={styles.doubleFlex}>
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

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Confirm Password</label>
                <input
                  className={styles.fbinput}
                  id="confirm-password"
                  type="password"
                  placeholder="●●●●●●●●●"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className={styles.errorWarning}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.fbformitem}>
              <label className={styles.fbcheckboxlabel}>
                <input
                  className={styles.fbcheckbox}
                  type="checkbox"
                  name="agreeTerms"
                  onChange={handleChange}
                />
                <span> I read and agree with the </span>
                <a className={styles.fblink} href="" target="_blank">
                  Terms of Use
                </a>{" "}
                <span> and </span>
                <a className={styles.fblink} href="" target="_blank">
                  Privacy Policy
                </a>
                .
              </label>
              {errors.agreeTerms && touched.agreeTerms && (
                <p className={styles.errorWarning}>{errors.agreeTerms}</p>
              )}
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
       
      </div>
    </div>
  );
};

export default CreateAccount;
