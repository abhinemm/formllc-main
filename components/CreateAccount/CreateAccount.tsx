import React from "react";
import styles from "./CreateAccount.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const CreateAccount = () => {
  // const schema = yup.object().shape({
  //   emailOrPhone: yup
  //     .mixed()
  //     .test(
  //       "emailOrPhoneNumber",
  //       "Invalid email or phone number",
  //       function (value) {
  //         if (!value) {
  //           return false;
  //         }

  //         const isEmail = yup.string().email().isValidSync(value);
  //         const isPhoneNumber = yup
  //           .string()
  //           .matches(/^[0-9]{10}$/)
  //           .isValidSync(value);

  //         return isEmail || isPhoneNumber;
  //       }
  //     )
  //     .required("Email or phone number is required"),
  // });
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

    const requestValue = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.email,
      type: values?.password,
    };
    await axios
      .post(`/api/user`, requestValue)
      .then((res: any) => {
        console.log("the response", res);
      })
      .catch((err: any) => {
        console.log("the error is ", err);
      });
  };
  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={schema}
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
                  onChange={handleChange}
                />
                {errors.emailOrPhone && touched.emailOrPhone ? (
                  <p className={styles.errorWarning}>{errors.emailOrPhone}</p>
                ) : null}
              </div>

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Last Name</label>
                <input
                  className={styles.fbinput}
                  id="last-name"
                  type="text"
                  placeholder="Type your last name here"
                  name="lastName"
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Confirm Email</label>
                <input
                  className={styles.fbinput}
                  id="confirm-email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="confirmEmail"
                  onChange={handleChange}
                />
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
                  onChange={handleChange}
                />
              </div>

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Confirm Password</label>
                <input
                  className={styles.fbinput}
                  id="confirm-password"
                  type="password"
                  placeholder="●●●●●●●●●"
                  name="confirmPassword"
                  onChange={handleChange}
                />
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
            </div>
            <div className={styles.btnWrapper}>
              <button>
                <span>Continue </span>
                <span></span>
              </button>
            </div>
          </form>
        )}
      </Formik>

      <div className={styles.signUpOptions}></div>
    </div>
  );
};

export default CreateAccount;
