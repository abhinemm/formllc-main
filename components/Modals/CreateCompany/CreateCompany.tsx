"use client";
import React, { useEffect, useState } from "react";
import styles from "./CreateCompany.module.scss";
import { Formik, getIn } from "formik";

import { AutoComplete, InputNumber, Modal, Select, Spin } from "antd";
import {
  ALLCOUNTRIES,
  COUNTRYCODE,
  RegistrationStation,
} from "@/constants/constants";

import { UploadOutlined } from "@ant-design/icons";
import { registerSchemaAdmin } from "@/helpers/validationSchema";
import Image from "next/image";
import ImageUploadComponent from "../../ImageUploadComponent/ImageUploadComponent";

import Loader from "../../Loader";
import axios from "axios";

const { Option } = Select;

const CreateCompany = ({
  open,
  onClose,
  openNotification,
  updateCompany,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState("70%");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fileArray, setFileArray] = useState<any>([]);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<any>([]);

  const companyType = [
    {
      value: "LLC",
      label: "LLC",
    },
  ];

  const paymenyStatus = [
    {
      value: "yes",
      label: "Yes",
    },
    {
      value: "no",
      label: "No",
    },
  ];

  const companyStates = Object.values(RegistrationStation).map((el) => ({
    value: el,
    label: el,
  }));

  const initialValues: any = {
    customerId: updateCompany?.userId ? `${updateCompany?.userId}` : "",
    companyType: updateCompany?.type ? updateCompany?.type : "LLC",
    registrationState: updateCompany?.registrationState
      ? updateCompany?.registrationState
      : "Wyoming",
    isPaid: updateCompany?.regPaymentStatus ? "yes" : "no",
    isSubscribed: updateCompany?.subsriptionPaymentStatus ? "yes" : "no",
    firstName: updateCompany?.ownerFname ?? "",
    lastName: updateCompany?.ownerLname ?? "",
    companyName: updateCompany?.companyName ?? "",
    email: updateCompany?.companyEmail ?? "",
    streetAddress: updateCompany?.streetAddress ?? "",
    city: updateCompany?.city ?? "",
    state: updateCompany?.state ?? "",
    zipCode: updateCompany?.zipCode ?? "",
    country: updateCompany?.country ?? "",
    proofOfAddress: updateCompany?.document ?? "",
    countryCode: updateCompany?.countryCode ?? "+91",
    phone: updateCompany?.phone ?? "",
  };

  useEffect(() => {
    if (updateCompany?.document) {
      const docArray = updateCompany?.document.split(",");
      setFileArray(docArray);
    }
  }, [updateCompany]);

  useEffect(() => {
    (async () => {
      await fetchUsersList();
    })();
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const updateWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setModalWidth("100%"); // Mobile
    } else if (width <= 768) {
      setModalWidth("90%"); // Tablet
    } else {
      setModalWidth("70%"); // Desktop
    }
  };

  const fetchUsersList = async () => {
    await axios
      .get(`/api/users/active-users`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          label: el?.email,
          value: el?.id,
        }));
        setUserList(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
    setLoading(false);
  };

  const onSubmit = async (values: any) => {
    setUpdateLoading(true);
    let obj: any = {
      type: values?.companyType,
      registrationState: values?.registrationState,
      document: values.proofOfAddress,
      ownerFname: values?.firstName,
      ownerLname: values?.lastName,
      companyName: values?.companyName,
      companyEmail: values?.email?.toLocaleLowerCase(),
      streetAddress: values?.streetAddress,
      city: values?.city,
      state: values?.state,
      zipCode: values?.zipCode,
      country: values?.country,
      countryCode: values?.countryCode,
      phone: values?.phone,
      plan:
        values?.registrationState === RegistrationStation.wyoming_state
          ? "PRO"
          : "BASIC",
      subsriptionPaymentStatus: values?.isSubscribed == "yes" ? true : false,
      regPaymentStatus: values?.isPaid == "yes" ? true : false,
      status: 1,
    };
    if (!updateCompany) {
      obj.userId = values?.customerId;
    }

    if (updateCompany) {
      try {
        await axios
          .patch(`/api/company/create?id=${updateCompany?.id}`, obj)
          .then((res: any) => {
            setUpdateLoading(false);
            openNotification({
              type: "success",
              message: "Company Updated Successfully",
              placement: "topRight",
            });
            onSuccess();
          })
          .catch((err: any) => {
            setUpdateLoading(false);
            const message =
              err?.response?.data?.error || "Something went wrong!";
            openNotification({
              type: "error",
              message: message,
              placement: "topRight",
            });
          });
      } catch (error) {
        setUpdateLoading(false);
      }
    } else {
      try {
        await axios
          .post(`/api/company/create`, obj)
          .then((res: any) => {
            setUpdateLoading(false);
            openNotification({
              type: "success",
              message: "Buisness registered sucessfully",
              placement: "topRight",
            });
            onSuccess();
          })
          .catch((err: any) => {
            setUpdateLoading(false);
            const message =
              err?.response?.data?.error || "Something went wrong!";
            openNotification({
              type: "error",
              message: message,
              placement: "topRight",
            });
          });
      } catch (error) {
        setUpdateLoading(false);
      }
    }
  };

  const onSubmitImg = (urls: any, setFieldValue: any) => {
    
    if (urls.length) {
      setFieldValue("proofOfAddress", urls.join(","));
      setFileArray(urls);
      setOpenModal(false);
    } else {
      setFieldValue("proofOfAddress", "");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Modal
          open={open}
          onCancel={onClose}
          footer={null}
          closable={true}
          width={modalWidth}
          className="companyModal"
        >
          <h2 className={styles.heading}>
            {updateCompany ? "Update Company" : "Create Company"}
          </h2>
          <div className={styles.fbonboardingcardwidgetcontent}>
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchemaAdmin}
              onSubmit={onSubmit}
              enableReinitialize={true}
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
                      <label className={styles.fblabel}>Customer Name</label>

                      <Select
                        showSearch
                        placeholder="Select a Customer"
                        optionFilterProp="children"
                        onChange={(e) => {
                          setFieldValue("customerId", e);
                        }}
                        filterOption={(input: any, option: any) =>
                          (option?.children as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        style={{ width: 300 }}
                        disabled={updateCompany ? true : false}
                      >
                        {userList?.map((user) => (
                          <Option key={user.value} value={user.value}>
                            {user.label}
                          </Option>
                        ))}
                      </Select>

                      <p className={styles.errorWarning}>
                        {touched.companyType && getIn(errors, "companyType")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Company Type</label>
                      <Select
                        id="currency-select"
                        value={values.companyType}
                        onChange={(value: any) => {
                          setFieldValue("companyType", value);
                        }}
                        options={companyType}
                        style={{ width: "100%" }}
                        placeholder="Select Company Type"
                      />

                      <p className={styles.errorWarning}>
                        {touched.companyType && getIn(errors, "companyType")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Registration State
                      </label>
                      <Select
                        value={values.registrationState}
                        onChange={(value: any) => {
                          setFieldValue("registrationState", value);
                        }}
                        options={companyStates}
                        style={{ width: "100%" }}
                        placeholder="Select Company Type"
                      />
                      <p className={styles.errorWarning}>
                        {touched.registrationState &&
                          getIn(errors, "registrationState")}
                      </p>
                    </div>
                  </div>
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Is Paid</label>
                      <Select
                        id="currency-select"
                        value={values.isPaid}
                        onChange={(value: any) => {
                          setFieldValue("isPaid", value);
                        }}
                        options={paymenyStatus}
                        style={{ width: "100%" }}
                        placeholder="Is paid"
                      />

                      <p className={styles.errorWarning}>
                        {touched.isPaid && getIn(errors, "isPaid")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Active Subscription
                      </label>
                      <Select
                        value={values.isSubscribed}
                        onChange={(value: any) => {
                          setFieldValue("isSubscribed", value);
                        }}
                        options={paymenyStatus}
                        style={{ width: "100%" }}
                        placeholder="Select Company Type"
                      />
                      <p className={styles.errorWarning}>
                        {touched.isSubscribed && getIn(errors, "isSubscribed")}
                      </p>
                    </div>
                  </div>

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
                      <p className={styles.errorWarning}>
                        {touched.firstName && getIn(errors, "firstName")}
                      </p>
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
                      <p className={styles.errorWarning}>
                        {touched.lastName && getIn(errors, "lastName")}
                      </p>
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
                      <p className={styles.errorWarning}>
                        {touched.companyName && getIn(errors, "companyName")}
                      </p>
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
                      <p className={styles.errorWarning}>
                        {touched.email && getIn(errors, "email")}
                      </p>
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
                              showSearch
                              style={{ width: 100, color: "#fff" }}
                              onChange={(e: any) => {
                                setFieldValue("countryCode", e);
                              }}
                              optionFilterProp="children"
                              value={values.countryCode}
                              placeholder="Code"
                              filterOption={(input: any, option: any) =>
                                (option?.children as string)
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
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
                      <p className={styles.errorWarning}>
                        {touched.countryCode && getIn(errors, "countryCode")}
                      </p>
                      <p className={styles.errorWarning}>
                        {touched.phone && getIn(errors, "phone")}
                      </p>
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
                      <p className={styles.errorWarning}>
                        {touched.streetAddress &&
                          getIn(errors, "streetAddress")}
                      </p>
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
                        placeholder="City / Town"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                      />
                      <p className={styles.errorWarning}>
                        {touched.city && getIn(errors, "city")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        State / Province / Region
                      </label>
                      <input
                        className={styles.fbinput}
                        id="email"
                        type="text"
                        placeholder="State / Province / Region"
                        name="state"
                        onChange={handleChange}
                        value={values.state}
                      />
                      <p className={styles.errorWarning}>
                        {touched.state && getIn(errors, "state")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    {" "}
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Postal / ZIP Code
                      </label>
                      <input
                        className={styles.fbinput}
                        id="confirm-email"
                        type="text"
                        placeholder="Postal / ZIP Code"
                        name="zipCode"
                        onChange={handleChange}
                        value={values.zipCode}
                      />
                      <p className={styles.errorWarning}>
                        {touched.zipCode && getIn(errors, "zipCode")}
                      </p>
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
                        value={values.country}
                        style={{ width: 300 }}
                      >
                        {ALLCOUNTRIES?.map((country) => (
                          <Option key={country.code} value={country.name}>
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                      <p className={styles.errorWarning}>
                        {touched.country && getIn(errors, "country")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    {" "}
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Proof of Address</label>
                      <div className={styles.fileUpload}>
                        <div className={styles.proofOfAddressWrapper}>
                          {fileArray?.map((el: any, idx: number) => (
                            <div className={styles.imageWrapper} key={idx}>
                              <Image
                                width={50}
                                height={50}
                                src={el}
                                alt="image"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => setOpenModal(true)}
                            className={styles.addBtn}
                          >
                            <UploadOutlined />
                            Add
                          </button>
                        </div>
                        <p className={styles.errorWarning}>
                          {touched.proofOfAddress &&
                            getIn(errors, "proofOfAddress")}
                        </p>
                        <div className=""></div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.signUpOptions}>
                    <ul>
                      <li>
                        <button
                          type="submit"
                          className={styles.signInBtn}
                          disabled={updateLoading}
                        >
                          {updateLoading ? (
                            <Spin />
                          ) : updateCompany ? (
                            "Update"
                          ) : (
                            "Register"
                          )}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <Modal
                    open={openModal}
                    onCancel={() => setOpenModal(false)}
                    footer={null}
                    closable={true}
                    maskClosable={false}
                  >
                    <ImageUploadComponent
                      openNotification={openNotification}
                      onSubmitImg={(data: any) =>
                        onSubmitImg(data, setFieldValue)
                      }
                      fileArray={fileArray}
                    />
                  </Modal>
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateCompany;
