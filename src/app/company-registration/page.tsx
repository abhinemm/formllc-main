"use client"
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
                  id="first-name"
                  type="text"
                  placeholder="Type your first name here"
                  name="firstName"
                  onChange={handleChange}
                  value={values.firstName}
                />
              </div>

              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Owner Last Name</label>
                <input
                  className={styles.fbinput}
                  id="last-name"
                  type="text"
                  placeholder="Type your last name here"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                />
              </div>
            </div>

            <div className={styles.doubleFlex}>
              {" "}
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Company Name</label>
                <input
                  className={styles.fbinput}
                  id="email"
                  type="text"
                  placeholder="Tesla"
                  name="companyName"
                  onChange={handleChange}
                  value={values.companyName}
                />
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Email</label>
                <input
                  className={styles.fbinput}
                  id="confirm-email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
            </div>
            <div className={styles.doubleFlex}>
              {" "}
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Street Address</label>
                <input
                  className={styles.fbinput}
                  id="email"
                  type="text"
                  placeholder="Address line 1"
                  name="streetAddress"
                  onChange={handleChange}
                  value={values.streetAddress}
                />
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>City / Town</label>
                <input
                  className={styles.fbinput}
                  id="confirm-email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                />
              </div>
            </div>
            <div className={styles.doubleFlex}>
              {" "}
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>
                  State / Province / Region
                </label>
                <input
                  className={styles.fbinput}
                  id="email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                />
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Postal / ZIP Code</label>
                <input
                  className={styles.fbinput}
                  id="confirm-email"
                  type="text"
                  placeholder="john.doe@mail.com"
                  name="zipCode"
                  onChange={handleChange}
                  value={values.zipCode}
                />
              </div>
            </div>
            <div className={styles.doubleFlex}>
              {" "}
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Country</label>
                <select
                  className={styles.fbinput}
                  id="email"
                  name="country"
                  onChange={handleChange}
                  value={values.country}
                >
                  <option value="1">country</option>
                  <option value="1">country</option>
                  <option value="1">country</option>
                  <option value="1">country</option>
                </select>
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Proof of Address</label>
                <div className={styles.fileUpload}>
                  <input
                    className={styles.fbinput}
                    id="confirm-email"
                    type="file"
                  />
                  <div className=""></div>
                </div>
              </div>
            </div>

            <div className={styles.fbformitem}>
              <label className={styles.fbcheckboxlabel}>
                <input className={styles.fbcheckbox} type="checkbox" />
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

            <div className={styles.signUpOptions}>
              <ul>
                <li>
                  <button className={styles.signInBtn}>Register</button>
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
