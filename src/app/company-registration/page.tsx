import React from "react";
import styles from "./company-registration.module.scss";
import { Formik } from "formik";
import * as yup from "yup";

const CompanyRegistration = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    companyName: yup.string().required("Company name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), undefined], "Emails must match")
      .required("Confirm email is required"),
    streetAddress: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("ZIP code is required"),
    country: yup.string().required("Country is required"),
    agreeTerms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    confirmEmail: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    proofOfAddress: null,
    agreeTerms: false,
  };

  const onSubmit = (values) => {
    console.log("Form submitted with values:", values);
    // Handle form submission logic here
  };

  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
          <form className={styles.fbform} onSubmit={handleSubmit}>
            <div className={styles.doubleFlex}>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Owner First Name</label>
                <input
                  className={styles.fbinput}
                  name="firstName"
                  type="text"
                  placeholder="Type your first name here"
                  onChange={handleChange}
                />
                {errors.firstName && touched.firstName && (
                  <p className={styles.errorWarning}>{errors.firstName}</p>
                )}
              </div>

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Owner Last Name</label>
                <input
                  className={styles.fbinput}
                  name="lastName"
                  type="text"
                  placeholder="Type your last name here"
                  onChange={handleChange}
                />
                {errors.lastName && touched.lastName && (
                  <p className={styles.errorWarning}>{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className={styles.doubleFlex}>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Company Name</label>
                <input
                  className={styles.fbinput}
                  name="companyName"
                  type="text"
                  placeholder="Type your company name here"
                  onChange={handleChange}
                />
                {errors.companyName && touched.companyName && (
                  <p className={styles.errorWarning}>{errors.companyName}</p>
                )}
              </div>

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Email</label>
                <input
                  className={styles.fbinput}
                  name="email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className={styles.errorWarning}>{errors.email}</p>
                )}
              </div>
            </div>

            {/* Additional Fields with Validation */}

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
                </a>
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

            <div className={styles.signUpOptions}>
              <ul>
                <li>
                  <button className={styles.signInBtn} type="submit">
                    Register
                  </button>
                </li>
              </ul>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyRegistration;
