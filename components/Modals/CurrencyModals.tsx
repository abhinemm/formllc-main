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
}

const CurrencyModals: React.FC<CurrencyModalsProps> = ({
  open,
  onClose,
  companyType,
  companyLocation,
}) => {
  const router = useRouter();
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
      };
      try {
        await axios
          .post(`/api/company`, requestValue)
          .then((res: any) => {
            setLoading(false);
            onClose();
            if (res?.data?.id) {
              router.push(`/company-registration?id=${res?.data?.id}`);
            }
          })
          .catch((err: any) => {
            setLoading(false);
            console.log("the error is ", err);
          });
      } catch (error) {
        console.log("the error", error);
        setLoading(false);
      }
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
