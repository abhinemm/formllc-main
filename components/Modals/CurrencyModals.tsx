"use client";
import { Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./CurrencyModals.module.scss";
import { CURRENCIES } from "@/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CurrencyModalsProps {
  open: boolean;
  onClose: () => void;
  title?: string; //make title optional
  companyLocation: string;
  companyType: string;
  plan: string;
  openNotification: any;
}

const CurrencyModals: React.FC<CurrencyModalsProps> = ({
  open,
  onClose,
  companyType,
  companyLocation,
  plan,
  openNotification,
}) => {
  const router = useRouter();
  const plans = {
    basic: "BASIC",
    pro: "PRO",
  };
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
    "USD"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currencyList, setCurrencyList] = useState<any>([]);
  const allCurrency = CURRENCIES;
  useEffect(() => {
    if (allCurrency?.length) {
      const maped = allCurrency?.map((el: any) => ({
        value: el?.currencyCode,
        label: `${el?.currencyCode}(${el?.currencyName})`,
      }));
      setCurrencyList(maped);
    }
  }, [allCurrency]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const handleProceed = async () => {
    if (selectedCurrency) {
      setLoading(true);
      const requestValue = {
        currency: selectedCurrency,
        registrationState: companyLocation,
        companyType: companyType,
        status: 0,
      };
      try {
        await axios
          .post(`/api/company`, requestValue)
          .then((res: any) => {
            // onClose();
            // if (res?.data?.id) {
            //   router.push(`/company-registration?id=${res?.data?.id}`);
            // }
            handlePayment(res?.data?.id, plan);
          })
          .catch((err: any) => {
            setLoading(false);
            openNotification({
              type: "error",
              message: err?.response?.data?.message ?? "Something went wrong",
              placement: "topRight",
            });
          });
      } catch (error: any) {
        openNotification({
          type: "error",
          message: error?.response?.data?.message ?? "Something went wrong",
          placement: "topRight",
        });
        setLoading(false);
      }
    }
  };

  const handlePayment = async (companyId: number, plan: string) => {
    const body = {
      plan: plans[plan],
      companyId: companyId,
      register: true,
    };
    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          if (res?.data?.url) {
            router.push(res?.data?.url);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          openNotification({
            type: "error",
            message: err?.response?.data?.message ?? "Something went wrong",
            placement: "topRight",
          });
        });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.data?.message ?? "Something went wrong",
        placement: "topRight",
      });
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      className="currencyModal"
    >
      <div className={styles.modalContentWrapper}>
        <h3>Select the currency you would like to pay</h3>
        <p className={styles.modalDescription}>
          We need this information to set up your payment page.
        </p>
        <div className={styles.selectWrapper}>
          <label htmlFor="currency-select" className={styles.currencyLabel}>
            Payment currency
          </label>
          <Select
            id="currency-select"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            options={currencyList}
            style={{ width: "100%" }}
          />
        </div>
        <div className={styles.btnWrapper}>
          <button disabled={loading} onClick={handleProceed}>
            {loading ? <Spin /> : "Proceed to payment"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CurrencyModals;
