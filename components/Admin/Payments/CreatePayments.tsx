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
  Spin,
  Tooltip,
} from "antd";
import { Formik, getIn } from "formik";
import { CURRENCIES, RegistrationStation } from "@/constants/constants";
import { paymentStatus, PlansEnum } from "@/utils/constants";
import { createPaymentSchema } from "@/helpers/validationSchema";
import { NIL } from "uuid";
import { paymentType } from "../../PaymentSuccess/PaymentTemp";
import dayjs from "dayjs";

const CreatePayments = ({
  open,
  onClose,
  openNotification,
  updatePayment,
  onSuccess,
}) => {
  const [companyList, setCompanyList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalWidth, setModalWidth] = useState("70%");
  const [currencyList, setCurrencyList] = useState<any>([]);
  const [allCompanyData, setAllCompanyData] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const allCurrency = CURRENCIES;
  const initialValues: any = {
    companyId: updatePayment?.companyId ? updatePayment.companyId : "",
    paymentId: updatePayment?.paymentId ? updatePayment.paymentId : "",
    paymentDate: updatePayment?.paymentDate ? updatePayment.paymentDate : "",
    paymentType: updatePayment?.type ? updatePayment.type : "",
    paymentStatus: updatePayment?.status ? updatePayment.status : "",
    invoiceUrl: updatePayment?.invoicePDF ? updatePayment.invoicePDF : "",
    amount: updatePayment?.amountPaid ? updatePayment.amountPaid : "",
    currency: updatePayment?.currency ? updatePayment.currency : "",
    description: updatePayment?.description ? updatePayment.description : "",
  };
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  const isEdit = !!updatePayment;
  useEffect(() => {
    (async () => {
      await fetchCompanies();
    })();
  }, []);

  useEffect(() => {
    if (allCurrency?.length) {
      const maped = allCurrency?.map((el: any) => ({
        value: el?.currencyCode,
        label: `${el?.currencyCode}(${el?.currencyName})`,
      }));
      setCurrencyList(maped);
    }
  }, [allCurrency]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // When editing, preselect company in state so we don't force user to re-select
  useEffect(() => {
    if (isEdit && allCompanyData?.length && updatePayment?.companyId) {
      const company = allCompanyData.find(
        (el: any) => el.id === Number(updatePayment.companyId)
      );
      if (company) {
        setSelectedCompany(company);
      }
    }
  }, [isEdit, allCompanyData, updatePayment]);

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

  const paymentTypeOptions = [
    {
      value: paymentType.oneTime,
      label: "Registration",
    },
    {
      value: paymentType.sub,
      label: "Subscription",
    },
  ];

  const paymentStatusOptions = [
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
    setLoading(true);
    await axios
      .get(`/api/company`)
      .then((res: any) => {
        const filterData = res?.data?.map((el: any, idx: number) => ({
          label: el?.companyName,
          value: el?.id,
        }));
        setAllCompanyData(res?.data);
        setCompanyList(filterData);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        console.log("errerrerrerr", err);
      });
    setLoading(false);
  };

  const getPlan = (selectedCompany) => {
    if (
      selectedCompany?.registrationState == RegistrationStation.wyoming_state
    ) {
      return PlansEnum.PRO;
    } else {
      return PlansEnum.BASIC;
    }
  };

  const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    if (!selectedCompany) {
      openNotification({
        type: "error",
        message: "Please select the company name and continue",
        placement: "top",
      });
    }

    const payload: any = {
      companyId: updatePayment?.companyId
        ? updatePayment?.companyId
        : values.companyId,
      paymentId: values?.paymentId,
      paymentDate: values.paymentDate,
      type: values.paymentType,
      paymentStatus: values.paymentStatus,
      invoiceUrl: values.invoiceUrl,
      amount: Number(values.amount),
      currency: values.currency,
      description: values.description,
      registrationState: selectedCompany?.registrationState,
      plan: selectedCompany?.plan ?? getPlan(selectedCompany),
    };

    setCreateLoading(true);
    if (updatePayment?.companyId) {
      try {
        await axios
          .patch(`/api/payment?id=${updatePayment?.id}`, payload)
          .then((res: any) => {
            setCreateLoading(false);
            openNotification({
              type: "success",
              message: "Payment updated successfull",
              placement: "topRight",
            });
            onSuccess(values.paymentType);
          })
          .catch((err: any) => {
            console.log("errerrerrerr", err);

            setCreateLoading(false);
            const message =
              err?.response?.data?.message || "Something went wrong!";
            openNotification({
              type: "error",
              message: message,
              placement: "topRight",
            });
          });
      } catch (error) {
        setCreateLoading(false);
      }
    } else {
      try {
        await axios
          .post(`/api/payment`, payload)
          .then((res: any) => {
            setCreateLoading(false);
            openNotification({
              type: "success",
              message: "Payment created successfull",
              placement: "topRight",
            });
            onSuccess(values.paymentType);
          })
          .catch((err: any) => {
            console.log("errerrerrerr", err);

            setCreateLoading(false);
            const message =
              err?.response?.data?.message || "Something went wrong!";
            openNotification({
              type: "error",
              message: message,
              placement: "topRight",
            });
          });
      } catch (error) {
        setCreateLoading(false);
      }
    }
  };

  const handleCompanyChange = (companyId: any, setFieldValue) => {
    if (companyId) {
      const findCompany = allCompanyData?.find(
        (el: any) => el.id == Number(companyId)
      );
      if (findCompany) {
        setSelectedCompany(findCompany);
        setFieldValue("paymentFor", findCompany.registrationState);
      }
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      width={modalWidth}
      className="companyModal"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className={styles.heading}>
            {updatePayment ? "Update Payment" : "Create Payment"}
          </h2>
          <div className={styles.fbonboardingcardwidgetcontent}>
            <Formik
              initialValues={initialValues}
              validationSchema={createPaymentSchema}
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
                  {/* Customer */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Customer Name<span>*</span>
                      </label>
                      <AutoComplete
                        options={companyList}
                        style={{ width: 300 }}
                        placeholder={
                          updatePayment
                            ? updatePayment?.email
                            : "Select Company"
                        }
                        filterOption={(input, option) =>
                          (option?.label as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        value={
                          companyList.find(
                            (company: any) => company.value === values.companyId
                          )?.label || ""
                        }
                        onChange={(val) => {
                          setFieldValue("companyId", val);
                          handleCompanyChange(val, setFieldValue);
                        }}
                        disabled={updatePayment?.companyId ? true : false}
                      />
                      <p className={styles.errorWarning}>
                        {touched.companyId && getIn(errors, "companyId")}
                      </p>
                    </div>
                  </div>

                  {/* Payment ID & Date */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Payment ID<span>*</span>
                      </label>
                      <div className={styles.tooltipWrapper}>
                        <Tooltip title="Copy the Payment ID from the payment company's dashboard. eg:- pi_3SGu1bFK1d7mDBo71UMU2w2t">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                          </svg>
                        </Tooltip>
                      </div>
                      <input
                        className={styles.fbinput}
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
                      <label className={styles.fblabel}>
                        Payment Date<span>*</span>
                      </label>
                      <DatePicker
                        name="paymentDate"
                        style={{ width: "100%" }}
                        onChange={(_, dateString) =>
                          setFieldValue("paymentDate", dateString)
                        }
                        value={
                          values.paymentDate ? dayjs(values.paymentDate) : null
                        }
                      />
                      <p className={styles.errorWarning}>
                        {touched.paymentDate && getIn(errors, "paymentDate")}
                      </p>
                    </div>
                  </div>

                  {/* Type & For */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Payment Type<span>*</span>
                      </label>
                      <Select
                        value={values.paymentType}
                        onChange={(value: any) => {
                          setFieldValue("paymentType", value);
                        }}
                        options={paymentTypeOptions}
                        style={{ width: "100%" }}
                        placeholder="Select Payment Type"
                      />
                      <p className={styles.errorWarning}>
                        {touched.paymentType && getIn(errors, "paymentType")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Payment Status<span>*</span>
                      </label>
                      <Select
                        value={values.paymentStatus}
                        onChange={(value: any) => {
                          setFieldValue("paymentStatus", value);
                        }}
                        options={paymentStatusOptions}
                        style={{ width: "100%" }}
                        placeholder="Payment Status"
                      />
                      <p className={styles.errorWarning}>
                        {touched.paymentStatus &&
                          getIn(errors, "paymentStatus")}
                      </p>
                    </div>
                  </div>

                  {/* Status & Invoice URL */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Amount<span>*</span>
                      </label>
                      <input
                        className={styles.fbinput}
                        type="number"
                        placeholder="Enter amount"
                        name="amount"
                        onChange={handleChange}
                        value={values.amount}
                        onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      />
                      <p className={styles.errorWarning}>
                        {touched.amount && getIn(errors, "amount")}
                      </p>
                    </div>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Invoice Url</label>
                      <input
                        className={styles.fbinput}
                        type="text"
                        placeholder="https://example.com/invoice.pdf"
                        name="invoiceUrl"
                        onChange={handleChange}
                        value={values.invoiceUrl}
                      />
                      <p className={styles.errorWarning}>
                        {touched.invoiceUrl && getIn(errors, "invoiceUrl")}
                      </p>
                    </div>
                  </div>

                  {/* Amount & Currency */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>
                        Currency<span>*</span>
                      </label>
                      <Select
                        value={values.currency}
                        onChange={(value: any) => {
                          setFieldValue("currency", value);
                        }}
                        options={currencyList}
                        style={{ width: "100%" }}
                        placeholder="Currency"
                      />
                      <p className={styles.errorWarning}>
                        {touched.currency && getIn(errors, "currency")}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className={styles.doubleFlex}>
                    <div className={styles.fbformitem}>
                      <label className={styles.fblabel}>Description</label>
                      <input
                        className={styles.fbinput}
                        type="text"
                        placeholder="Add description (optional)"
                        name="description"
                        onChange={handleChange}
                        value={values.description}
                      />
                      <p className={styles.errorWarning}>
                        {touched.description && getIn(errors, "description")}
                      </p>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className={styles.signUpOptions}>
                    <ul>
                      <li>
                        <button
                          type="submit"
                          className={styles.signInBtn}
                          disabled={createLoading}
                        >
                          {createLoading ? (
                            <Spin />
                          ) : updatePayment ? (
                            "Update"
                          ) : (
                            "Create"
                          )}
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CreatePayments;
