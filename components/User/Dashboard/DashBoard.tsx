"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.scss";
import { useAppContext } from "../../Context/AppContext";
import Loader from "../../Loader";
import axios from "axios";
import { StepsAttributes } from "@/models/steps";
import {
  PlansEnum,
  StepsTakenStatusEnum,
  StepsTakenStatusViewEnum,
  StepsView,
} from "@/utils/constants";
import { notification, Skeleton, Spin } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { useRouter } from "next/navigation";
import {
  BTNCOLORS,
  RegistrationStation,
  SLIDEACTTION,
} from "@/constants/constants";
import DocumentViewer from "../../DocumentViewer/DocumentViewer";

type NotificationType = "success" | "info" | "warning" | "error";

type NotificationMessage = {
  type: NotificationType;
  message: string;
  placement: NotificationPlacement;
};

type DocumentViewer = {
  open: boolean;
  companyId: number | null;
  stepId: number | null;
};

const DashBoard = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [allSteps, setAllSteps] = useState<any>([]);
  const [loadingSub, setLoadingSub] = useState<boolean>(false);
  const [appiCalledStatus, setAppiCalledStatus] = useState<boolean>(false);
  const { contextOptions } = useAppContext();
  const router = useRouter();
  const [stepTakes, setStepTakes] = useState<any>({});
  const [stepTakenLoading, setStepTakenLoading] = useState<boolean>(false);
  const [documentViewer, setDocumentViewer] = useState<DocumentViewer>({
    open: false,
    companyId: null,
    stepId: null,
  });

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
          const sortedData = res?.data.sort(
            (a: any, b: any) => a.position - b.position
          );
          setAllSteps(sortedData);
          setAppiCalledStatus(true);
          if (companyDetails?.id && companyDetails?.id != 0) {
            getAllTakenSteps(companyDetails?.id);
          } else {
            setAllSteps(sortedData);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
      });
  };

  const getAllTakenSteps = async (companyId: number) => {
    await axios
      .get(`/api/stepsTaken?companyId=${companyId}`)
      .then((res: any) => {
        if (res?.data?.length) {
          const assignedData = res?.data;
          let sorted: any = {};
          assignedData?.map((el: any) => {
            sorted = {
              ...sorted,
              [el?.stepId]: el,
            };
          });
          setStepTakenLoading(false);
          setStepTakes(sorted);
        } else {
          setStepTakenLoading(false);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setStepTakenLoading(false);
        setLoading(false);
      });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY > 0 ? 50 : -50;
    }
  };

  const handlePayment = async (companyId: number, plan: any) => {
    setLoadingSub(true);
    const body = {
      plan: plan
        ? plan
        : contextOptions?.selectedCompany.registrationState ==
          RegistrationStation.mexico_state
        ? PlansEnum.PRO
        : PlansEnum.BASIC,
      companyId: companyId,
      sub: true,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASEURL}/user?status=success`,
    };

    try {
      await axios
        .post(`/api/generatePaymentLink`, body)
        .then((res: any) => {
          if (res?.data?.url) {
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

  const checkCompleted = (status: any) => {
    if (status === StepsTakenStatusEnum.completed) {
      return true;
    }
    if (status === StepsTakenStatusEnum.documents) {
      return true;
    }
    return false;
  };

  const handleClickViewDoc = (stepId: number, status: string) => {
    if (status === StepsTakenStatusEnum.contactSupport) {
      const companyName = contextOptions?.selectedCompany?.companyName;
      const ownerName = `${contextOptions?.selectedCompany?.ownerFname} ${contextOptions?.selectedCompany?.ownerLname}`;
      const finalName = ownerName?.replace(" ", "%20");
      window.open(
        `https://api.whatsapp.com/send?phone=447909729519&text=Hello,%20I%20need%20assistance%20with%20creating%20a%20bank%20account%20for%20my%20LLC.%20Could%20you%20please%20help%20me%20with%20this?%0A%0ALLC%20Name:%20${companyName}%0AOwner%20Name:%20${finalName}%0ACompany%20Email:%20${contextOptions?.selectedCompany?.companyEmail}`,
        "_blank"
      );
      return;
    }
    if (StepsTakenStatusEnum.documents === status) {
      setDocumentViewer(() => ({
        open: true,
        companyId: Number(contextOptions?.selectedCompany?.id),
        stepId: stepId,
      }));
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
            // onWheel={handleWheel}
            className={styles.userStepsMainWrapper}
          >
            <ul>
              {allSteps?.map((item: any, index: number) => (
                <li
                  className={`${
                    checkCompleted(stepTakes[item?.id]?.status ?? null)
                      ? styles.StepCompleted
                      : ""
                  }`}
                  key={index}
                >
                  <div className={styles.stepCountWrapper}>
                    <h5></h5>
                  </div>
                  <div className={styles.stepContent}>
                    <h6>{item.title}</h6>
                    <p className={styles.underlined}>{item.description}</p>
                  </div>
                  {stepTakenLoading ? (
                    <Skeleton.Button
                      active={true}
                      size={"default"}
                      shape={"default"}
                    />
                  ) : (
                    <div
                      className={styles.buttonAbsoluteWarpper}
                      style={
                        {
                          "--btn-bg":
                            BTNCOLORS[stepTakes[item?.id]?.status]?.bgColor,
                          "--text-color":
                            BTNCOLORS[stepTakes[item?.id]?.status]?.textColor,
                        } as React.CSSProperties
                      }
                    >
                      {Object.keys(stepTakes)?.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleClickViewDoc(
                              item?.id,
                              stepTakes[item?.id]?.status
                            )
                          }
                        >
                          {" "}
                          {StepsTakenStatusViewEnum[
                            stepTakes[item?.id]?.status
                          ] ?? ""}{" "}
                        </button>
                      )}
                    </div>
                  )}
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
                  handlePayment(
                    contextOptions?.selectedCompany?.id,
                    contextOptions?.selectedCompany?.plan ?? null
                  );
                }}
                disabled={loadingSub}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>

                {loadingSub ? "Loading.." : "Subscribe"}
              </button>
            </div>
          </div>
        )}
      </div>

      {documentViewer?.open && (
        <DocumentViewer
          open={documentViewer?.open}
          companyId={documentViewer.companyId}
          stepId={documentViewer.stepId}
          onClose={() =>
            setDocumentViewer((prev) => ({
              ...prev,
              open: false,
            }))
          }
          openNotification={openNotification}
          stepDetails={
            documentViewer.stepId
              ? allSteps?.find((el: any) => el.id == documentViewer.stepId)
              : null
          }
        />
      )}
    </section>
  );
};

export default DashBoard;
