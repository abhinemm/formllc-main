"use client";
import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import Loader from "../../Loader";
import NoData from "../../NoData";
import dayjs from "dayjs";
import { Spin } from "antd";

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
  subscription: {
    fee: "$199",
    sub: "$25",
    total: "$224",
  },
};

const Payments = () => {
  const { contextOptions } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [allPayment, setAllPayment] = useState<any>([]);
  const [downloadLoader, setDownloadLoader] = useState<boolean>(false);
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
          if (res?.data?.length) {
            const allPayments: any = res?.data;
            setAllPayment(allPayments);
          }
          setLoading(false);
        })
        .catch((err: any) => {
          console.log("the errorr", err);

          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleDownload = async (paymentId: string, url: any) => {
    if (url) {
      const pdfUrl = url; // Replace with your PDF URL
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setDownloadLoader(true);
      const body = {
        paymentId: paymentId,
      };
      await axios
        .post("/api/updateInvoicepdf", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setDownloadLoader(false);
        })
        .catch((err) => {
          setDownloadLoader(false);
          console.log("err", err);
        });
    }
  };

  const convertDate = (dateStr: string) => {
    if (dateStr) {
      const formattedDate = dayjs(dateStr).format("YYYY MMM DD h:mm a");
      return formattedDate;
    } else {
      return "";
    }
  };

  return (
    <div className="containerUser">
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
                        el?.status === "paid" ? "#28a745" : "#dc3545",
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.header}>
                    <div className={styles.leftSide}>
                      {el?.plan === "subscription" ? (
                        <h3>Mial room subscription</h3>
                      ) : (
                        <h3>{el?.plan} Plan</h3>
                      )}

                      <p>Paid Date: {convertDate(el?.paymentDate)}</p>
                    </div>
                    <div className={styles.rightSide}>
                      <button
                        onClick={() => handleDownload(el?.id, el?.invoicePDF)}
                      >
                        {downloadLoader ? (
                          <Spin />
                        ) : (
                          <>
                            <DownloadOutlined style={{ fontSize: "18px" }} />{" "}
                            <b>Download Invoice</b>
                          </>
                        )}
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
                  {/* <div className={styles.bodyContent}>
                    <div className={styles.leftWrapper}>
                      {el?.sub && <p>Fee:</p>}
                      <p>Subscription Amount: </p>
                    </div>
                    <div className={styles.rightWrapper}>
                      {el?.sub && <p>{planDetails[el?.plan].fee}</p>}
                      <p>{planDetails[el?.plan].sub}</p>
                    </div>
                  </div> */}

                  <div className={styles.footerConetentWrapper}>
                    <div className={styles.footerLeft}>
                      <h2>Total:</h2>
                    </div>
                    <div className={styles.footerRight}>
                      {el?.plan === "subscription" ? (
                        <h2>$25</h2>
                      ) : (
                        <h2>{planDetails[el?.plan].fee}</h2>
                      )}
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
