import React, { useEffect, useState } from "react";
import styles from "./PaymentsList.module.scss";
import axios from "axios";
import Loader from "../../Loader";
import {
  AutoComplete,
  DatePicker,
  DatePickerProps,
  Modal,
  Select,
  Tooltip,
} from "antd";
import { Formik, getIn } from "formik";
import { registerSchemaAdmin } from "@/helpers/validationSchema";
import { RegistrationStation } from "@/constants/constants";
import { paymentStatus } from "@/utils/constants";

const CreatePayments = ({
  open,
  onClose,
  openNotification,
  updateCompany,
  onSuccess,
}) => {
  const [companyList, setCompanyList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState("70%");
  const initialValues: any = {
    companyId: "",
    paymentId: "",
    paymentDate: "",
    paymentType: "",
    paymentFor: "",
    paymentStatus: "",
    invoiceUrl: "",
    currency: "",
    amount: "",
  };
  useEffect(() => {
    (async () => {
      await fetchCompanies();
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

  const paymentType = [
    {
      value: "oneTime",
      label: "Registration",
    },
    {
      value: "sub",
      label: "Subscription",
    },
  ];

  const paymentFor = [
    {
      value: RegistrationStation?.wyoming_state,
      label: RegistrationStation?.wyoming_state,
    },
    {
      value: RegistrationStation?.mexico_state,
      label: RegistrationStation?.mexico_state,
    },
  ];

  const paymentStatusVal = [
    {
      value: paymentStatus.paid,
      label: paymentStatus.paid,
    },
    {
      value: paymentStatus.failed,
      label: paymentStatus.failed,
    },
  ];

  const fetchCompanies = async () => {
    await axios
      .get(`/api/company`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          label: el?.companyNumber,
          value: el?.id,
        }));
        setCompanyList(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log("errerrerrerr", err);
      });
    setLoading(false);
  };

  const onSubmit = async (values: any) => {
    // setUpdateLoading(true);
    let obj: any = {
      type: values?.companyType,
      registrationState: values?.registrationState,
      document: values.proofOfAddress,
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

      subsriptionPaymentStatus: values?.isSubscribed == "yes" ? true : false,
      regPaymentStatus: values?.isPaid == "yes" ? true : false,
      status: 1,
    };
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
              //   validationSchema={registerSchemaAdmin}
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
                      <label className={styles.fblabel}>
                        Customer Number<span>*</span>
                      </label>
                      <AutoComplete
                        options={companyList}
                        style={{ width: 300 }}
                        placeholder={
                          updateCompany
                            ? updateCompany?.email
                            : "Select Company"
                        }
                        filterOption={(input, option) =>
                          (option?.label as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        // value={
                        //   companyList.find(
                        //     (user: any) => user.value === values.customerId
                        //   )?.label || ""
                        // }
                        onChange={(val) => setFieldValue("companyId", val)}
                        disabled={updateCompany?.userId ? true : false}
                      />

                      <p className={styles.errorWarning}>
                        {touched.companyId && getIn(errors, "companyType")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Payment ID<span>*</span>
                      </label>
                      <Tooltip title="Copy the Payment ID from the payment company's dashboard. eg:- pi_3SGu1bFK1d7mDBo71UMU2w2t">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                        >
                          <path
                            d="M14.8736 7.08335C14.8651 5.54273 14.7971 4.70831 14.2524 4.16431C13.6305 3.54169 12.6282 3.54169 10.625 3.54169H8.5C6.49683 3.54169 5.49454 3.54169 4.87263 4.16431C4.25 4.78623 4.25 5.78852 4.25 7.79169V11.3334C4.25 13.3365 4.25 14.3388 4.87263 14.9607C5.49454 15.5834 6.49683 15.5834 8.5 15.5834H10.625C12.6282 15.5834 13.6305 15.5834 14.2524 14.9607C14.875 14.3388 14.875 13.3365 14.875 11.3334V10.625"
                            stroke="#64B7FF"
                            strokeWidth="1.0625"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2.125 7.08335V11.3334C2.125 11.8969 2.34888 12.4374 2.7474 12.836C3.14591 13.2345 3.68641 13.4584 4.25 13.4584M12.75 3.54169C12.75 2.9781 12.5261 2.4376 12.1276 2.03909C11.7291 1.64057 11.1886 1.41669 10.625 1.41669H7.79167C5.12054 1.41669 3.78462 1.41669 2.95517 2.24685C2.49192 2.7094 2.28721 3.32919 2.19725 4.25002"
                            stroke="#64B7FF"
                            strokeWidth="1.0625"
                            strokeLinecap="round"
                          />
                        </svg>
                      </Tooltip>
                      <input
                        className={styles.fbinput}
                        id="first-name"
                        type="text"
                        placeholder="eg:- pi_3SGu1bFK1d7mDBo71UMU2w2t"
                        name="paymentId"
                        onChange={handleChange}
                        value={values.paymentId}
                      />
                      <p className={styles.errorWarning}>
                        {touched.paymentId && getIn(errors, "paymentId")}
                      </p>
                    </div>

                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Payment Date</label>
                      <DatePicker
                        name="paymentDate"
                        onChange={(e: DatePickerProps) => {
                          console.log(e);
                        }}
                      />
                      <p className={styles.errorWarning}>
                        {touched.lastName && getIn(errors, "lastName")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Payment Type</label>
                      <Select
                        id="currency-select"
                        value={values.paymentType}
                        onChange={(value: any) => {
                          setFieldValue("paymentType", value);
                        }}
                        options={paymentType}
                        style={{ width: "100%" }}
                        placeholder="Select Payment Type"
                      />

                      <p className={styles.errorWarning}>
                        {touched.paymentType && getIn(errors, "paymentType")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Payment For</label>
                      <Select
                        value={values.paymentFor}
                        onChange={(value: any) => {
                          setFieldValue("paymentFor", value);
                        }}
                        options={paymentFor}
                        style={{ width: "100%" }}
                        placeholder="Payment for"
                      />
                      <p className={styles.errorWarning}>
                        {touched.paymentFor && getIn(errors, "paymentFor")}
                      </p>
                    </div>
                  </div>

                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Payment Status</label>
                      <Select
                        id="currency-select"
                        value={values.paymentStatus}
                        onChange={(value: any) => {
                          setFieldValue("paymentStatus", value);
                        }}
                        options={paymentStatusVal}
                        style={{ width: "100%" }}
                        placeholder="Payment Status"
                      />

                      <p className={styles.errorWarning}>
                        {touched.paymentStatus &&
                          getIn(errors, "paymentStatus")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Invoice Url</label>
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
                    {/* <div className={styles.fbformitemSelect}>
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
                      <p className={styles.errorWarning}>
                        {touched.countryCode && getIn(errors, "countryCode")}
                      </p>
                      <p className={styles.errorWarning}>
                        {touched.phone && getIn(errors, "phone")}
                      </p>
                    </div> */}
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

                  {/* <div className={styles.doubleFlex}>
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
                  </div> */}

                  {/* <div className={styles.doubleFlex}>
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
                  </div> */}

                  {/* <div className={styles.signUpOptions}>
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
                  </div> */}

                  {/* <Modal
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
                  </Modal> */}
                </form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreatePayments;
