"use client";
import React, { useEffect, useState } from "react";
import styles from "./company-registration.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import { notification, Select } from "antd";
import { ALLCOUNTRIES } from "@/constants/constants";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useSearchParams } from "next/navigation";
const { Option } = Select;

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const CompanyRegistration = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const body = {};
        const response = await fetch(`/api/company?id=${id}`);
        // await axios
        //   .patch()
        //   .then((res: any) => {
        //     setLoading(false);
        //     console.log("the response", res);
        //   })
        //   .catch((err: any) => {
        //     setLoading(false);
        //     console.log("the error is ", err);
        //   });
      }
    })();
  }, [id]);

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
    proofOfAddress: yup.string().required("Proof is required"),
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
    proofOfAddress: "",
    agreeTerms: false,
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const selectedFile = event.target.files?.[0];
    console.log("selectedFileselectedFile", selectedFile);

    if (selectedFile) {
      setFieldValue("proofOfAddress", selectedFile?.name);
      const maxSizeInBytes = 1 * 1024 * 1024; // 10 MB
      if (selectedFile.size > maxSizeInBytes) {
        notification.open({
          type: "warning",
          message: "File size exceeds 10 MB. Please select a smaller file.",
        });

        setFile(null);
      } else {
        setFile(selectedFile);
      }
    } else {
      setFieldValue("proofOfAddress", "");
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError(null);

      const response = await axios.post(
        "https://utility.formllc.io/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    openNotification({
      type: "warning",
      message: "File size exceeds 10 MB. Please select a smaller file.",
      placement: "topRight",
    });

    // Handle form submission logic here
  };

  return (
    <div className={styles.fbonboardingcardwidgetcontent}>
      {contextHolder}
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
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
                {errors.firstName && touched.firstName && (
                  <p className={styles.errorWarning}>{errors.firstName}</p>
                )}
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
                {errors.lastName && touched.lastName && (
                  <p className={styles.errorWarning}>{errors.lastName}</p>
                )}
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
                {errors.companyName && touched.companyName && (
                  <p className={styles.errorWarning}>{errors.companyName}</p>
                )}
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
                {errors.email && touched.email && (
                  <p className={styles.errorWarning}>{errors.email}</p>
                )}
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
                {errors.streetAddress && touched.streetAddress && (
                  <p className={styles.errorWarning}>{errors.streetAddress}</p>
                )}
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
                {errors.city && touched.city && (
                  <p className={styles.errorWarning}>{errors.city}</p>
                )}
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
                {errors.state && touched.state && (
                  <p className={styles.errorWarning}>{errors.state}</p>
                )}
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
                {errors.state && touched.state && (
                  <p className={styles.errorWarning}>{errors.state}</p>
                )}
              </div>
            </div>

            <div className={styles.doubleFlex}>
              {" "}
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Country</label>
                <Select
                  showSearch
                  placeholder="Select a country"
                  optionFilterProp="children"
                  onChange={handleChange}
                  filterOption={(input: any, option: any) =>
                    (option?.children as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  style={{ width: 300 }}
                >
                  {ALLCOUNTRIES?.map((country) => (
                    <Option key={country.code} value={country.name}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
                {errors.state && touched.state && (
                  <p className={styles.errorWarning}>{errors.state}</p>
                )}
              </div>
              <div className={styles.fbformitem}>
                <label className={styles.fblabel}>Proof of Address</label>
                <div className={styles.fileUpload}>
                  <input
                    className={styles.fbinput}
                    id="confirm-email"
                    type="file"
                    name="proofOfAddress"
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                  {errors.proofOfAddress && touched.proofOfAddress && (
                    <p className={styles.errorWarning}>
                      {errors.proofOfAddress}
                    </p>
                  )}
                  <div className=""></div>
                </div>
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

            <div className={styles.signUpOptions}>
              <ul>
                <li>
                  <button type="submit" className={styles.signInBtn}>
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
