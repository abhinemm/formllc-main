"use client";
import React, { useEffect, useState } from "react";
import styles from "./company-registration.module.scss";
import { Formik } from "formik";

import { InputNumber, notification, Select, Spin } from "antd";
import { ALLCOUNTRIES, COUNTRYCODE } from "@/constants/constants";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../../../components/Loader";
import { registerSchema } from "@/helpers/validationSchema";
const { Option } = Select;

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const CompanyRegistration = () => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

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
    countryCode: "+91",
    phone: "",
    agreeTerms: false,
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (id) {
        await axios
          .get(`/api/company?id=${id}`)
          .then((res: any) => {
            setLoading(false);
            if (res?.data?.length) {
              setCompanyDetails(res?.data[0]);
            } else {
              router.push("/");
            }
            console.log("the response", res);
          })
          .catch((err: any) => {
            setLoading(false);
            router.push("/");
            console.log("the error is ", err);
          });
      } else {
        router.push("/");
      }
    })();
  }, [id]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFieldValue("proofOfAddress", selectedFile?.name);
      const maxSizeInBytes = 1 * 1024 * 1024; // 10 MB
      if (selectedFile.size > maxSizeInBytes) {
        openNotification({
          type: "warning",
          message: "File size exceeds 10 MB. Please select a smaller file.",
          placement: "topRight",
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
      openNotification({
        type: "error",
        message: "No file selected.",
        placement: "topRight",
      });

      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
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
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      openNotification({
        type: "error",
        message: "Error uploading file. Please try again.",
        placement: "topRight",
      });
    }
  };

  const onSubmit = async (values: any) => {
    setUpdateLoading(true);
    const file = await handleFileUpload();
    const data = {
      document: file?.url,
      ownerFname: values?.firstName,
      ownerLname: values?.lastName,
      companyName: values?.companyName,
      companyEmail: values?.email,
      streetAddress: values?.streetAddress,
      city: values?.city,
      state: values?.state,
      zipCode: values?.zipCode,
      country: values?.country,
      countryCode: values?.countryCode,
      phone: values?.phone,
      status: 1,
    };
    try {
      await axios
        .patch(`/api/company?id=${id}`, data)
        .then((res: any) => {
          setUpdateLoading(false);
          openNotification({
            type: "success",
            message: "Buisness registered sucessfully",
            placement: "topRight",
          });
          router.push("/user");
        })
        .catch((err: any) => {
          setUpdateLoading(false);
          const message = err?.response?.data?.error || "Something went wrong!";
          openNotification({
            type: "error",
            message: message,
            placement: "topRight",
          });
          console.log("the error is ", err);
        });
    } catch (error) {
      console.log("the error is ", error);
      setUpdateLoading(false);
    }
    // Handle form submission logic here
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.fbonboardingcardwidgetcontent}>
          {contextHolder}
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
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
                      <p className={styles.errorWarning}>
                        {errors.companyName}
                      </p>
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
                  <div className={styles.fbformitemSelect}>
                    <label className={styles.fblabel}>Phone</label>
                    <InputNumber
                      addonBefore={
                        <>
                          <Select
                            style={{ width: 100, color: "#fff" }}
                            onChange={(e: any) => {
                              setFieldValue("countryCode", e);
                            }}
                            value={values.countryCode}
                            placeholder="Code"
                          >
                            {COUNTRYCODE?.map((el: any, index: number) => (
                              <Option value={el?.dial_code} key={index}>
                                {`${el?.code}(${el?.dial_code})`}
                              </Option>
                            ))}
                          </Select>
                        </>
                      }
                      onChange={(e) => {
                        setFieldValue("phone", e);
                      }}
                      value={values.phone}
                      placeholder="Phone number"
                    />
                    {/* <input
                      className={styles.fbinput}
                      id="confirm-email"
                      type="text"
                      placeholder="john.doe@mail.com"
                      name="city"
                      onChange={handleChange}
                      value={values.city}
                    /> */}
                    {errors.countryCode && touched.countryCode && (
                      <p className={styles.errorWarning}>
                        {errors.countryCode}
                      </p>
                    )}
                    {errors.phone && touched.phone && (
                      <p className={styles.errorWarning}>{errors.phone}</p>
                    )}
                  </div>
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
                      <p className={styles.errorWarning}>
                        {errors.streetAddress}
                      </p>
                    )}
                  </div>
                </div>

                <div className={styles.doubleFlex}>
                  {" "}
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
                </div>

                <div className={styles.doubleFlex}>
                  {" "}
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
                    {errors.zipCode && touched.zipCode && (
                      <p className={styles.errorWarning}>{errors.zipCode}</p>
                    )}
                  </div>
                  <div className={styles.fbformitem}>
                    <label className={styles.fblabel}>Country</label>
                    <Select
                      showSearch
                      placeholder="Select a country"
                      optionFilterProp="children"
                      onChange={(e) => {
                        setFieldValue("country", e);
                      }}
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
                    {errors.country && touched.country && (
                      <p className={styles.errorWarning}>{errors.country}</p>
                    )}
                  </div>
                </div>
                <div className={styles.doubleFlex}>
                  {" "}
                  <div className={styles.fbformitem}>
                    <label className={styles.fblabel}>Proof of Address</label>
                    <div className={styles.fileUpload}>
                      <input
                        className={styles.fbinput}
                        id="confirm-email"
                        type="file"
                        name="proofOfAddress"
                        accept="image/*"
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
                      <button
                        type="submit"
                        className={styles.signInBtn}
                        disabled={updateLoading}
                      >
                        {updateLoading ? <Spin /> : "Register"}
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default CompanyRegistration;
