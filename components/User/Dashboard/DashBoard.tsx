"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
import { useAppContext } from "../../Context/AppContext";
import Loader from "../../Loader";
import axios from "axios";
import { StepsAttributes } from "@/models/steps";
import { StepsTakenStatusEnum, StepsView } from "@/utils/constants";
import { notification, Spin } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

const DashBoard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [allSteps, setAllSteps] = useState<any>([]);
  const [loadingSub, setLoadingSub] = useState<boolean>(false);
  const [appiCalledStatus, setAppiCalledStatus] = useState<boolean>(false);
  const { contextOptions } = useAppContext();
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (data: NotificationMessage) => {
    api[data.type]({
      message: data.message,
      placement: data?.placement,
    });
  };

  useEffect(() => {
    (async () => {
      if (contextOptions?.selectedCompany?.id && !appiCalledStatus) {
        await getAllSteps(contextOptions?.selectedCompany);
      }
    })();
  }, [contextOptions?.selectedCompany]);

  const getAllSteps = async (companyDetails: any) => {
    await axios
      .get(`/api/steps`)
      .then((res: any) => {
        if (res?.data?.length) {
          const sortedData: StepsAttributes[] = res?.data.sort(
            (a: any, b: any) => a.position - b.position
          );
          setAppiCalledStatus(true);
          if (companyDetails?.id && companyDetails?.id != 0) {
            getAllTakenSteps(sortedData, companyDetails.id);
          } else {
            setAllSteps(sortedData);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const getAllTakenSteps = async (
    sortedData: StepsAttributes[],
    companyId: number
  ) => {
    await axios
      .get(`/api/stepsTaken?companyId=${companyId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const assignedData = res?.data;
          const finalSteps = sortedData?.map((el: any) => ({
            ...el,
            stepTaken: assignedData?.find(
              (data: any) => data?.stepId === el.id
            ),
          }));

          // const sortedData: StepsAttributes[] = res?.data.sort(
          //   (a: any, b: any) => a.position - b.position
          // );
          setAllSteps(finalSteps);
        } else {
          setAllSteps(sortedData);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY > 0 ? 50 : -50;
    }
  };

  const handlePayment = async (companyId: number) => {
    setLoadingSub(true);
    const body = {
      plan: "PRO",
      companyId: companyId,
      sub: true,
      redirectUrl: `${process.env.BASEURL}/user?status=success`,
    };

    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          console.log("the response is", res);
          if (res?.data?.url) {
            console.log("statusstatusstatus", status);
            router.push(res?.data?.url);
            setLoadingSub(false);
          }
        })
        .catch((err) => {
          setLoadingSub(false);
          openNotification({
            type: "error",
            message: err?.response?.data?.message ?? "Something went wrong",
            placement: "topRight",
          });
          console.log("the error in payment", err);
        });
    } catch (error: any) {
      openNotification({
        type: "error",
        message: error?.response?.data?.message ?? "Something went wrong",
        placement: "topRight",
      });
      setLoadingSub(false);
    }
  };

  return (
    <section className={styles.userDashSection}>
      {contextHolder}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            ref={scrollRef}
            onWheel={handleWheel}
            className={styles.userStepsMainWrapper}
          >
            <ul>
              {/* <li className={styles.StepCompleted}> 
            if a step is completed add this class to the li for the style 
              */}

              {/* {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                <li
                  className={`${item % 2 == 0 ? styles.StepCompleted : ""}`}
                  key={index}
                >
                  <div className={styles.stepCountWrapper}>
                    <h5>step {item}</h5>

                    {item % 2 == 0 && <span>completed</span>}
                  </div>
                  <div className={styles.stepContent}>
                    <h6>Company steps content</h6>

                    <p className={styles.underlined}>
                      By default, the mouse wheel scrolls vertically. Even if
                      your section has overflow-x: scroll, the mouse wheel won't
                      scroll horizontally unless:
                    </p>
                  </div>
                </li>
              ))} */}
              {allSteps?.map((item: any, index: number) => (
                <li
                  className={`${
                    item?.stepTaken?.status == StepsTakenStatusEnum.completed
                      ? styles.StepCompleted
                      : ""
                  }`}
                  key={index}
                >
                  <div className={styles.stepCountWrapper}>
                    <h5>step {item.position}</h5>
                    {item?.stepTaken && (
                      <span className={styles[item?.stepTaken?.status]}>
                        {StepsView[item?.stepTaken?.status]}
                      </span>
                    )}
                  </div>
                  <div className={styles.stepContent}>
                    <h6>{item.title}</h6>

                    <p className={styles.underlined}>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {}
      <div className={styles.actionWrapper}>
        {!contextOptions?.selectedCompanyDetails?.subsriptionPaymentStatus && (
          <div className={styles.innerWrapper}>
            <div className={styles.contentWrapper}>
              <h2>Activate Your Mailroom Address</h2>
              <p>
                To receive your dedicated mailroom address, please subscribe to
                the Mailroom Service for <b>$25</b>. This ensures seamless
                handling of your correspondence.
              </p>
            </div>
            <div className={styles.actionBtnWrapper}>
              <button
                type="button"
                onClick={() => {
                  handlePayment(contextOptions?.selectedCompany?.id);
                }}
                disabled={loadingSub}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {loadingSub ? <Spin /> : "Subscribe"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashBoard;
