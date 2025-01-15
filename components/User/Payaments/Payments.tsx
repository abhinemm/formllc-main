"use client";
import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import Loader from "../../Loader";
import NoData from "../../NoData";

const planDetails = {
  PRO: {
    fee: "$299",
    sub: "$25",
    total: "$324",
  },
  BASIC: {
    fee: "$199",
    sub: "$25",
    total: "$224",
  },
};

const Payments = () => {
  const { contextOptions } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [allPayment, setAllPayment] = useState<any>([]);
  const [allFees, setAllFees] = useState<any>([]);
  useEffect(() => {
    (async () => {
      if (contextOptions?.selectedCompany?.id) {
        await getAllSteps(contextOptions?.selectedCompany?.id);
      }
    })();
  }, [contextOptions?.selectedCompany]);

  const getAllSteps = async (companyId: any) => {
    try {
      await axios
        .get(`/api/payment?companyId=${companyId}`)
        .then((res: any) => {
          console.log("the response is", res);
          if (res?.data?.length) {
            const allPayments: any = res?.data;
            let subScription: any = [];
            let fees: any = [];

            allPayments?.map((el: any) => {
              if (el.description?.toLowerCase().includes("subscription")) {
                subScription = [...subScription, el];
              } else {
                fees = [...fees, el];
              }
            });

            let finalFilter = subScription?.map((el: any) => {
              const findone = fees?.find(
                (data: any) => data.invoice === el.invoice
              );
              if (findone) {
                findone.sub = el;
                return findone;
              } else {
                el;
              }
            });

            setAllPayment(finalFilter);

            setLoading(false);
          }
        })
        .catch((err: any) => {
          console.log("the errorr", err);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDownload = (url: any) => {
    if (url) {
      const pdfUrl = url; // Replace with your PDF URL
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertDate = (dateStr: string) => {
    const date = new Date(dateStr);

    // Format the date and time
    const options: any = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {allPayment?.length ? (
            <div className={styles.contentWrapper}>
              {allPayment?.map((el: any) => (
                <div
                  className={styles.cardWrapper}
                  style={
                    {
                      "--status-color":
                        el?.status === "paid" ? "#63ff23" : "#e44646",
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.header}>
                    <div className={styles.leftSide}>
                      <h3>{el?.plan} Plan</h3>
                      <p>Paid Date: {convertDate(el?.paymentDate)}</p>
                    </div>
                    <div className={styles.rightSide}>
                      <button onClick={() => handleDownload(el?.invoicePDF)}>
                        <DownloadOutlined /> Download Invoice
                      </button>
                    </div>
                  </div>
                  <div className={styles.bodyContent}>
                    <div className={styles.leftWrapper}>
                      <p>{el?.description}</p>
                      <p>Invoice Number: {el?.invoice}</p>
                    </div>
                    <div className={styles.rightWrapper}>
                      <button type="button">
                        {el?.status === "paid" ? "Success" : "Failed"}
                      </button>
                    </div>
                  </div>
                  <div className={styles.bodyContent}>
                    <div className={styles.leftWrapper}>
                      {el?.sub && <p>Fee:</p>}
                      <p>Subscription Amount: </p>
                    </div>
                    <div className={styles.rightWrapper}>
                      {el?.sub && <p>{planDetails[el?.plan].fee}</p>}
                      <p>{planDetails[el?.plan].sub}</p>
                    </div>
                  </div>

                  <div className={styles.footerConetentWrapper}>
                    <div className={styles.footerLeft}>
                      <h2>Total:</h2>
                    </div>
                    <div className={styles.footerRight}>
                      <h2>
                        {el?.sub
                          ? planDetails[el?.plan].total
                          : planDetails[el?.plan].sub}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )}
        </>
      )}
    </div>
  );
};

export default Payments;
